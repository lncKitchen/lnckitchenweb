// Importing Dependencies
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CssVarsProvider,
  useColorScheme,
  GlobalStyles,
  CssBaseline,
  Box,
  Button,
  Checkbox,
  Divider,
  FormControl,
  FormLabel,
  IconButton,
  Link as MuiLink,
  Input,
  Typography,
  Stack,
} from '@mui/joy';
import { DarkModeRounded, LightModeRounded } from '@mui/icons-material';
import { useAlert } from "components/Contexts/AlertContext";
import GoogleIcon from 'assets/GoogleIcon';
import Logo from 'assets/logo.png';
import handleGoogleSignIn from './continueWithGoogle';  
import { signInWithPhone } from './loginWithPhone';

function ColorSchemeToggle(props) {
  const { onClick, ...other } = props;
  const { mode, setMode } = useColorScheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <IconButton
      aria-label="toggle light/dark mode"
      size="sm"
      variant="outlined"
      disabled={!mounted}
      onClick={(event) => {
        setMode(mode === 'light' ? 'dark' : 'light');
        onClick?.(event);
      }}
      {...other}
      sx={{
        borderRadius: '50%',
        width: '24px',
        height: '24px',
      }}
    >
      {mode === 'light' ? <DarkModeRounded /> : <LightModeRounded />}
    </IconButton>
  );
}

export default function SignIn() {
  const navigate = useNavigate();
  const { showAlert } = useAlert();
  const [formData, setFormData] = useState({
    identifier: '',
    password: '',
    persistent: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    signInWithPhone(formData.identifier, formData.password, navigate);
  };  

  
  const handleGoogleSignInClick = () => {
    handleGoogleSignIn(navigate);
  };

  const navigateToHome = () => {
    navigate('/');
  };

  const navigateToSignUp = () => {
    navigate('/signup');
  };

  return (
    <CssVarsProvider defaultMode="dark" disableTransitionOnChange>
      <CssBaseline />
      <GlobalStyles
        styles={{
          ':root': {
            '--Form-maxWidth': '800px',
            '--Transition-duration': '0.4s',
          },
        }}
      />
      <Box
        sx={(theme) => ({
          marginTop: '-100px',
          width: { xs: '100%', md: '50vw' },
          transition: 'width var(--Transition-duration)',
          transitionDelay: 'calc(var(--Transition-duration) + 0.1s)',
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          justifyContent: 'flex-end',
          backdropFilter: 'blur(12px)',
          backgroundColor: 'rgba(255 255 255 / 1)',
          [theme.getColorSchemeSelector('dark')]: {
            backgroundColor: '#000',
          },
        })}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100dvh',
            width: '100%',
            px: 2,
          }}
        >
          <Box
            component="header"
            sx={{
              py: 3,
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <Box sx={{ gap: 2, display: 'flex', alignItems: 'center' }}>
              <Button onClick={navigateToHome} style={{ background: 'none', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <IconButton variant="soft" color="primary" size="sm">
                  <img src={Logo} alt="logo" height="48px" width="48px" style={{ padding: '0' }} color="#fff" />
                </IconButton> &nbsp; &nbsp;
                <Typography level="title-lg">lncKitchen</Typography>
              </Button>
            </Box>
            <ColorSchemeToggle />
          </Box>
          <Box
            component="main"
            sx={{
              my: 'auto',
              py: 2,
              pb: 5,
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              width: 400,
              maxWidth: '100%',
              mx: 'auto',
              borderRadius: 'sm',
              '& form': {
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
              },
              [`& .MuiFormLabel-asterisk`]: {
                visibility: 'hidden',
              },
            }}
          >
            <Stack gap={4} sx={{ mb: 2 }}>
              <Stack gap={1}>
                <Typography component="h1" level="h3">
                  Sign in
                </Typography>
                <Typography level="body-sm">
                  New to company?{' '}
                  <MuiLink onClick={navigateToSignUp} level="title-sm">
                    Sign up!
                  </MuiLink>
                </Typography>
              </Stack>
              <Button
                variant="soft"
                color="neutral"
                fullWidth
                startDecorator={<GoogleIcon />}
                onClick={handleGoogleSignInClick}
              >
                Continue with Google
              </Button>
            </Stack>
            <Divider
              sx={(theme) => ({
                [theme.getColorSchemeSelector('light')]: {
                  color: { xs: '#000', md: 'text.tertiary' },
                },
              })}
            >
              or
            </Divider>
            <Stack gap={4} sx={{ mt: 2 }}>
              <form onSubmit={handleFormSubmit}>
                <FormControl required>
                  <FormLabel>Phone or Email</FormLabel>
                  <Input
                    type="text"
                    name="identifier"
                    value={formData.identifier}
                    onChange={handleChange}
                  />
                </FormControl>
                <FormControl required>
                  <FormLabel>Password</FormLabel>
                  <Input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </FormControl>
                <Stack gap={4} sx={{ mt: 2 }}>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <Checkbox
                      size="sm"
                      label="Remember me"
                      name="persistent"
                      checked={formData.persistent}
                      onChange={handleChange}
                    />
                    <MuiLink level="title-sm" href="#replace-with-a-link">
                      Forgot your password?
                    </MuiLink>
                  </Box>
                  <Button type="submit" fullWidth>
                    Sign in
                  </Button>
                </Stack>
              </form>
            </Stack>
          </Box>
          <Box component="footer" sx={{ py: 3 }}>
            <Typography level="body-xs" textAlign="center">
              © lncKitchen {new Date().getFullYear()}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box
        sx={(theme) => ({
          height: '100%',
          position: 'fixed',
          right: 0,
          top: 0,
          bottom: 0,
          left: { xs: 0, md: '50vw' },
          transition:
            'background-image var(--Transition-duration), left var(--Transition-duration) !important',
          transitionDelay: 'calc(var(--Transition-duration) + 0.1s)',
          backgroundColor: 'background.level1',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundImage:
            'url(https://images.unsplash.com/photo-1527181152855-fc03fc7949c8?auto=format&w=1000&dpr=2)',
          [theme.getColorSchemeSelector('dark')]: {
            backgroundImage:
              'url(https://images.unsplash.com/photo-1572072393749-3ca9c8ea0831?auto=format&w=1000&dpr=2)',
          },
        })}
      />
    </CssVarsProvider>
  );
}