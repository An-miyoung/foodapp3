from django.contrib.auth import get_user_model
from django.db import models
from django.db.models import fields
from .models import Shop, Item, Order
from rest_framework import serializers


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ["id", "username", "phone_number"]


class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = ["id", "name", "photo", "price"]


class ShopSerializer(serializers.ModelSerializer):
    items = ItemSerializer(many=True, read_only=True)

    class Meta:
        model = Shop
        fields = ["id", "name", "photo", "tel", "addr", "items"]
