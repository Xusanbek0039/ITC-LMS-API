import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  CircularProgress,
  TextField,
  InputAdornment,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import { Search, PlayArrow, YouTube, Edit, Delete } from '@mui/icons-material';
import axios from 'axios';

interface Lesson {
  id: number;
  title: string;
  youtube_url: string;
  guide: string;
  order: number;
  course: number;
  course_name?: string;
  created_at: string;
}

const Lessons: React.FC = () => {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    fetchLessons();
  }, []);

  const fetchLessons = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/lessons/');
      const lessonsData = response.data.results || response.data;
      
      // Kurs nomlarini olish uchun qo'shimcha so'rov
      const lessonsWithCourseNames = await Promise.all(
        lessonsData.map(async (lesson: Lesson) => {
          try {
            const courseResponse = await axios.get(`http://localhost:8000/api/courses/${lesson.course}/`);
            return { ...lesson, course_name: courseResponse.data.name };
          } catch {
            return { ...lesson, course_name: 'Noma\'lum kurs' };
          }
        })
      );
      
      setLessons(lessonsWithCourseNames);
    } catch (error) {
      console.error('Darslarni olishda xatolik:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDialog = (lesson: Lesson) => {
    setSelectedLesson(lesson);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedLesson(null);
  };

  const filteredLessons = lessons.filter(lesson =>
    lesson.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lesson.guide.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lesson.course_name?.toLowerCase().includes(searchTerm.toLowerCase())
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
          Darslar
        </Typography>
        <Button
          variant="contained"
          startIcon={<PlayArrow />}
          sx={{ ml: 2 }}
        >
          Yangi dars qo'shish
        </Button>
      </Box>

      <TextField
        fullWidth
        variant="outlined"
        placeholder="Darslarni qidirish..."
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
        {filteredLessons.map((lesson) => (
          <Grid item xs={12} sm={6} md={4} key={lesson.id}>
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
              <CardContent sx={{ flex: 1 }}>
                <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
                  <Typography variant="h6" gutterBottom>
                    {lesson.order}. {lesson.title}
                  </Typography>
                  <Chip
                    label={lesson.course_name || 'Kurs'}
                    size="small"
                    color="primary"
                    variant="outlined"
                  />
                </Box>
                
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 2, flexGrow: 1 }}
                >
                  {lesson.guide.substring(0, 100)}...
                </Typography>

                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Button
                    size="small"
                    startIcon={<YouTube />}
                    color="error"
                    onClick={() => window.open(lesson.youtube_url, '_blank')}
                  >
                    YouTube
                  </Button>
                  <Box>
                    <Button
                      size="small"
                      startIcon={<Edit />}
                      onClick={() => handleOpenDialog(lesson)}
                    >
                      Ko'rish
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

      {filteredLessons.length === 0 && !loading && (
        <Box textAlign="center" py={4}>
          <Typography variant="h6" color="text.secondary">
            {searchTerm ? 'Qidiruv bo\'yicha hech qanday dars topilmadi' : 'Hozircha hech qanday dars yo\'q'}
          </Typography>
        </Box>
      )}

      <Dialog open={dialogOpen} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>
          {selectedLesson?.order}. {selectedLesson?.title}
        </DialogTitle>
        <DialogContent>
          <Typography variant="subtitle2" color="primary" gutterBottom>
            Kurs: {selectedLesson?.course_name}
          </Typography>
          <Typography variant="body1" paragraph>
            {selectedLesson?.guide}
          </Typography>
          <Typography variant="subtitle2" gutterBottom>
            Video havola:
          </Typography>
          <Button
            variant="outlined"
            startIcon={<YouTube />}
            href={selectedLesson?.youtube_url}
            target="_blank"
            rel="noopener noreferrer"
          >
            YouTube'da ko'rish
          </Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Yopish</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Lessons;
