from django.db.models import Q
from rest_framework.generics import get_object_or_404
from .models import Shop, Item, Order
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import AllowAny, IsAuthenticated
from .serializers import ShopSerializer, ItemSerializer, OrderSerializer


class ShopViewSet(ModelViewSet):
    queryset = Shop.objects.all()
    serializer_class = ShopSerializer
    permission_classes = [AllowAny]
    # common.py 에서 DEFAULT_PERMISSION_CLASS 를 IsAuthenticated 로 셋팅해서
    # 위 permission_classes 를 지우면 인증자에게만 shop list 를 보여주게 된다.

    # 특별한 쿼리셋을 뽑아내고 싶다면 get_queryset 함수를 아래와 같이 재정의한다.
    # def get_queryset(self):
    #     qs = super().get_queryset()
    #     qs = qs.filter(
    #     author가 현재 request user 이거나
    #         Q(author=self.request.user) |
    #     author가 현재 request user가 following하는 전부
    #         Q(author__in=self.request.user.following_set.all())
    #     )
    #     return qs


class ItemViewSet(ModelViewSet):
    queryset = Item.objects.all().select_related("shop")
    serializer_class = ItemSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        qs = super().get_queryset()
        qs = qs.filter(shop__pk=self.kwargs["shop_pk"])
        return qs


class OrderViewSet(ModelViewSet):
    queryset = Order.objects.all().select_related("shop")
    serializer_class = OrderSerializer
    permission_classes = [AllowAny]

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context["request"] = self.request
        return context

    def perform_create(self, serializer):
        shop = get_object_or_404(Shop, pk=self.kwargs["shop_pk"])
        item = get_object_or_404(Item, pk=self.kwargs["item_pk"])

        serializer.save(
            shop=shop, user=self.request.user, item=item,
        )
        return super().perform_create(serializer)

    def get_queryset(self):
        qs = super().get_queryset()
        qs = qs.filter(shop__pk=self.kwargs["shop_pk"])
        qs = qs.filter(item__pk=self.kwargs["item_pk"])
        qs = qs.filter(user__pk=7)
        return qs
