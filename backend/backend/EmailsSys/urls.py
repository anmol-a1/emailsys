from django.contrib import admin
from django.urls import path,include
from .views import UsersList,SendEmails
urlpatterns = [
    path('userslist/',UsersList.as_view(),name="listadded"),
    path('sendemail/',SendEmails.as_view(),name="sentmail")
]