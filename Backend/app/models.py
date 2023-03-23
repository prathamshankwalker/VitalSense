from base.models import *

GENDER = (("MALE","MALE"),("FEMALE","FEMALE"))

class UserModel(BaseUser):
    height = models.FloatField(null=True, blank=True)
    weight = models.FloatField(null=True, blank=True)
    dob = models.DateField(auto_now=False, auto_now_add=False, null=True, blank=True)
    gender = models.CharField(choices=GENDER, max_length=50, null=True, blank=True)
    def __str__(self):
        return self.name


class FamilyMemberModel(BaseModel):
    user = models.ForeignKey(UserModel, related_name="family_member", on_delete=models.CASCADE)
    name = models.CharField(max_length=50)
    phone = models.CharField(max_length=50)
    email = models.EmailField(max_length=254)
    relation = models.CharField(max_length=50)
    def __str__(self):
        return self.name

