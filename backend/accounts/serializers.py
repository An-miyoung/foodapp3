from django.contrib.auth import get_user_model
from rest_framework import serializers


User = get_user_model()


class SignupSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    def create(self, validated_date):
        user = User.objects.create(username=validated_date["username"])
        user.set_password(validated_date["password"])
        user.save()
        return user

    class Meta:
        model = User
        fields = ["pk", "username", "password"]

