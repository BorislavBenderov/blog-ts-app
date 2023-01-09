import { useContext, useState } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Footer } from '../../components';
import { PostContext, PostContextType } from '../../contexts/PostContext';
import { useNavigate, useParams } from 'react-router-dom';
import { doc, updateDoc } from 'firebase/firestore';
import { database } from '../../firebaseConfig';

const theme = createTheme();

export const EditPost = () => {
    const { posts } = useContext(PostContext) as PostContextType;
    const { postId } = useParams();
    const navigate = useNavigate();
    const [err, setErr] = useState('');
    const currentPost = posts.find((post) => post.id === postId);

    const [values, setValues] = useState({
        title: currentPost?.title,
        description: currentPost?.description,
        imageUrl: currentPost?.imageUrl,
        content: currentPost?.content
    });

    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValues((state) => ({
            ...state,
            [e.target.name]: e.target.value
        }))
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);

        const title = formData.get('title');
        const description = formData.get('description');
        const imageUrl = formData.get('imageUrl');
        const content = formData.get('content');

        if (title === '' || description === '' || imageUrl === '' || content === '') {
            setErr('Please fill all the fields!');
            return;
        }

        if (!imageUrl?.toString().startsWith('http')) {
            setErr('Please add a valid image url!');
            return;
        }

        updateDoc(doc(database, `posts/${postId}`), {
            title,
            description,
            imageUrl,
            content
        })
            .then(() => {
                navigate(`/posts/${postId}`);
            })
            .catch((err) => {
                setErr(err.message);
            })
    }

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Typography component="h1" variant="h5">
                        Edit Post
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="title"
                            label="Title"
                            name="title"
                            value={values.title}
                            onChange={changeHandler}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="description"
                            label="Description"
                            id="description"
                            value={values.description}
                            onChange={changeHandler}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="imageUrl"
                            label="Image Url"
                            id="imageUrl"
                            value={values.imageUrl}
                            onChange={changeHandler}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            multiline
                            name="content"
                            label="Content"
                            id="content"
                            value={values.content}
                            onChange={changeHandler}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Edit
                        </Button>
                        <Typography sx={{ color: 'red', textAlign: 'center' }}>
                            {err}
                        </Typography>
                    </Box>
                </Box>
                <Footer />
            </Container>
        </ThemeProvider>
    );
}