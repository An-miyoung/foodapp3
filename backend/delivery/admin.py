from django.contrib import admin
from django.utils.safestring import mark_safe
from .models import Shop, Item, Order


@admin.register(Shop)
class ShopAdmin(admin.ModelAdmin):
    list_display = ("name", "tel", "addr")

    def __str__(self):
        return self.name


@admin.register(Item)
class ItemAdmin(admin.ModelAdmin):
    list_display = ("shop", "name", "photo_tag", "price")
    list_display_links = ["name"]
    list_filter = ("shop",)

    def photo_tag(self, item):
        return mark_safe(f"<img src={item.photo.url} style='width: 100px;' />")


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ("shop", "user", "created_at")
    list_filter = ("shop", "user")

    def __str__(self):
        return self.user
