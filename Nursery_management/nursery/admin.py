from django.contrib import admin # type: ignore[import]

# Register your models here.
from .models import *

admin.site.register(Plant)
admin.site.register(Supplier)
admin.site.register(Order)
admin.site.register(CareSchedule)