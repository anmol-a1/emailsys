from django.db import models
from django.utils import timezone
from django.utils.translation import gettext_lazy as _
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager

class EmailHistory(models.Model):
    id=models.AutoField(primary_key=True)
    receiver= models.EmailField(_('email address'))
    email_body=models.CharField(max_length=1000)
    email_subject=models.CharField(max_length=300)
# Create your models here.
