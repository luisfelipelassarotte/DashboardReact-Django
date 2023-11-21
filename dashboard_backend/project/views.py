from django.shortcuts import render,HttpResponse,redirect
from django.contrib.auth.models import User
from django.contrib.auth import authenticate,login,logout
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from rest_framework.authentication import SessionAuthentication
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.mixins import LoginRequiredMixin
from django.urls import reverse
from django.shortcuts import get_object_or_404
from django.db.models import Sum, Count, Avg

from rest_framework.views import APIView
from django.http.response import JsonResponse
from rest_framework.response import Response
from rest_framework import status
from django.http.response import Http404

from .models import *
from .serializers import *

# Create your views here.

@login_required(login_url='loginuser')
def Home(request):
    return render(request,'home.html')

def RegisterUser(request):
    if request.method == 'POST':
        uname = request.POST.get('username')
        email = request.POST.get('email')
        pass1 = request.POST.get('password1')
        pass2 = request.POST.get('password2')
        telefone = request.POST.get('telefone')
        cpf = request.POST.get('cpf')
        conta_bancaria = request.POST.get('conta_bancaria')
        endereco = request.POST.get('endereco')

        if pass1 != pass2:
            return HttpResponse("Senhas não são iguais")
        else:
            if User.objects.filter(username=uname).exists():
                messages.error(request, "Este nome de usuário já está em uso. Por favor, escolha outro.")
                return render(request, 'register.html')

            my_user = User.objects.create_user(uname, email, pass1)
            my_user.save()

            vendedor = Vendedores.objects.create(
                vendedor=my_user,
                telefone=telefone,
                cpf=cpf,
                conta_bancaria=conta_bancaria,
                endereco=endereco,
            )

            return redirect('loginuser')

    return render(request, 'register.html')

def LoginUser(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        pass1 = request.POST.get('pass')
        user = authenticate(request, username=username, password=pass1)
        if user is not None:
            if user.is_active:
                login(request, user)
                return redirect('home')
            else:
                messages.error(request, "Este usuário foi desligado!")
                return render(request, 'login.html')
        else:
            messages.error(request, "Usuário ou senha estão incorretos!")
            return render(request, 'login.html')

    return render(request, 'login.html')

def LogoutUser(request):
    logout(request)
    return redirect('loginuser')

class CarrosView(APIView):
    # authentication_classes = [SessionAuthentication]
    # permission_classes = [IsAuthenticated]
    # login_url = 'loginuser'

    # def get_login_url(self):
    #     return reverse(self.login_url)

    def get_carro(self, pk):
        try:
            return Carro.objects.get(pk=pk)
        except Carro.DoesNotExist:
            raise Http404

    def get(self, request, pk=None):
        if pk:
            carro = self.get_carro(pk)
            serializer = CarroSerializer(carro)
        else:
            carros = Carro.objects.all()
            serializer = CarroSerializer(carros, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = CarroSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse("Carro Cadastrado com Sucesso!", safe=False)
        return JsonResponse("O cadastro de Carro Falhou!", safe=False)

    def patch(self, request, pk=None):
        carro = self.get_carro(pk)
        serializer = CarroSerializer(carro, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response("Registro atualizado com sucesso!")
        return Response("A atualização do cadastro Falhou!", status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk=None):
        carro = self.get_carro(pk)
        carro.delete()
        return Response("Deletado com Sucesso!")

class VendaView(APIView):
    # authentication_classes = [SessionAuthentication]
    # permission_classes = [IsAuthenticated]
    # login_url = 'loginuser'

    # def get_login_url(self):
    #     return reverse(self.login_url)

    def get_venda(self, pk):
        try:
            return Venda.objects.get(pk=pk)
        except Venda.DoesNotExist:
            raise Http404

    def get(self, request, pk=None):
        if pk:
            venda = self.get_venda(pk)
            serializer = VendaSerializer(venda)
        else:
            vendas = Venda.objects.all()
            serializer = VendaSerializer(vendas, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = VendaSerializer(data=request.data)
        if serializer.is_valid():
            carro_id = serializer.validated_data.get('carro').id
            try:
                carro = Carro.objects.get(pk=carro_id)
                if carro.disponivel:
                    serializer.save()
                    carro.disponivel = False
                    carro.save()
                    return JsonResponse("Venda registrada com sucesso!", safe=False)
                else:
                    return JsonResponse("Este carro já foi vendido.", safe=False, status=status.HTTP_400_BAD_REQUEST)
            except Carro.DoesNotExist:
                return JsonResponse("Carro não encontrado.", safe=False, status=status.HTTP_404_NOT_FOUND)
        return JsonResponse("Falha ao cadastrar a venda.", safe=False, status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request, pk=None):
        venda = self.get_venda(pk)
        serializer = VendaSerializer(venda, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response("Registro atualizado com sucesso!")
        return Response("A atualização do cadastro Falhou!", status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk=None):
        venda = self.get_venda(pk)

        carro = venda.carro
        venda.delete()

        carro.disponivel = True
        carro.save()
        return Response("Venda deletada com sucesso e carro marcado como disponível!")


class VendedoresView(APIView):
    # authentication_classes = [SessionAuthentication]
    # permission_classes = [IsAuthenticated]
    # login_url = 'loginuser'
    #
    # def get_login_url(self):
    #     return reverse(self.login_url)

    def get_vendedor(self, pk):
        try:
            return Vendedores.objects.get(id=pk)
        except Vendedores.DoesNotExist:
            raise Http404

    def get(self, request, pk=None):
        if pk:
            vendedor = self.get_vendedor(pk)
            serializer = VendedorSerializer(vendedor)
        else:
            vendedores = Vendedores.objects.all()
            serializer = VendedorSerializer(vendedores, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = VendedorSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response("Vendedor cadastrado com sucesso!", status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request, pk=None):
        vendedor = self.get_vendedor(pk)
        serializer = VendedorSerializer(vendedor, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response("Registro de vendedor atualizado com sucesso!")
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk=None):
        vendedor = self.get_vendedor(pk)
        vendedor.delete()
        return Response("Vendedor deletado com sucesso!", status=status.HTTP_204_NO_CONTENT)


class EstatisticasVendas(APIView):
    def get(self, request):
        quantidade_vendas = Venda.objects.count()
        valor_total_vendas = Venda.objects.aggregate(Sum('preco'))['preco__sum']
        media_valor_vendas = Venda.objects.aggregate(Avg('preco'))['preco__avg']

        valor_total_vendas = valor_total_vendas or 0
        media_valor_vendas = media_valor_vendas or 0

        serializer = EstatisticasVendasSerializer({
            'quantidade_vendas': quantidade_vendas,
            'valor_total_vendas': valor_total_vendas,
            'media_valor_vendas': media_valor_vendas
        })

        return Response(serializer.data)

