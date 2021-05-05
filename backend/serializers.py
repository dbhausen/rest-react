import datetime
import functools
from collections import OrderedDict

from django.db.models.fields import DateField
from rest_framework import serializers
from rest_framework.serializers import ALL_FIELDS, ModelSerializer, Serializer

from .models import CustomUser, Department, FirstNameLook, Junk, LastNameLook, Message


def material_ui_data_row(func):
    def inner(self, instance):
        ret = func(self, instance)
        ## to do: edit the OrderedDictionary for @matrial-ui
        return ret

    return inner


class MessageSerializer(ModelSerializer):

    date = serializers.DateTimeField(
        format="%Y-%m-%dT%H:%M:%S", required=False, allow_null=False
    )

    class Meta:
        model = Message
        fields = ALL_FIELDS

    def to_representation(self, instance):
        ret = super().to_representation(instance)
        return ret


class UserSerializer(ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ("email", "last_login", "date_joined", "is_staff")


class FirstNameSerializer(ModelSerializer):
    class Meta:
        model = FirstNameLook
        fields = ALL_FIELDS

    def to_representation(self, instance):
        ret = super().to_representation(instance)
        return ret


class LastNameSerializer(ModelSerializer):
    class Meta:
        model = LastNameLook
        fields = ALL_FIELDS


class JunkSerializer(ModelSerializer):

    mydatetime = serializers.DateTimeField(
        format="%Y-%m-%dT%H:%M:%S", required=False, allow_null=True
    )

    @material_ui_data_row
    def to_representation(self, instance):
        ret = super().to_representation(instance)
        return ret

    class Meta:
        model = Junk
        fields = ALL_FIELDS


class DepartmentSerializer(ModelSerializer):
    class Meta:
        model = Department
        fields = ["id", "name"]
