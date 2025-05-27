# ITC-LMS-API

# 🎓 ITC-LMS-API

**ITC-LMS-API** — bu `Django` va `Django REST Framework` asosida ishlab chiqilgan zamonaviy **ta’lim boshqaruv tizimi (Learning Management System)** uchun backend RESTful API. Loyiha **IT Creative** o‘quv markazi uchun mo‘ljallangan bo‘lib, o‘quvchilar, o‘qituvchilar va adminlar o‘rtasida to‘liq LMS jarayonlarini boshqarishga xizmat qiladi.

> ⚙️ Frontend ilova (React, Vue yoki mobil ilova) bilan ishlash uchun kuchli backend asos.

---

## 🛠️ Texnologiyalar

![Python](https://img.shields.io/badge/Python-3.10-blue?style=for-the-badge&logo=python)
![Django](https://img.shields.io/badge/Django-3.2-darkgreen?style=for-the-badge&logo=django&logoColor=white)
![DRF](https://img.shields.io/badge/DRF-REST_Framework-red?style=for-the-badge)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-%23336791.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-Authentication-orange?style=for-the-badge)

---

## ✨ Asosiy imkoniyatlar

- 🔐 JWT token orqali avtorizatsiya (`SimpleJWT`)
- 👥 Ro‘yxatdan o‘tish, kirish va foydalanuvchini boshqarish
- 🧑‍🏫 O‘qituvchi va 👨‍🎓 Talaba rollari
- 📚 Kurslar va darslar (modullar)ni yaratish va tahrirlash
- 📝 Testlar va topshiriqlarni yuborish va ko‘rish
- 📊 Baholash va reyting tizimi
- 🔍 Filterlash, pagination, qidiruv
- 📄 Swagger va ReDoc bilan avtomatik API hujjatlar

---

## 📦 O‘rnatish bo‘yicha qo‘llanma

```bash
# 1. Loyihani yuklab oling
git clone https://github.com/username/ITC-LMS-API.git
cd ITC-LMS-API

# 2. Virtual muhit yaratish
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# 3. Talablar ro‘yxatini o‘rnatish
pip install -r requirements.txt

# 4. Ma’lumotlar bazasini migratsiya qilish
python manage.py migrate

# 5. Admin foydalanuvchi yaratish
python manage.py createsuperuser

# 6. Serverni ishga tushirish
python manage.py runserver
```
| Endpoint                   | Tavsif                    |
| -------------------------- | ------------------------- |
| `POST /api/token/`         | JWT orqali tizimga kirish |
| `POST /api/token/refresh/` | Tokenni yangilash         |
| `GET /api/users/`          | Foydalanuvchilar ro‘yxati |
| `GET /api/courses/`        | Kurslar ro‘yxati          |
| `GET /api/assignments/`    | Topshiriqlar ro‘yxati     |
| `GET /api/results/`        | Talaba natijalari         |



📄 Swagger & ReDoc (API hujjat)
Django REST Framework orqali avtomatik yaratilgan API hujjatlarni ko‘rish:

Swagger UI

ReDoc UI

🌍 Loyihaning asosiy maqsadi
Bu loyiha orqali IT Creative ta’lim markazining LMS platformasi uchun:

O‘qituvchi va talabalar o‘rtasida aloqa qilish

Kurslar va testlar bilan ishlash

Natijalarni baholash

Va barcha bu jarayonlarni yagona REST API orqali boshqarish imkoniyati yaratilgan.

📁 Loyiha tuzilmasi (asosiy)
```bash
ITC-LMS-API/
├── api/                # Asosiy app (kurs, user, test)
├── itc_lms/            # Django project papkasi
├── requirements.txt    # Kutubxonalar ro‘yxati
├── manage.py
├── db.sqlite3          # SQLite DB (PostgreSQL ham qo‘llab-quvvatlanadi)
└── README.md
```
👨‍💻 Muallif
Ism: Husanbek

Web: husanbek-coder.uz

YouTube: @it_creative

Email: husanbekdev@gmail.com

📜 Litsenziya
Ushbu loyiha MIT litsenziyasi asosida tarqatiladi — erkin foydalanishingiz mumkin, faqat mualliflik huquqlarini saqlab qoling.

⭐️ Yordam bering
Agar sizga loyiha yoqqan bo‘lsa, yulduzcha ⭐️ bosishni unutmang! Bu men uchun katta motivatsiya!


```bash
Agar sizga kerak bo‘lsa, quyidagilarni ham qo‘shishim mumkin:
- `.env` fayl namunasi
- Dockerfile + `docker-compose.yml`
- Postman yoki Swagger JSON hujjatlari

Shunchaki ayting — men doim tayyorman!
