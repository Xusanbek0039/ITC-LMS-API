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
  DialogActions,
  Avatar
} from '@mui/material';
import { Search, School, Download, Edit, Delete, Person } from '@mui/icons-material';
import axios from 'axios';

interface Certificate {
  id: number;
  full_name: string;
  file?: string;
  created_at: string;
  has_certificate: boolean;
}

const Certificates: React.FC = () => {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    fetchCertificates();
  }, []);

  const fetchCertificates = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/certificates/');
      setCertificates(response.data.results || response.data);
    } catch (error) {
      console.error('Sertifikatlarni olishda xatolik:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDialog = (certificate: Certificate) => {
    setSelectedCertificate(certificate);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedCertificate(null);
  };

  const handleDownload = (certificate: Certificate) => {
    if (certificate.file) {
      window.open(certificate.file, '_blank');
    }
  };

  const handleReset = async (certificateId: number) => {
    try {
      await axios.post(`http://localhost:8000/api/certificates/${certificateId}/reset/`);
      fetchCertificates(); // Qayta yuklash
    } catch (error) {
      console.error('Sertifikatni qayta berishda xatolik:', error);
    }
  };

  const filteredCertificates = certificates.filter(certificate =>
    certificate.full_name.toLowerCase().includes(searchTerm.toLowerCase())
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
          Sertifikatlar
        </Typography>
        <Button
          variant="contained"
          startIcon={<School />}
          sx={{ ml: 2 }}
        >
          Yangi sertifikat qo'shish
        </Button>
      </Box>

      <TextField
        fullWidth
        variant="outlined"
        placeholder="Sertifikatlarni qidirish..."
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
        {filteredCertificates.map((certificate) => (
          <Grid item xs={12} sm={6} md={4} key={certificate.id}>
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
                <Box display="flex" alignItems="center" mb={2}>
                  <Avatar sx={{ mr: 2, bgcolor: 'primary.main' }}>
                    <Person />
                  </Avatar>
                  <Box flex={1}>
                    <Typography variant="h6" gutterBottom>
                      {certificate.full_name}
                    </Typography>
                    <Chip
                      label={certificate.has_certificate ? 'Sertifikat bor' : 'Sertifikat yo\'q'}
                      size="small"
                      color={certificate.has_certificate ? 'success' : 'warning'}
                      variant="outlined"
                    />
                  </Box>
                </Box>

                <Typography variant="body2" color="text.secondary" mb={2}>
                  Berilgan sana: {new Date(certificate.created_at).toLocaleDateString('uz-UZ')}
                </Typography>

                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Box>
                    {certificate.has_certificate && certificate.file && (
                      <Button
                        size="small"
                        startIcon={<Download />}
                        onClick={() => handleDownload(certificate)}
                      >
                        Yuklab olish
                      </Button>
                    )}
                    <Button
                      size="small"
                      startIcon={<Edit />}
                      onClick={() => handleOpenDialog(certificate)}
                    >
                      Ko'rish
                    </Button>
                  </Box>
                  <Box>
                    {certificate.has_certificate && (
                      <Button
                        size="small"
                        color="warning"
                        onClick={() => handleReset(certificate.id)}
                      >
                        Qayta berish
                      </Button>
                    )}
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

      {filteredCertificates.length === 0 && !loading && (
        <Box textAlign="center" py={4}>
          <Typography variant="h6" color="text.secondary">
            {searchTerm ? 'Qidiruv bo\'yicha hech qanday sertifikat topilmadi' : 'Hozircha hech qanday sertifikat yo\'q'}
          </Typography>
        </Box>
      )}

      <Dialog open={dialogOpen} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>Sertifikat ma'lumotlari</DialogTitle>
        <DialogContent>
          <Box display="flex" alignItems="center" mb={2}>
            <Avatar sx={{ mr: 2, bgcolor: 'primary.main' }}>
              <Person />
            </Avatar>
            <Box>
              <Typography variant="h6">{selectedCertificate?.full_name}</Typography>
              <Chip
                label={selectedCertificate?.has_certificate ? 'Sertifikat bor' : 'Sertifikat yo\'q'}
                size="small"
                color={selectedCertificate?.has_certificate ? 'success' : 'warning'}
                variant="outlined"
              />
            </Box>
          </Box>
          
          <Typography variant="body2" color="text.secondary" paragraph>
            Yaratilgan sana: {selectedCertificate && new Date(selectedCertificate.created_at).toLocaleDateString('uz-UZ')}
          </Typography>

          {selectedCertificate?.has_certificate && selectedCertificate.file && (
            <Button
              variant="contained"
              startIcon={<Download />}
              href={selectedCertificate.file}
              target="_blank"
              rel="noopener noreferrer"
              fullWidth
            >
              Sertifikatni yuklab olish
            </Button>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Yopish</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Certificates;
