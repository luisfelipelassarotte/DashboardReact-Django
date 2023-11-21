from django.urls import path
from .views import *

urlpatterns = [
    path('', Home, name='home'),
    path('loginuser/', LoginUser, name='loginuser'),
    path('registeruser/', RegisterUser, name='registeruser'),
    path('logout/', LogoutUser, name='logout'),

    path('carros/', CarrosView.as_view(), name='carros'),
    path('carros/<int:pk>/', CarrosView.as_view(), name='carros_detail'),

    path('vendas/', VendaView.as_view(), name='vendas'),
    path('vendas/<int:pk>/', VendaView.as_view(), name='vendas_editar'),

    path('vendedores/', VendedoresView.as_view(), name='vendedores'),
    path('vendedores/<int:pk>/', VendedoresView.as_view(), name='vendedores_editar'),

    path('estatisticas-vendas/', EstatisticasVendas.as_view(), name='estatisticas_vendas'),

]