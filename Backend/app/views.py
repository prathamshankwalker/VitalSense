from rest_framework.generics import ListAPIView, RetrieveUpdateDestroyAPIView
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from django.contrib.auth import authenticate
from rest_framework import status
from django.core.cache import cache
from django.conf import settings
from .suppliments import bada_data
from .serializers import *
from .threads import *
from .models import *
from .utils import *

from twilio.rest import Client


account_sid = settings.TWILIO_ACCOUNT_SID
auth_token = settings.TWILIO_AUTH_TOKEN

twilio_client = Client(account_sid, auth_token)

message = twilio_client.messages.create(
    from_ = 'whatsapp:+14155238886',
    body = 'Hello',
    to = 'whatsapp:+918007609672'
)


@api_view(["POST"])
def google_authentication(request):
    try:
        ser = GoogleSocialAuthSerializer(data=request.data)
        if ser.is_valid():
            user_info = id_token.verify_oauth2_token(ser.data["token_id"], requests.Request(), settings.GOOGLE_CLIENT_ID)
            if not UserModel.objects.filter(email=user_info["email"]).exists():
                customer_obj = UserModel.objects.create(
                    email = user_info["email"],
                    name = user_info["name"],
                )
                customer_obj.set_password(settings.SOCIAL_SECRET)
                customer_obj.save()
            customer_obj = UserModel.objects.get(email=user_info["email"])
            user = authenticate(email=customer_obj.email, password=settings.SOCIAL_SECRET)
            if not user:
                return Response({"message":"Incorrect password"}, status=status.HTTP_406_NOT_ACCEPTABLE)
            jwt_token = RefreshToken.for_user(user)
            return Response({"message":"Login successfull", "token":str(jwt_token.access_token)}, status=status.HTTP_202_ACCEPTED)
        return Response({"error":ser.errors}, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        return Response({"message": "Invalid or Expired toiken"}, status=status.HTTP_406_NOT_ACCEPTABLE)


@api_view(["POST"])
def signUp(request):
    try:
        data = request.data
        serializer = signupSerializer(data=data)
        if serializer.is_valid():
            name = serializer.data["name"]
            email = serializer.data["email"]
            password = serializer.data["password"]
            if UserModel.objects.filter(email=email).first():
                return Response({"message":"Acount already exists."}, status=status.HTTP_406_NOT_ACCEPTABLE)
            new_customer = UserModel.objects.create(
                email = email,
                name = name,
            )
            new_customer.set_password(password)
            new_customer.save()
            return Response({"message":"Account created"}, status=status.HTTP_201_CREATED)
        return Response({"error":serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        return Response({"error":str(e), "message":"Something went wrong"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(["POST"])
def logIn(request):
    try:
        data = request.data
        serializer = loginSerializer(data=data)
        if serializer.is_valid():
            email = serializer.data["email"]
            password = serializer.data["password"]
            customer_obj = UserModel.objects.filter(email=email).first()
            if customer_obj is None:
                return Response({"message":"Account does not exist"}, status=status.HTTP_404_NOT_FOUND)
            user = authenticate(email=email, password=password)
            if not user:
                return Response({"message":"Incorrect password"}, status=status.HTTP_406_NOT_ACCEPTABLE)
            jwt_token = RefreshToken.for_user(user)
            return Response({"message":"Login successfull", "token":str(jwt_token.access_token)}, status=status.HTTP_202_ACCEPTED)
        return Response({"error":serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        return Response({"error":str(e), "message":"Something went wrong"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(["POST"])
def forgot(request):
    try:
        data = request.data
        serializer = emailSerializer(data=data)
        if serializer.is_valid():
            email = serializer.data["email"]
            user_obj = UserModel.objects.filter(email=email).first()
            if not user_obj:
                return Response({"message": "User does not exist."}, status=status.HTTP_404_NOT_FOUND)
            if user_obj.auth_provider != "email":
                return Response({"message": "Login using Google Auth"}, status=status.HTTP_401_UNAUTHORIZED)
            thread_obj = send_forgot_link(email)
            thread_obj.start()
            return Response({"message":"reset mail sent"}, status=status.HTTP_200_OK)
        return Response({"error":serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        return Response({"error":str(e), "message":"Something went wrong"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(["POST"])
def reset(request):
    try:
        data = request.data
        serializer = otpSerializer(data=data)
        if serializer.is_valid():
            otp = serializer.data["otp"]
            if not cache.get(otp):
                return Response({"message":"OTP expired"}, status=status.HTTP_408_REQUEST_TIMEOUT)
            if not UserModel.objects.filter(email=cache.get(otp)).first():
                return Response({"message":"user does not exist"}, status=status.HTTP_404_NOT_FOUND)
            user_obj = UserModel.objects.get(email=cache.get(otp))
            user_obj.set_password(serializer.data["pw"])
            user_obj.save()
            return Response({"message":"Password changed successfull"}, status=status.HTTP_202_ACCEPTED)
        return Response({"error":serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        return Response({"error":str(e), "message":"Something went wrong"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)



########################################################################################################################################################


class MemberL(ListAPIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    queryset = FamilyMemberModel.objects.all()
    serializer_class = FamilyMemberSerializer


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def addMember(request):
    try:
        ser = signupSerializer(data = request.data)
        if ser.is_valid():
            FamilyMemberModel.objects.create(
                user = UserModel.objects.get(email=request.user.email),
                name = ser.data["name"],
                phone = ser.data["phone"],
                email = ser.data["email"],
                relation = ser.data["relation"]
            )
            return Response({"message":"Family Member Added"}, status=status.HTTP_202_ACCEPTED)
        return Response({"error":ser.errors}, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        return Response({"error":str(e), "message":"Something went wrong"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)



class MemberRUD(RetrieveUpdateDestroyAPIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    queryset = FamilyMemberModel.objects.all()
    serializer_class = FamilyMemberSerializer
    lookup_field = "id"


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def add_personal_data(request):
    try:
        user = UserModel.objects.get(email=request.user.email)
        ser = UserPersonalDataSerializer(data = request.data)
        if ser.is_valid():
            user.height = ser.data["height"]
            user.weight = ser.data["weight"]
            user.dob = ser.data["dob"]
            user.gender = ser.data["gender"]
            user.save()
            return Response({"message": "User Data Saved"}, status=status.HTTP_200_OK)
        return Response({"error":ser.errors}, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        return Response({"error":str(e), "message":"Something went wrong"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def data_input(request):
    try:
        user = UserModel.objects.get(email=request.user.email)
        ser = ActivityPredictionModel(data = request.data)
        if ser.is_valid():
            steps = ser.data["steps"]
            calories = ser.data["calories"]
            distance = ser.data["distance"]
            heart_rate = ser.data["heart_rate"]
            output = predict_activity(user.height, user.weight, steps, calories, distance, heart_rate)
            return Response({"message": output}, status=status.HTTP_200_OK)
        return Response({"error":ser.errors}, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        return Response({"error":str(e), "message":"Something went wrong"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)



@api_view(["POST"])
@permission_classes([IsAuthenticated])
def scroll_input(request):
    try:
        user = UserModel.objects.get(email=request.user.email)
        ser = ScrollInputSerializer(data = request.data)
        if ser.is_valid():
            val = ser.data["value"]
            if val not in range(1,6):
                return Response({"message": "Invalid Range"}, status=status.HTTP_406_NOT_ACCEPTABLE)
            output, text = ecg_classification(bada_data[val])
            if output == 2:
                thread_obj = send_notification(user.family_member.all())
                thread_obj.start()
            return Response({"message": text}, status=status.HTTP_200_OK)
        return Response({"error":ser.errors}, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        return Response({"error":str(e), "message":"Something went wrong"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
# Hypoglycemia
# 70-140
# Hyperglycemia

@api_view(["POST"])
@permission_classes([IsAuthenticated])
def scroll_input(request):
    try:
        user = UserModel.objects.get(email=request.user.email)
        ser = ScrollInputSerializer(data = request.data)
        if ser.is_valid():
            val = ser.data["value"]
            # if val not in range(0,):
            #     return Response({"message": "Invalid Range"}, status=status.HTTP_406_NOT_ACCEPTABLE)
            if val<70:
                return Response({"message":"Low Blood Pressure, Hypoglycemia"}, status=status.HTTP_200_OK)
            elif val>=70 and val<=140:
                return Response({"message":"Normal Blood Pressure"}, status=status.HTTP_200_OK)
            else:
                return Response({"message":"High Blood Pressure, Hyperglycemia"}, status=status.HTTP_200_OK)
        return Response({"error":ser.errors}, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        return Response({"error":str(e), "message":"Something went wrong"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)