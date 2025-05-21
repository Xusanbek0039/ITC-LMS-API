from django.db import models

class Student(models.Model):
    TR_CHOICES = (
        ('T', 'Talaba'),
        ('R', 'Rəhbariyat'),
    )

    tr = models.CharField(max_length=1, choices=TR_CHOICES)  # Talaba yoki Rəhbariyat
    ism_familiya = models.CharField(max_length=100)
    yonalish = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    telefon = models.CharField(max_length=20)
    songi_faollik = models.DateTimeField(auto_now=True)  # Oxirgi faollik vaqti
    ruxsat = models.BooleanField(default=True)
    qoshimcha = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.ism_familiya

class Teacher(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)  # T/r
    first_name = models.CharField(max_length=100)        # Ism
    last_name = models.CharField(max_length=100)         # Familiya
    direction = models.CharField(max_length=100)         # Yo'nalish
    email = models.EmailField(unique=True)                # Email
    phone = models.CharField(max_length=20)               # Telefon raqam
    last_active = models.DateTimeField(null=True, blank=True)  # So'ngi faollik
    permission = models.BooleanField(default=False)       # Ruxsat
    extra = models.TextField(blank=True, null=True)       # Qo'shimcha

    def __str__(self):
        return f"{self.first_name} {self.last_name}"

class Direction(models.Model):
    LEVEL_CHOICES = [
        ('beginner', "Boshlang'ich"),
        ('intermediate', "O‘rta daraja"),
        ('advanced', "Yuqori daraja"),
    ]

    VISIBILITY_CHOICES = [
        ('new', 'Yangi'),
        ('active', 'Faol'),
        ('inactive', 'Faol emas'),
    ]

    name = models.CharField(max_length=100)  # Yo'nalish nomi
    description = models.CharField(max_length=200)  # Yo'nalish tavsifi
    level = models.CharField(max_length=20, choices=LEVEL_CHOICES, default='beginner')  # Yo'nalish darajasi
    color = models.CharField(max_length=20, blank=True, null=True)  # Yo'nalish rangi
    icon = models.ImageField(upload_to='direction_icons/', blank=True, null=True)  # Yo'nalish ikonkasi
    visibility = models.CharField(max_length=20, choices=VISIBILITY_CHOICES, default='new')  # Ko'rinishi

    def __str__(self):
        return self.name

class SimpleTest(models.Model):
    name = models.CharField(max_length=200)           # Test nomi
    description = models.TextField(blank=True)        # Test tavsifi
    duration = models.PositiveIntegerField()          # Test vaqti (daqiqada)

class SimpleQuestion(models.Model):
    test = models.ForeignKey(SimpleTest, related_name='questions', on_delete=models.CASCADE)
    text = models.TextField()                         # Savol matni

class SimpleChoice(models.Model):
    question = models.ForeignKey(SimpleQuestion, related_name='choices', on_delete=models.CASCADE)
    text = models.CharField(max_length=200)            # Javob varianti matni
    is_correct = models.BooleanField(default=False)   # To‘g‘ri javob belgilash

class OralTest(models.Model):
    name = models.CharField(max_length=200)               # Test nomi
    description = models.TextField(blank=True)            # Test tavsifi
    duration = models.PositiveIntegerField()              # Test vaqti (daqiqada)
    pass_score = models.PositiveIntegerField()            # O‘tish bali (%)
    topics = models.ManyToManyField('Direction')          # Mavzular
    question_count = models.PositiveIntegerField()        # Savollar soni
    difficulty = models.CharField(
        max_length=20,
        choices=[('easy','Oson'),('medium','O‘rta'),('hard','Qiyin')],
        default='medium'
    )
    shuffle = models.BooleanField(default=False)          # Tasodifiy tartib
    show_answers = models.BooleanField(default=False)     # Javoblarni ko‘rsatish
    allow_back = models.BooleanField(default=False)       # Orqaga qaytish
    questions_file = models.FileField(upload_to='oral_tests/', blank=True, null=True)

class Course(models.Model):
    name = models.CharField(max_length=255)
    image = models.ImageField(upload_to='course_images/', blank=True, null=True)
    description = models.TextField(max_length=500)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

class Lesson(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='lessons')
    title = models.CharField(max_length=255)
    youtube_url = models.URLField()
    guide = models.TextField()  # Dars qo‘llanmasi
    order = models.PositiveIntegerField()  # Dars tartib raqami
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.order}. {self.title}"

class Certificate(models.Model):
    full_name = models.CharField(max_length=255)  # Ism familiya
    file = models.FileField(upload_to='certificates/', blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def has_certificate(self):
        return bool(self.file)

    def __str__(self):
        return self.full_name
