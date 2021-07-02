from enum import unique
from django.conf import settings
from django.db import models
from django.core.validators import RegexValidator


class TimestampedModel(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class Shop(TimestampedModel):

    name = models.CharField(max_length=100)
    photo = models.ImageField(upload_to="shops/")
    tel = models.CharField(
        max_length=20, validators=[RegexValidator(r"^\d{2,3}-?[1-9]\d{3}-?\d{4}$")]
    )
    addr = models.CharField(max_length=100)

    class Meta:
        ordering = ["-id"]

    def __str__(self):
        return self.name


class Item(TimestampedModel):
    shop = models.ForeignKey(Shop, related_name="items", on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    photo = models.ImageField(upload_to="items/")
    price = models.PositiveIntegerField()

    class Meta:
        unique_together = ("shop", "name")
        ordering = ["-id"]

    def __str__(self):
        return self.name


class Order(TimestampedModel):
    shop = models.ForeignKey(Shop, on_delete=models.CASCADE)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    item = models.ForeignKey(Item, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField()

    class Meta:
        ordering = ["-id"]

    @property
    def total(self):
        return sum(item.price for item in self.item_set.all())

