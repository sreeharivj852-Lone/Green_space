from django.db import transaction
from rest_framework import serializers  # type: ignore[import]
# pyrefly: ignore [missing-import]
from .models import Plant, Supplier, Order, CareSchedule


class PlantSerializer(serializers.ModelSerializer):
    class Meta:
        model = Plant
        fields = '__all__'


class SupplierSerializer(serializers.ModelSerializer):
    class Meta:
        model = Supplier
        fields = '__all__'


class OrderSerializer(serializers.ModelSerializer):
    plant_name = serializers.CharField(source="plant.name", read_only=True)

    class Meta:
        model = Order
        fields = [
            "id",
            "customer_name",
            "plant",
            "quantity",
            "total_price",
            "status",
            "order_date",
            "plant_name",
        ]

    def validate_quantity(self, value):
        if value <= 0:
            raise serializers.ValidationError("Order quantity must be greater than zero.")
        return value

    def validate(self, attrs):
        plant = attrs.get("plant")
        quantity = attrs.get("quantity")

        if plant is None or quantity is None:
            return attrs

        if quantity > plant.quantity:
            raise serializers.ValidationError({
                "quantity": "Insufficient stock for the selected plant."
            })

        return attrs

    def create(self, validated_data):
        quantity = validated_data["quantity"]
        plant = validated_data["plant"]

        with transaction.atomic():
            plant = Plant.objects.select_for_update().get(pk=plant.pk)

            if quantity > plant.quantity:
                raise serializers.ValidationError({
                    "quantity": "Insufficient stock for the selected plant."
                })

            plant.quantity -= quantity
            if plant.quantity < 0:
                raise serializers.ValidationError({
                    "quantity": "Order quantity exceeds available stock."
                })

            plant.save()
            order = Order.objects.create(**validated_data)
            return order


class CareScheduleSerializer(serializers.ModelSerializer):
    plant_name = serializers.CharField(source="plant.name", read_only=True)
    class Meta:
        model = CareSchedule
        fields = [
            "id",
            "plant",
            "plant_name",
            "watering_date",
            "fertilizer_date",
            "notes",
            "created_at",
        ]