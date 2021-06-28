from django.shortcuts import render
from .models import Shop, Item, Order
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import AllowAny
from .serializers import ShopSerializer


class ShopViewSet(ModelViewSet):
    queryset = Shop.objects.all()
    serializer_class = ShopSerializer
    permission_classes = [AllowAny]
