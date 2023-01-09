import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Typography from '@mui/material/Typography';
import { Box, Container } from "@mui/system";
import { useContext, useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { database } from "../../firebaseConfig";
import { AuthContext, IAuth } from "../../contexts/AuthContext";

const theme = createTheme();

export const CreateComment = ({ currentPost }: any) => {
    const { loggedUser } = useContext(AuthContext) as IAuth;
    const [input, setInput] = useState<string>('');
    const [err, setErr] = useState('');
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (input === '') {
            setErr('Please enter a valid comment');
            setTimeout(() => {
                setErr('');
            }, 3000);
            return;
        }

        addDoc(collection(database, 'comments'), {
            text: input,
            commentId: currentPost.id,
            uid: loggedUser?.uid,
            email: loggedUser?.email,
            timestamp: serverTimestamp(),
            likes: []
        })
            .then(() => {
                setInput('');
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
                        Create Comment
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            multiline
                            name="comment"
                            label="Comment"
                            id="comment"
                            value={input}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInput(e.target.value)}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Add Comment
                        </Button>
                        <Typography sx={{ color: 'red', textAlign: 'center' }}>
                            {err}
                        </Typography>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}