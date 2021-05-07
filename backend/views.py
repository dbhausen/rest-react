from collections import OrderedDict
from typing import OrderedDict

from django.http import JsonResponse
from django.middleware.csrf import get_token
from rest_framework import generics

from .models import Department, FirstNameLook, Junk, LastNameLook, Message
from .serializers import (
    DepartmentSerializer,
    FirstNameSerializer,
    JunkSerializer,
    LastNameSerializer,
    MessageSerializer,
)


def material_ui(func):
    def inner(self, request, *args, **kwargs):
        ret = func(self, request, *args, **kwargs)
        ## to do: edit the OrderedDictionary for @matrial-ui
        data = ret.data["actions"]["POST"]
        newData = []
        k = data.keys()

        for key in k:
            data[key]["field"] = key
            newData.append(data[key])

        ret.data["actions"]["POST"] = newData

        return ret

    return inner


# pylint: disable=no-member


class MessageListView(generics.ListCreateAPIView):
    queryset = Message.objects.order_by("date").reverse()
    serializer_class = MessageSerializer


class JunkListView(generics.ListCreateAPIView):
    queryset = Junk.objects.all()

    serializer_class = JunkSerializer


class JunkUpdateView(generics.RetrieveUpdateAPIView):
    queryset = Junk.objects.all()
    serializer_class = JunkSerializer

    def patch(self, request, *args, **kwargs):

        return self.partial_update(request, *args, **kwargs)

    def put(self, request, *args, **kwargs):
        return super().put(request, **kwargs)


def csrf(request):
    return JsonResponse({"csrfToken": get_token(request)})


def ping(request):
    return JsonResponse({"result": "OK"})


# pylint: disable=no-member
class DepartmentListView(generics.ListCreateAPIView):
    queryset = Department.objects.all()

    serializer_class = DepartmentSerializer


class FirstNameListView(generics.ListCreateAPIView):
    queryset = FirstNameLook.objects.all()

    serializer_class = FirstNameSerializer


class LastNameListView(generics.ListCreateAPIView):
    queryset = LastNameLook.objects.all()

    serializer_class = LastNameSerializer
