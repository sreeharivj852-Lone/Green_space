from rest_framework.routers import DefaultRouter # type: ignore[import]
from .views import (
    PlantViewSet,
    SupplierViewSet,
    OrderViewSet,
    CareScheduleViewSet
)

router = DefaultRouter()

router.register(r'plants', PlantViewSet)
router.register(r'suppliers', SupplierViewSet)
router.register(r'orders', OrderViewSet)
router.register(r'care-schedules', CareScheduleViewSet)

urlpatterns = router.urls