from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Task


class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["username", "password"]
        extra_kwargs = {
            "password": {"write_only": True}
        }

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data["username"],
            password=validated_data["password"]
        )
        return user


class TaskSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source="user.username", read_only=True)

    class Meta:
        model = Task
        fields = [
            "id",
            "title",
            "completed",
            "created_at",
            "username",
        ]

        read_only_fields = [
            "user",
            "created_at",
            "username",
        ]