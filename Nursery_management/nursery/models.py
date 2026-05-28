from django.db import models  # type: ignore[import]

# Create your models here.


# Plant Model
class Plant(models.Model):
    CATEGORY_CHOICES = [
        ('Flower', 'Flower'),
        ('Medicinal', 'Medicinal'),
        ('Indoor', 'Indoor'),
        ('Outdoor', 'Outdoor'),
    ]

    name = models.CharField(max_length=100)
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES)
    quantity = models.IntegerField()
    price = models.FloatField()
    description = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name


# Supplier Model
class Supplier(models.Model):
    name = models.CharField(max_length=100)
    phone = models.CharField(max_length=15)
    email = models.EmailField()
    address = models.TextField()

    def __str__(self):
        return self.name


# Order Model
class Order(models.Model):
    STATUS_CHOICES = [
        ('Pending', 'Pending'),
        ('Delivered', 'Delivered'),
        ('Cancelled', 'Cancelled'),
    ]

    customer_name = models.CharField(max_length=100)
    plant = models.ForeignKey(Plant, on_delete=models.CASCADE)
    quantity = models.IntegerField()
    total_price = models.FloatField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='Pending')
    order_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.customer_name} - {self.plant.name}"


# Care Schedule Model
class CareSchedule(models.Model):
    plant = models.ForeignKey(Plant, on_delete=models.CASCADE)
    watering_date = models.DateField()
    fertilizer_date = models.DateField()
    notes = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.plant.name