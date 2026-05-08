import React, { useState, useEffect } from 'react';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Paper,
  CircularProgress,
  alpha,
  useTheme,
} from '@mui/material';
import {
  Book,
  VideoLibrary,
  Quiz,
  School,
  People,
  TrendingUp,
} from '@mui/icons-material';
import api from '../api';

interface DashboardStats {
  totalCourses: number;
  totalLessons: number;
  totalTests: number;
  totalCertificates: number;
  totalStudents: number;
  totalTeachers: number;
}

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalCourses: 0,
    totalLessons: 0,
    totalTests: 0,
    totalCertificates: 0,
    totalStudents: 0,
    totalTeachers: 0,
  });
  const [loading, setLoading] = useState(true);
  const theme = useTheme();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [coursesRes, lessonsRes, testsRes, certificatesRes, studentsRes, teachersRes] =
          await Promise.all([
            api.get('/courses/'),
            api.get('/lessons/'),
            api.get('/simple-tests/'),
            api.get('/certificates/'),
            api.get('/students/'),
            api.get('/teachers/'),
          ]);

        setStats({
          totalCourses: coursesRes.data.count || coursesRes.data.length,
          totalLessons: lessonsRes.data.count || lessonsRes.data.length,
          totalTests: testsRes.data.count || testsRes.data.length,
          totalCertificates: certificatesRes.data.count || certificatesRes.data.length,
          totalStudents: studentsRes.data.count || studentsRes.data.length,
          totalTeachers: teachersRes.data.count || teachersRes.data.length,
        });
      } catch (error) {
        console.error('Statistikani olishda xatolik:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const statCards = [
    {
      title: 'Kurslar',
      value: stats.totalCourses,
      icon: <Book sx={{ fontSize: 32 }} />,
      color: '#1976d2',
      gradient: 'linear-gradient(135deg, #1976d2, #42a5f5)',
    },
    {
      title: 'Darslar',
      value: stats.totalLessons,
      icon: <VideoLibrary sx={{ fontSize: 32 }} />,
      color: '#388e3c',
      gradient: 'linear-gradient(135deg, #388e3c, #66bb6a)',
    },
    {
      title: 'Testlar',
      value: stats.totalTests,
      icon: <Quiz sx={{ fontSize: 32 }} />,
      color: '#f57c00',
      gradient: 'linear-gradient(135deg, #f57c00, #ffb74d)',
    },
    {
      title: 'Sertifikatlar',
      value: stats.totalCertificates,
      icon: <School sx={{ fontSize: 32 }} />,
      color: '#7b1fa2',
      gradient: 'linear-gradient(135deg, #7b1fa2, #ba68c8)',
    },
    {
      title: 'Talabalar',
      value: stats.totalStudents,
      icon: <People sx={{ fontSize: 32 }} />,
      color: '#d32f2f',
      gradient: 'linear-gradient(135deg, #d32f2f, #ef5350)',
    },
    {
      title: "O'qituvchilar",
      value: stats.totalTeachers,
      icon: <TrendingUp sx={{ fontSize: 32 }} />,
      color: '#0288d1',
      gradient: 'linear-gradient(135deg, #0288d1, #29b6f6)',
    },
  ];

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="400px">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Box mb={4}>
        <Typography variant="h4" fontWeight={700} gutterBottom>
          Dashboard
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          IT Creative LMS tizimining umumiy statistikasi
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {statCards.map((card, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'all 0.3s ease',
                overflow: 'visible',
                '&:hover': {
                  transform: 'translateY(-6px)',
                  boxShadow: `0 12px 40px ${alpha(card.color, 0.3)}`,
                },
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Box display="flex" alignItems="center" mb={2}>
                  <Box
                    sx={{
                      background: card.gradient,
                      color: 'white',
                      borderRadius: 3,
                      p: 1.5,
                      mr: 2,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: `0 4px 14px ${alpha(card.color, 0.4)}`,
                    }}
                  >
                    {card.icon}
                  </Box>
                  <Box flex={1}>
                    <Typography variant="h3" fontWeight={800} lineHeight={1}>
                      {card.value}
                    </Typography>
                    <Typography
                      variant="body1"
                      color="text.secondary"
                      fontWeight={500}
                      sx={{ mt: 0.5 }}
                    >
                      {card.title}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Paper
        sx={{
          mt: 4,
          p: 4,
          borderRadius: 4,
          background:
            theme.palette.mode === 'dark'
              ? 'linear-gradient(135deg, rgba(25,118,210,0.1), rgba(118,75,162,0.1))'
              : 'linear-gradient(135deg, rgba(25,118,210,0.05), rgba(118,75,162,0.05))',
          border: `1px solid ${
            theme.palette.mode === 'dark'
              ? 'rgba(255,255,255,0.08)'
              : 'rgba(0,0,0,0.06)'
          }`,
        }}
      >
        <Typography variant="h6" fontWeight={700} gutterBottom>
          🎓 Tizim haqida
        </Typography>
        <Typography variant="body1" color="text.secondary" lineHeight={1.8}>
          IT Creative Learning Management System (LMS) — bu zamonaviy ta'lim boshqaruv tizimi.
          Ushbu platforma orqali o'qituvchilar va talabalar o'rtasidagi o'qitish jarayonini to'liq
          avtomatlashtirish mumkin. Kurslar, darslar, testlar va sertifikatlarni boshqarish uchun
          qulay interfeys taqdim etadi.
        </Typography>
      </Paper>
    </Box>
  );
};

export default Dashboard;
