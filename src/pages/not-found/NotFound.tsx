import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Footer } from '../../components';


const theme = createTheme();

export const NotFound = () => {
    return (
        <ThemeProvider theme={theme}>
      <CssBaseline />
      <main>
        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              404 Page
            </Typography>
            <Typography
              component="h1"
              variant="h5"
              align="center"
              color="text.primary"
              gutterBottom
            >
              The requested page was not found on this server.
            </Typography>
          </Container>
        </Box>
      </main>
      <Footer />
    </ThemeProvider>
    );
}