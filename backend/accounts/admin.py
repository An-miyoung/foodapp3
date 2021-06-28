from django.contrib import admin
from .models import User


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ("username", "phone_number")
    list_display_links = ["username", "phone_number"]
