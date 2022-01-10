from rest_framework import serializers
from AuthenticateSys.models import NewUser
class RequestSerializer(serializers.ModelSerializer):
    fields=('list','email_body','email_subject')
class UsersListSerializers(serializers.ModelSerializer):
    class Meta:
        model=NewUser
        fields=('email','first_name','id')