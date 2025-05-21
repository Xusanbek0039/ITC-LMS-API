from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token
from .serializers import (
    LoginSerializer,
    StudentSerializer,
    DirectionSerializer,
    TeacherSerializer,
    SimpleTestSerializer,
    OralTestSerializer,
    CourseSerializer,
    LessonSerializer,
    CertificateSerializer,
)
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAuthenticatedOrReadOnly
from rest_framework import viewsets
from .models import Student, Direction, Teacher, SimpleTest, OralTest, Course, Lesson, Certificate

from rest_framework.decorators import action
from rest_framework.parsers import MultiPartParser, FormParser

class LoginView(APIView):
    permission_classes = [AllowAny]
    authentication_classes = []

    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        username = serializer.validated_data['username']
        password = serializer.validated_data['password']
        user = authenticate(username=username, password=password)
        if user:
            token, created = Token.objects.get_or_create(user=user)
            return Response({'token': token.key})
        # Mana shu yerda to‘liq qavs yordamida yopamiz:
        return Response(
            {'error': 'Invalid credentials'},
            status=status.HTTP_401_UNAUTHORIZED
        )

class StudentViewSet(viewsets.ModelViewSet):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer
    permission_classes = [IsAuthenticated]  # agar autentifikatsiya kerak bo‘lsa

class TeacherViewSet(viewsets.ModelViewSet):
    queryset = Teacher.objects.all().order_by('-created_at')
    serializer_class = TeacherSerializer
    permission_classes = [AllowAny]  # Istasangiz IsAuthenticated qilib qo'yishingiz mumkin

class DirectionViewSet(viewsets.ModelViewSet):
    queryset = Direction.objects.all().order_by('name')
    serializer_class = DirectionSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]  # O’zgartirishlar uchun login talab qilinadi

class SimpleTestViewSet(viewsets.ModelViewSet):
    queryset = SimpleTest.objects.all().order_by('-id')
    serializer_class = SimpleTestSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

class OralTestViewSet(viewsets.ModelViewSet):
    queryset = OralTest.objects.all().order_by('-id')
    serializer_class = OralTestSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

class CourseViewSet(viewsets.ModelViewSet):
    queryset = Course.objects.all().order_by('-created_at')
    serializer_class = CourseSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

class LessonViewSet(viewsets.ModelViewSet):
    queryset = Lesson.objects.all().order_by('course', 'order')
    serializer_class = LessonSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

class CertificateViewSet(viewsets.ModelViewSet):
    queryset = Certificate.objects.all().order_by('-created_at')
    serializer_class = CertificateSerializer
    parser_classes = [MultiPartParser, FormParser]
    permission_classes = [IsAuthenticatedOrReadOnly]

    @action(detail=True, methods=['post'])
    def reset(self, request, pk=None):
        certificate = self.get_object()
        certificate.file = None  # Boshqatdan berish uchun faylni o'chiramiz
        certificate.save()
        return Response({'status': 'Sertifikat boshqatdan berildi'})
