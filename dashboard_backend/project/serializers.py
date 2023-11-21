from rest_framework import serializers
from django.contrib.auth.models import User
from django.db.models import Sum, Count, Avg
from .models import *

class CarroSerializer(serializers.ModelSerializer):
    foto = serializers.FileField(max_length=None, use_url=True)
    class Meta:
        model = Carro
        fields = (
            'id',
            'foto',
            'marca',
            'modelo',
            'preco_minimo',
            'combustivel',
            'ano',
            'disponivel',
        )


class VendaSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='responsavel.vendedor.username', read_only=True)
    marca = serializers.SerializerMethodField()
    modelo = serializers.SerializerMethodField()
    foto_carro = serializers.SerializerMethodField()
    lucro = serializers.SerializerMethodField()

    class Meta:
        model = Venda
        fields = (
            'username',
            'pk',
            'responsavel',
            'carro',
            'entregue',
            'endereco',
            'preco',
            'data_venda',
            'marca',
            'modelo',
            'foto_carro',
            'lucro',
        )

    def get_marca(self, obj):
        return obj.carro.marca

    def get_modelo(self, obj):
        return obj.carro.modelo

    def get_foto_carro(self, obj):
        return obj.carro.foto.url if obj.carro.foto else None

    def get_lucro(self, obj):
        valor_minimo_carro = obj.carro.preco_minimo if obj.carro.preco_minimo else 0
        lucro = obj.preco - valor_minimo_carro
        return lucro

class VendedorSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='vendedor.username', read_only=True)
    email = serializers.EmailField(source='vendedor.email', read_only=True)
    total_ganho_vendas = serializers.SerializerMethodField()
    total_vendas = serializers.SerializerMethodField()
    media_valor_vendas = serializers.SerializerMethodField()
    profit_vendas = serializers.SerializerMethodField()

    class Meta:
        model = Vendedores
        fields = [
            'id',
            'username',
            'email',
            'vendedor',
            'telefone',
            'cpf',
            'conta_bancaria',
            'data_demissao',
            'endereco',
            'total_ganho_vendas',
            'total_vendas',
            'media_valor_vendas',
            'profit_vendas',
        ]

    def get_total_ganho_vendas(self, instance):
        total_ganho = Venda.objects.filter(responsavel=instance).aggregate(Sum('preco'))['preco__sum']
        return total_ganho or 0

    def get_total_vendas(self, instance):
        return Venda.objects.filter(responsavel=instance).count()

    def get_media_valor_vendas(self, instance):
        media_vendas = Venda.objects.filter(responsavel=instance).aggregate(Avg('preco'))['preco__avg']
        return media_vendas or 0

    def get_profit_vendas(self, instance):
        total_vendas = Venda.objects.filter(responsavel=instance)
        lucro_total = 0

        for venda in total_vendas:
            valor_minimo_carro = venda.carro.preco_minimo if venda.carro.preco_minimo else 0

            lucro_venda = venda.preco - valor_minimo_carro
            lucro_total += lucro_venda

        return lucro_total

class EstatisticasVendasSerializer(serializers.Serializer):
    quantidade_vendas = serializers.IntegerField()
    valor_total_vendas = serializers.DecimalField(max_digits=10, decimal_places=2)
    media_valor_vendas = serializers.DecimalField(max_digits=10, decimal_places=2)
