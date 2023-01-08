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
import { AuthContext, IAuth } from '../../contexts/AuthContext';

const theme = createTheme();

export const UserPosts = () => {
    const { posts } = useContext(PostContext) as PostContextType;
    const { loggedUser } = useContext(AuthContext) as IAuth;

    const userPosts = posts.filter(post => post?.ownerId === loggedUser?.uid);

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
                            My Posts
                        </Typography>
                        <Grid container justifyContent='center'>
                            <SearchBar />
                        </Grid>

                    </Container>
                </Box>
                <Container sx={{ py: 8 }} maxWidth="md">
                    <Grid container spacing={4} direction="column">
                        {userPosts.length > 0
                            ? userPosts.map((post: IPost) => <PostCard key={post.id} post={post} />)
                            : <Typography
                                component="p"
                                variant="h6"
                                align="center"
                                color="text.primary"
                                gutterBottom
                            >
                                There are no posts to show!
                            </Typography>
                        }
                    </Grid>
                </Container>
            </main>
            <Footer />
        </ThemeProvider>
    );
}