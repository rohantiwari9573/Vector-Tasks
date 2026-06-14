from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view
from drf_yasg.utils import swagger_auto_schema
from django.contrib.auth.models import User

from .models import Task
from .serializers import TaskSerializer, RegisterSerializer


# =========================
# USER REGISTRATION
# =========================
@swagger_auto_schema(
    method='post',
    request_body=RegisterSerializer
)
@api_view(['POST'])
def register_user(request):

    serializer = RegisterSerializer(data=request.data)

    if serializer.is_valid():

        username = serializer.validated_data['username']

        # CHECK DUPLICATE USERNAME
        if User.objects.filter(username=username).exists():

            return Response(
                {"error": "Username already taken"},
                status=status.HTTP_400_BAD_REQUEST
            )

        serializer.save()

        return Response(
            {"message": "User registered successfully"},
            status=status.HTTP_201_CREATED
        )

    return Response(
        serializer.errors,
        status=status.HTTP_400_BAD_REQUEST
    )


# =========================
# LIST + CREATE TASKS
# =========================
class TaskListCreateView(generics.ListCreateAPIView):

    serializer_class = TaskSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):

        queryset = Task.objects.filter(user=self.request.user)

        # FILTER
        completed = self.request.query_params.get('completed')

        if completed is not None:
            queryset = queryset.filter(
                completed=(completed.lower() == 'true')
            )

        # SEARCH
        title = self.request.query_params.get('title')

        if title:
            queryset = queryset.filter(
                title__icontains=title
            )

        # ORDERING
        ordering = self.request.query_params.get('ordering')

        if ordering:
            queryset = queryset.order_by(ordering)

        return queryset

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


# =========================
# RETRIEVE + UPDATE + DELETE
# =========================
class TaskDetailView(generics.RetrieveUpdateDestroyAPIView):

    serializer_class = TaskSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Task.objects.filter(user=self.request.user)