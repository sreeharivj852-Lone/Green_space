from django.shortcuts import render # type: ignore[import]

from rest_framework import viewsets  # type: ignore[import]

from .models import *

from .serializers import (
    PlantSerializer,
    SupplierSerializer,
    OrderSerializer,
    CareScheduleSerializer
)


class PlantViewSet(viewsets.ModelViewSet):
    queryset = Plant.objects.all()
    serializer_class = PlantSerializer


class SupplierViewSet(viewsets.ModelViewSet):
    queryset = Supplier.objects.all()
    serializer_class = SupplierSerializer


class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer


class CareScheduleViewSet(viewsets.ModelViewSet):
    queryset = CareSchedule.objects.all()
    serializer_class = CareScheduleSerializer
