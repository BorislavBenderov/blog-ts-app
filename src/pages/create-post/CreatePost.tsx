import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Footer } from '../../components';
import { useNavigate } from 'react-router-dom';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { database } from '../../firebaseConfig';
import { useContext, useState } from 'react';
import { AuthContext, IAuth } from '../../contexts/AuthContext';

const theme = createTheme();

export const CreatePost = () => {
    const navigate = useNavigate();
    const { loggedUser } = useContext(AuthContext) as IAuth;
    const [err, setErr] = useState('');

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

        const postData = {
            title,
            description,
            imageUrl,
            content,
            ownerId: loggedUser?.uid,
            timestamp: serverTimestamp(),
            likes: []
        };

        addDoc(collection(database, 'posts'), postData)
            .then(() => {
                navigate('/');
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
                        Create Post
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            multiline
                            id="title"
                            label="Title"
                            name="title"
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            multiline
                            name="description"
                            label="Description"
                            id="description"
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            multiline
                            name="imageUrl"
                            label="Image Url"
                            id="imageUrl"
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            multiline
                            name="content"
                            label="Content"
                            id="content"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Create
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