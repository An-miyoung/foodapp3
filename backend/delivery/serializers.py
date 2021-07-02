from django.contrib.auth import get_user_model
from django.db import models
from django.db.models import fields
from .models import Shop, Item, Order
from rest_framework import serializers


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ["id", "username", "phone_number"]


# class ItemSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Item
#         fields = ["id", "name", "photo", "price"]


# class ShopSerializer(serializers.ModelSerializer):
#     items = ItemSerializer(many=True, read_only=True)

#     class Meta:
#         model = Shop
#         fields = ["id", "name", "photo", "tel", "addr", "items"]


class ShopSerializer(serializers.ModelSerializer):
    class Meta:
        model = Shop
        fields = ["id", "name", "photo", "tel", "addr"]


class ItemSerializer(serializers.ModelSerializer):
    shop = ShopSerializer(read_only=True)

    class Meta:
        model = Item
        fields = ["id", "name", "photo", "price", "shop"]


class OrderSerializer(serializers.ModelSerializer):
    shop = ShopSerializer(read_only=True)
    user = UserSerializer(read_only=True)
    item = ItemSerializer(read_only=True)

    class Meta:
        model = Order
        fields = ["shop", "user", "item", "quantity"]
