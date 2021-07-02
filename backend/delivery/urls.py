from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views


router = DefaultRouter()
router.register("shops", views.ShopViewSet)
router.register(r"shops/(?P<shop_pk>\d+)/items", views.ItemViewSet)
router.register(
    r"shops/(?P<shop_pk>\d+)/items/(?P<item_pk>\d+)/order", views.OrderViewSet
)


urlpatterns = [
    path("api/", include(router.urls)),
]

