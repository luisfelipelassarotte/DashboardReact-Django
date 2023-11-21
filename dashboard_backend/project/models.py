from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Vendedores(models.Model):
    vendedor = models.OneToOneField(User, on_delete=models.CASCADE)
    telefone = models.CharField(max_length=15, null=True)
    cpf = models.CharField(max_length=11, null=True)
    conta_bancaria = models.CharField(max_length=40, null=True)
    data_demissao = models.DateTimeField(null=True, blank=True)
    endereco = models.CharField(max_length=100, null=True)

    def __str__(self):
        return self.vendedor.username

class Carro(models.Model):
    def upload_to_directory(instance, filename):
        # Este método determina o caminho para salvar o arquivo de imagem
        return 'dashboard_backend/media/{0}/{1}'.format(instance.marca, filename)

    foto = models.FileField(upload_to=upload_to_directory, null=True)
    marca = models.CharField(max_length=100)
    modelo = models.CharField(max_length=100)
    preco_minimo = models.FloatField(null=True)
    combustivel = models.CharField(max_length=50)
    ano = models.IntegerField(null=True)
    disponivel = models.BooleanField(default=True, null=True)

    def __str__(self):
        return self.marca + " " + self.modelo

class Venda(models.Model):
    responsavel = models.ForeignKey(Vendedores, on_delete=models.CASCADE)
    carro = models.ForeignKey(Carro, on_delete=models.CASCADE)
    entregue = models.BooleanField(default=False)
    endereco = models.CharField(max_length=100)
    preco = models.FloatField(null=True)
    data_venda = models.DateField(auto_now_add=True, null=True)
