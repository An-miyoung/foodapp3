from django.db import models
from django.conf import settings
from django.contrib.auth.models import AbstractUser
from django.core.validators import RegexValidator
from django.db import models
from django.template.loader import render_to_string
from django.shortcuts import resolve_url


class User(AbstractUser):

    # first_name, last_name, email은 AbstractUser가 기본으로 제공한다. 선언한 필요없음
    phone_number = models.CharField(
        max_length=13,
        validators=[RegexValidator(r"^010-?[1-9]\d{3}-?\d{4}$")],
        blank=True,
    )
    avatar = models.ImageField(blank=True, upload_to="accounts/avatar/%Y/%m/%d")

    @property
    def name(self):
        return f"{self.last_name} {self.first_name}".strip()

    @property
    def avatar_url(self):
        if self.avatar:
            return self.avatar.url
        else:
            return resolve_url("pydenticon_image", self.username)
