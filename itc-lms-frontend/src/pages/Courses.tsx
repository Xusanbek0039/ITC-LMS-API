import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  CircularProgress,
  TextField,
  InputAdornment,
  Chip
} from '@mui/material';
import { Search, Add, Edit, Delete } from '@mui/icons-material';
import axios from 'axios';

interface Course {
  id: number;
  name: string;
  description: string;
  image?: string;
  created_at: string;
}

const Courses: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/courses/');
      setCourses(response.data.results || response.data);
    } catch (error) {
      console.error('Kurslarni olishda xatolik:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredCourses = courses.filter(course =>
    course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="400px">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" gutterBottom>
          Kurslar
        </Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          sx={{ ml: 2 }}
        >
          Yangi kurs qo'shish
        </Button>
      </Box>

      <TextField
        fullWidth
        variant="outlined"
        placeholder="Kurslarni qidirish..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search />
            </InputAdornment>
          ),
        }}
        sx={{ mb: 3 }}
      />

      <Grid container spacing={3}>
        {filteredCourses.map((course) => (
          <Grid item xs={12} sm={6} md={4} key={course.id}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 4,
                },
              }}
            >
              {course.image && (
                <CardMedia
                  component="img"
                  height="200"
                  image={course.image}
                  alt={course.name}
                  sx={{ objectFit: 'cover' }}
                />
              )}
              <CardContent sx={{ flex: 1 }}>
                <Typography variant="h6" gutterBottom>
                  {course.name}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 2, flexGrow: 1 }}
                >
                  {course.description}
                </Typography>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Chip
                    label={`${new Date(course.created_at).toLocaleDateString('uz-UZ')}`}
                    size="small"
                    color="primary"
                    variant="outlined"
                  />
                  <Box>
                    <Button size="small" startIcon={<Edit />}>
                      Tahrirlash
                    </Button>
                    <Button size="small" color="error" startIcon={<Delete />}>
                      O'chirish
                    </Button>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {filteredCourses.length === 0 && !loading && (
        <Box textAlign="center" py={4}>
          <Typography variant="h6" color="text.secondary">
            {searchTerm ? 'Qidiruv bo\'yicha hech qanday kurs topilmadi' : 'Hozircha hech qanday kurs yo\'q'}
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default Courses;
