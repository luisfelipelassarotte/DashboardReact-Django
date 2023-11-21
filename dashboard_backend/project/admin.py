from django.contrib import admin
from .models import *

# Register your models here.

modelsList = [Vendedores, Venda, Carro]
admin.site.register(modelsList)
