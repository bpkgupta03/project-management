from django.shortcuts import render

def home_page(request):
    return render(request,'main.html')

def login_page(request):
    return render(request,'login.html')