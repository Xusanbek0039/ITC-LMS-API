from rest_framework import serializers
from .models import Student, Teacher, Direction, SimpleTest, SimpleQuestion, SimpleChoice, OralTest, Course, Lesson, Certificate

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = '__all__'

class TeacherSerializer(serializers.ModelSerializer):
    class Meta:
        model = Teacher
        fields = '__all__'

class DirectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Direction
        fields = '__all__'

class SimpleChoiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = SimpleChoice
        fields = ['id', 'text', 'is_correct']

class SimpleQuestionSerializer(serializers.ModelSerializer):
    choices = SimpleChoiceSerializer(many=True)

    class Meta:
        model = SimpleQuestion
        fields = ['id', 'text', 'choices']

    def create(self, validated_data):
        choices_data = validated_data.pop('choices')
        question = SimpleQuestion.objects.create(**validated_data)
        for ch in choices_data:
            SimpleChoice.objects.create(question=question, **ch)
        return question

class SimpleTestSerializer(serializers.ModelSerializer):
    questions = SimpleQuestionSerializer(many=True)

    class Meta:
        model = SimpleTest
        fields = ['id', 'name', 'description', 'duration', 'questions']

    def create(self, validated_data):
        questions_data = validated_data.pop('questions')
        test = SimpleTest.objects.create(**validated_data)
        for q in questions_data:
            choices = q.pop('choices')
            question = SimpleQuestion.objects.create(test=test, **q)
            for ch in choices:
                SimpleChoice.objects.create(question=question, **ch)
        return test

class OralTestSerializer(serializers.ModelSerializer):
    class Meta:
        model = OralTest
        fields = [
            'id','name','description','duration','pass_score','topics',
            'question_count','difficulty','shuffle','show_answers',
            'allow_back','questions_file'
        ]

class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = ['id', 'name', 'image', 'description', 'created_at']

class LessonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lesson
        fields = ['id', 'course', 'title', 'youtube_url', 'guide', 'order', 'created_at']

class CertificateSerializer(serializers.ModelSerializer):
    status = serializers.SerializerMethodField()

    class Meta:
        model = Certificate
        fields = ['id', 'full_name', 'file', 'status', 'created_at']

    def get_status(self, obj):
        return "Yuklab olish" if obj.file else "Sertifikat yo'q"
