import React, { useState } from 'react';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  CircularProgress,
  Avatar,
  InputAdornment,
  IconButton,
} from '@mui/material';
import { LockOutlined, Visibility, VisibilityOff, Person, Lock } from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';
import { useThemeMode } from '../contexts/ThemeContext';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const { mode, toggleTheme } = useThemeMode();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const success = await login(username, password);
    if (!success) {
      setError("Login yoki parol noto'g'ri");
    }
    setLoading(false);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: mode === 'dark'
          ? 'linear-gradient(135deg, #0d1117 0%, #161b22 50%, #0d1117 100%)'
          : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        position: 'relative',
      }}
    >
      {/* Theme toggle */}
      <Box sx={{ position: 'absolute', top: 16, right: 16 }}>
        <IconButton onClick={toggleTheme} sx={{ color: 'white' }}>
          {mode === 'dark' ? (
            <Typography fontSize={24}>☀️</Typography>
          ) : (
            <Typography fontSize={24}>🌙</Typography>
          )}
        </IconButton>
      </Box>

      <Container component="main" maxWidth="xs">
        <Paper
          elevation={mode === 'dark' ? 0 : 8}
          sx={{
            p: 5,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            borderRadius: 4,
            bgcolor: mode === 'dark' ? 'rgba(30,30,30,0.95)' : 'rgba(255,255,255,0.95)',
            backdropFilter: 'blur(20px)',
            border: mode === 'dark' ? '1px solid rgba(255,255,255,0.1)' : 'none',
          }}
        >
          <Avatar
            sx={{
              width: 72,
              height: 72,
              mb: 2,
              bgcolor: 'primary.main',
              boxShadow: '0 4px 20px rgba(25,118,210,0.4)',
            }}
          >
            <LockOutlined sx={{ fontSize: 36 }} />
          </Avatar>

          <Typography component="h1" variant="h4" fontWeight={700} gutterBottom>
            IT Creative
          </Typography>
          <Typography variant="body1" color="text.secondary" gutterBottom sx={{ mb: 3 }}>
            Tizimga kirish
          </Typography>

          {error && (
            <Alert severity="error" sx={{ width: '100%', mb: 2, borderRadius: 2 }}>
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Foydalanuvchi nomi"
              name="username"
              autoComplete="username"
              autoFocus
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={loading}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Person color="action" />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Parol"
              type={showPassword ? 'text' : 'password'}
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock color="action" />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                      size="small"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              sx={{
                mt: 3,
                mb: 2,
                py: 1.5,
                fontSize: 16,
                fontWeight: 700,
                boxShadow: '0 4px 14px rgba(25,118,210,0.4)',
                '&:hover': {
                  boxShadow: '0 6px 20px rgba(25,118,210,0.5)',
                },
              }}
              disabled={loading}
            >
              {loading ? <CircularProgress size={26} color="inherit" /> : 'Kirish'}
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default Login;
