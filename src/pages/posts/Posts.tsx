import { useContext } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { SearchBar } from '../../components';
import { Footer } from '../../components';
import { IPost, PostContext, PostContextType } from '../../contexts/PostContext';
import { PostCard } from '../../components/posts/PostCard';

const theme = createTheme();

export const Posts = () => {
  const { posts } = useContext(PostContext) as PostContextType;

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
              Blog Posts
            </Typography>
            <Grid container justifyContent='center'>
              <SearchBar />
            </Grid>

          </Container>
        </Box>
        <Container sx={{ py: 8 }} maxWidth="md">
          <Grid container spacing={4} direction="column">
            {posts.length > 0
              ? posts.map((post: IPost) => <PostCard key={post.id} post={post} />)
              : ''
            }
          </Grid>
        </Container>
      </main>
      <Footer />
    </ThemeProvider>
  );
}