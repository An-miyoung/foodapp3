from django.conf import settings
from django.contrib import admin
from django.urls import path, include
from django.views.generic.base import View
from . import views

urlpatterns = [
    path("signup/", views.SignupView.as_view(), name="signup"),
]

