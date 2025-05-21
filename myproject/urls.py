from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from django.urls import path, include
from django.contrib import admin

schema_view = get_schema_view(
   openapi.Info(
      title="IT Creative API",
      default_version='v1',
      description="API description",
   ),
   public=True,
   permission_classes=(permissions.AllowAny,),
   authentication_classes=[],  # bu joyni bo‘sh qoldirishingiz mumkin
)

urlpatterns = [
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
    path('admin/', admin.site.urls),
    path('', include('authapi.urls')),
]
