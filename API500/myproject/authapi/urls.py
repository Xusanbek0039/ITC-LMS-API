from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    StudentViewSet, TeacherViewSet, DirectionViewSet, SimpleTestViewSet,
    OralTestViewSet, CourseViewSet, LessonViewSet, LoginView, CertificateViewSet
)
from django.conf import settings
from django.conf.urls.static import static

router = DefaultRouter()
router.register(r'students', StudentViewSet)
router.register(r'teachers', TeacherViewSet)
router.register(r'directions', DirectionViewSet)
router.register(r'simple-tests', SimpleTestViewSet)
router.register(r'oral-tests', OralTestViewSet)
router.register(r'courses', CourseViewSet)
router.register(r'lessons', LessonViewSet)  # ✅ Yangi darslar endpointi
router.register(r'certificates', CertificateViewSet)

urlpatterns = [
    path('login/', LoginView.as_view(), name='login'),
    path('', include(router.urls)),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)