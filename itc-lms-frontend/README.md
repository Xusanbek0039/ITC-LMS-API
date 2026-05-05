# IT Creative LMS Frontend

## 🎓 Ta'lim boshqaruv tizimi frontend ilovasi

Bu **IT Creative LMS** ning zamonaviy **React** va **TypeScript** asosida yozilgan frontend qismi. Django DRF backend bilan to'liq integratsiyalashgan.

---

## 🛠️ Texnologiyalar

![React](https://img.shields.io/badge/React-18.2.0-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-4.9.0-blue?style=for-the-badge&logo=typescript)
![Material-UI](https://img.shields.io/badge/Material_UI-5.15.0-blue?style=for-the-badge&logo=mui)
![React Router](https://img.shields.io/badge/React_Router-6.8.0-orange?style=for-the-badge&logo=reactrouter)
![Axios](https://img.shields.io/badge/Axios-1.6.0-green?style=for-the-badge&logo=axios)

---

## ✨ Asosiy imkoniyatlar

- 🔐 JWT token orqali autentifikatsiya
- 📊 Dashboard - umumiy statistika
- 📚 Kurslarni ko'rish va boshqarish
- 🎥 Darslarni tomosha qilish (YouTube integratsiyasi)
- 📝 Testlar (oddiy va og'zaki)
- 🏆 Sertifikatlar boshqaruvi
- 🔍 Qidiruv va filterlash
- 📱 Responsive dizayn
- 🌙 Material-UI komponentlari

---

## 📦 O‘rnatish bo‘yicha qo'llanma

### 1. Kutubxonalarni o‘rnatish

```bash
# Papkaga o'tish
cd itc-lms-frontend

# Node.js kutubxonalarni o'rnatish
npm install
```

### 2. Backend serverini ishga tushirish

Avval backend serverini ishga tushiring:

```bash
# Backend papkasiga o'tish
cd ..

# Django serverini ishga tushirish
python manage.py runserver
```

### 3. Frontendni ishga tushirish

```bash
# Frontend papkasiga qaytish
cd itc-lms-frontend

# Development serverini ishga tushirish
npm start
```

Ilovasi `http://localhost:3000` manzilida ochiladi.

---

## 🏗️ Loyiha tuzilmasi

```
itc-lms-frontend/
├── public/                 # Statik fayllar
│   └── index.html         # Asosiy HTML fayli
├── src/
│   ├── components/        # Umumiy komponentlar
│   │   └── Navbar.tsx     # Navigatsiya paneli
│   ├── contexts/          # React kontekstlar
│   │   └── AuthContext.tsx # Autentifikatsiya konteksti
│   ├── pages/             # Sahifalar
│   │   ├── Login.tsx      # Login sahifasi
│   │   ├── Dashboard.tsx  # Bosh sahifa
│   │   ├── Courses.tsx    # Kurslar sahifasi
│   │   ├── Lessons.tsx    # Darslar sahifasi
│   │   ├── Tests.tsx      # Testlar sahifasi
│   │   └── Certificates.tsx # Sertifikatlar sahifasi
│   ├── App.tsx            # Asosiy ilova komponenti
│   ├── index.tsx          # Kirish nuqtasi
│   └── tsconfig.json      # TypeScript konfiguratsiyasi
├── package.json           # Kutubxonalar ro‘yxati
└── README.md              # Hujjatlar
```

---

## 🔌 API integratsiyasi

Frontend quyidagi API endpointlaridan foydalanadi:

| Endpoint | Tavsif |
|----------|--------|
| `POST /api/login/` | Tizimga kirish |
| `GET /api/courses/` | Kurslar ro'yxati |
| `GET /api/lessons/` | Darslar ro'yxati |
| `GET /api/simple-tests/` | Oddiy testlar |
| `GET /api/oral-tests/` | Og'zaki testlar |
| `GET /api/certificates/` | Sertifikatlar |
| `POST /api/certificates/{id}/reset/` | Sertifikatni qayta berish |

---

## 🎨 UI/Design

- **Material-UI (MUI)**: Zamonaviy va chiroyli komponentlar
- **Responsive design**: Barcha qurilmalarda ishlaydi
- **Dark/Light theme**: Material-UI tema tizimi
- **Uzbek language**: Interfeys to'liq o'zbek tilida

---

## 🔧 Konfiguratsiya

### Backend URL

API manzilini o'zgartirish uchun `src/contexts/AuthContext.tsx` faylida quyidagi qatorni tahrirlang:

```typescript
const response = await axios.post('http://localhost:8000/api/login/', {
```

---

## 🚀 Production uchun yig'ish

```bash
# Production build yaratish
npm run build

# Build papkasini tekshirish
ls -la build/
```

`build` papkasidagi fayllarni har qanday web serverga joylashtirishingiz mumkin.

---

## 🐞 Debugging

- Chrome Developer Tools dan foydalaning
- Network tabda API so'rovlarini kuzating
- Console xatolarni tekshiring

---

## 📞 Aloqa

- **Muallif**: Husanbek
- **Web**: husanbek-coder.uz
- **Email**: husanbekdev@gmail.com
- **YouTube**: @it_creative

---

## 📜 Litsenziya

Ushbu loyiha MIT litsenziyasi asosida tarqatilgan.
