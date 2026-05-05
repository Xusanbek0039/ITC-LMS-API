import React, { useState, useEffect } from 'react';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Paper,
  CircularProgress
} from '@mui/material';
import {
  Book,
  VideoLibrary,
  Quiz,
  School,
  People,
  TrendingUp
} from '@mui/icons-material';
import axios from 'axios';

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

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [coursesRes, lessonsRes, testsRes, certificatesRes, studentsRes, teachersRes] = await Promise.all([
          axios.get('http://localhost:8000/api/courses/'),
          axios.get('http://localhost:8000/api/lessons/'),
          axios.get('http://localhost:8000/api/simple-tests/'),
          axios.get('http://localhost:8000/api/certificates/'),
          axios.get('http://localhost:8000/api/students/'),
          axios.get('http://localhost:8000/api/teachers/'),
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
      icon: <Book sx={{ fontSize: 40 }} />,
      color: '#1976d2',
    },
    {
      title: 'Darslar',
      value: stats.totalLessons,
      icon: <VideoLibrary sx={{ fontSize: 40 }} />,
      color: '#388e3c',
    },
    {
      title: 'Testlar',
      value: stats.totalTests,
      icon: <Quiz sx={{ fontSize: 40 }} />,
      color: '#f57c00',
    },
    {
      title: 'Sertifikatlar',
      value: stats.totalCertificates,
      icon: <School sx={{ fontSize: 40 }} />,
      color: '#7b1fa2',
    },
    {
      title: 'Talabalar',
      value: stats.totalStudents,
      icon: <People sx={{ fontSize: 40 }} />,
      color: '#d32f2f',
    },
    {
      title: 'O\'qituvchilar',
      value: stats.totalTeachers,
      icon: <TrendingUp sx={{ fontSize: 40 }} />,
      color: '#0288d1',
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
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" gutterBottom>
        IT Creative LMS tizimining umumiy statistikasi
      </Typography>

      <Grid container spacing={3}>
        {statCards.map((card, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 4,
                },
              }}
            >
              <CardContent>
                <Box display="flex" alignItems="center" mb={2}>
                  <Box
                    sx={{
                      backgroundColor: card.color,
                      color: 'white',
                      borderRadius: 2,
                      p: 1,
                      mr: 2,
                    }}
                  >
                    {card.icon}
                  </Box>
                  <Box flex={1}>
                    <Typography variant="h4" component="div">
                      {card.value}
                    </Typography>
                    <Typography variant="h6" color="text.secondary">
                      {card.title}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Paper sx={{ mt: 4, p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Tizim haqida
        </Typography>
        <Typography variant="body2" color="text.secondary">
          IT Creative Learning Management System (LMS) - bu zamonaviy ta'lim boshqaruv tizimi.
          Ushbu platforma orqali o'qituvchilar va talabalar o'rtasidagi o'qitish jarayonini to'liq
          avtomatlashtirish mumkin.
        </Typography>
      </Paper>
    </Box>
  );
};

export default Dashboard;
