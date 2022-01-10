from rest_framework import viewsets, filters, generics, permissions
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status,views
from .utils import Util
from AuthenticateSys.models import NewUser
from .serializers import UsersListSerializers,RequestSerializer
class UsersList(generics.ListAPIView):
    permission_classes = [AllowAny]
    serializer_class = UsersListSerializers
    queryset = NewUser.objects.all()
class SendEmails(generics.GenericAPIView):
    serializer_class = RequestSerializer
    def post(self, request,**kwargs):
        serializer = self.serializer_class(data=request.data)
        list = request.data.get('list','')
        email_body=request.data.get('email_body','')
        email_subject=request.data.get('email_subject','')
        for ins in list:
                data = {'email_body': email_body, 'to_email': ins,
                    'email_subject': email_subject}
                Util.send_email(data)
        return Response({'success': 'We have sent a link'}, status=status.HTTP_200_OK)
