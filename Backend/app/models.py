from base.models import *


class UserModel(BaseUser):
    pass


class FamilyMemberModel(BaseModel):
    user = models.ForeignKey(UserModel, related_name="family_member", on_delete=models.CASCADE)
    name = models.CharField(max_length=50)
    phone = models.CharField(max_length=50)
    email = models.EmailField(max_length=254)
    relation = models.CharField(max_length=50)
    def __str__(self):
        return self.name

