from django.contrib import admin
from .models import (
    Student, Teacher, Direction, SimpleTest, SimpleQuestion, SimpleChoice,
    OralTest, Course, Lesson, Certificate
)

# Inlines for nested editing
class SimpleChoiceInline(admin.TabularInline):
    model = SimpleChoice
    extra = 1

class SimpleQuestionInline(admin.TabularInline):
    model = SimpleQuestion
    extra = 1
    show_change_link = True

class SimpleQuestionAdmin(admin.ModelAdmin):
    list_display = ('id', 'text', 'test')
    search_fields = ('text',)

class SimpleTestAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'duration')
    search_fields = ('name',)
    inlines = [SimpleQuestionInline]

class LessonInline(admin.TabularInline):
    model = Lesson
    extra = 1

class CourseAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'created_at')
    search_fields = ('name',)
    inlines = [LessonInline]

class LessonAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'course', 'order')
    list_filter = ('course',)
    search_fields = ('title',)

class CertificateAdmin(admin.ModelAdmin):
    list_display = ('id', 'full_name', 'has_certificate', 'created_at')
    list_filter = ('created_at',)
    search_fields = ('full_name',)
    actions = ['reset_certificate']

    def reset_certificate(self, request, queryset):
        for cert in queryset:
            cert.file.delete(save=False)
            cert.file = None
            cert.save()
        self.message_user(request, "Selected certificates have been reset.")
    reset_certificate.short_description = "Boshqatdan sertifikat berish"

class StudentAdmin(admin.ModelAdmin):
    list_display = ('id', 'ism_familiya', 'yonalish', 'email', 'telefon', 'songi_faollik', 'ruxsat')
    list_filter = ('yonalish', 'ruxsat')
    search_fields = ('ism_familiya', 'email')

class TeacherAdmin(admin.ModelAdmin):
    list_display = ('id', 'first_name', 'last_name', 'direction', 'email', 'phone', 'last_active', 'permission')
    list_filter = ('direction', 'permission')
    search_fields = ('first_name', 'last_name', 'email')

class DirectionAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'level', 'visibility')
    list_filter = ('level', 'visibility')
    search_fields = ('name',)

class OralTestAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'duration', 'pass_score', 'difficulty')
    list_filter = ('difficulty',)
    search_fields = ('name',)

admin.site.register(Student, StudentAdmin)
admin.site.register(Teacher, TeacherAdmin)
admin.site.register(Direction, DirectionAdmin)
admin.site.register(SimpleTest, SimpleTestAdmin)
admin.site.register(SimpleQuestion, SimpleQuestionAdmin)
admin.site.register(SimpleChoice)
admin.site.register(OralTest, OralTestAdmin)
admin.site.register(Course, CourseAdmin)
admin.site.register(Lesson, LessonAdmin)
admin.site.register(Certificate, CertificateAdmin)

# Customize site headers
title = "Ta'lim Platformasi Admin"
admin.site.site_header = title
admin.site.site_title = title
admin.site.index_title = "Boshqaruv Paneli"
