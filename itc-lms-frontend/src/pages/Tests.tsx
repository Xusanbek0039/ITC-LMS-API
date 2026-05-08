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
  Tabs,
  Tab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import { Search, Quiz, Edit, Delete, PlayArrow, Timer } from '@mui/icons-material';
import api from '../api';

interface SimpleTest {
  id: number;
  name: string;
  description: string;
  duration: number;
}

interface OralTest {
  id: number;
  name: string;
  description: string;
  duration: number;
  pass_score: number;
  question_count: number;
  difficulty: string;
  topics: Array<{ name: string }>;
}

const Tests: React.FC = () => {
  const [simpleTests, setSimpleTests] = useState<SimpleTest[]>([]);
  const [oralTests, setOralTests] = useState<OralTest[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [tabValue, setTabValue] = useState(0);
  const [selectedTest, setSelectedTest] = useState<SimpleTest | OralTest | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    fetchTests();
  }, []);

  const fetchTests = async () => {
    try {
      const [simpleRes, oralRes] = await Promise.all([
        api.get('/simple-tests/'),
        api.get('/oral-tests/')
      ]);

      setSimpleTests(simpleRes.data.results || simpleRes.data);
      setOralTests(oralRes.data.results || oralRes.data);
    } catch (error) {
      console.error('Testlarni olishda xatolik:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleOpenDialog = (test: SimpleTest | OralTest) => {
    setSelectedTest(test);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedTest(null);
  };

  const filteredSimpleTests = simpleTests.filter(test =>
    test.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    test.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredOralTests = oralTests.filter(test =>
    test.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    test.description.toLowerCase().includes(searchTerm.toLowerCase())
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
          Testlar
        </Typography>
        <Button
          variant="contained"
          startIcon={<Quiz />}
          sx={{ ml: 2 }}
        >
          Yangi test qo'shish
        </Button>
      </Box>

      <TextField
        fullWidth
        variant="outlined"
        placeholder="Testlarni qidirish..."
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

      <Tabs value={tabValue} onChange={handleTabChange} sx={{ mb: 3 }}>
        <Tab label="Oddiy testlar" />
        <Tab label="Og'zaki testlar" />
      </Tabs>

      {tabValue === 0 && (
        <Grid container spacing={3}>
          {filteredSimpleTests.map((test) => (
            <Grid item xs={12} sm={6} md={4} key={test.id}>
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
                  <Typography variant="h6" gutterBottom>
                    {test.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 2, flexGrow: 1 }}
                  >
                    {test.description}
                  </Typography>
                  <Box display="flex" alignItems="center" mb={2}>
                    <Timer sx={{ mr: 1, fontSize: 20 }} />
                    <Typography variant="body2">
                      Davomiyligi: {test.duration} daqiqa
                    </Typography>
                  </Box>
                  <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Button
                      size="small"
                      startIcon={<PlayArrow />}
                      variant="contained"
                    >
                      Boshlash
                    </Button>
                    <Box>
                      <Button
                        size="small"
                        startIcon={<Edit />}
                        onClick={() => handleOpenDialog(test)}
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
      )}

      {tabValue === 1 && (
        <Grid container spacing={3}>
          {filteredOralTests.map((test) => (
            <Grid item xs={12} sm={6} md={4} key={test.id}>
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
                  <Typography variant="h6" gutterBottom>
                    {test.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 2, flexGrow: 1 }}
                  >
                    {test.description}
                  </Typography>
                  <Box display="flex" flexDirection="column" gap={1} mb={2}>
                    <Box display="flex" alignItems="center">
                      <Timer sx={{ mr: 1, fontSize: 20 }} />
                      <Typography variant="body2">
                        Davomiyligi: {test.duration} daqiqa
                      </Typography>
                    </Box>
                    <Typography variant="body2">
                      Savollar soni: {test.question_count}
                    </Typography>
                    <Typography variant="body2">
                      O'tish balli: {test.pass_score}%
                    </Typography>
                    <Chip
                      label={test.difficulty}
                      size="small"
                      color={
                        test.difficulty === 'easy' ? 'success' :
                        test.difficulty === 'medium' ? 'warning' : 'error'
                      }
                    />
                  </Box>
                  <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Button
                      size="small"
                      startIcon={<PlayArrow />}
                      variant="contained"
                    >
                      Boshlash
                    </Button>
                    <Box>
                      <Button
                        size="small"
                        startIcon={<Edit />}
                        onClick={() => handleOpenDialog(test)}
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
      )}

      {((tabValue === 0 && filteredSimpleTests.length === 0) ||
        (tabValue === 1 && filteredOralTests.length === 0)) && !loading && (
        <Box textAlign="center" py={4}>
          <Typography variant="h6" color="text.secondary">
            {searchTerm ? 'Qidiruv bo\'yicha hech qanday test topilmadi' : 'Hozircha hech qanday test yo\'q'}
          </Typography>
        </Box>
      )}

      <Dialog open={dialogOpen} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>{selectedTest?.name}</DialogTitle>
        <DialogContent>
          <Typography variant="body1" paragraph>
            {selectedTest?.description}
          </Typography>
          {selectedTest && 'duration' in selectedTest && (
            <Typography variant="body2" color="text.secondary">
              Davomiyligi: {selectedTest.duration} daqiqa
            </Typography>
          )}
          {selectedTest && 'pass_score' in selectedTest && (
            <>
              <Typography variant="body2" color="text.secondary">
                O'tish balli: {(selectedTest as any).pass_score}%
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Savollar soni: {(selectedTest as any).question_count}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Qiyinlik darajasi: {(selectedTest as any).difficulty}
              </Typography>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Yopish</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Tests;
