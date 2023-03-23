from django.urls import path
from . import views
from .views import *


urlpatterns = [
    
    # Auth
    path('google-auth/', views.google_authentication, name="google-auth"),
	path('signup/', views.signUp, name="signup"),
	path('login/', views.logIn, name="login"),
	path('forgot/', views.forgot, name="forgot"),
	path('reset/', views.reset, name="reset"),
    
	# Add Family Members
	path('get-members/', views.MemberL.as_view(), name="member-L"),
    path('add-member/', views.addMember, name="add-member"),
	path('member/<id>/', views.MemberRUD.as_view(), name="member-RUD"),
    
	# Main
	# path('/', views.reset, name="reset"),
]
