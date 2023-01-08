import { Button, Card, CardActions, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import Container from "@mui/material/Container";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import { PostContext } from "../../contexts/PostContext";

export const PostDetails = () => {
    const { postId } = useParams();
    const { posts } = useContext(PostContext);

    const currentPost = posts.find(post => post.id === postId);
    return (
        <Container sx={{ py: 8 }} maxWidth="md">
            <Grid container spacing={4} direction="column">
                <Grid item xs={12} sm={6} md={4}>
                    <Card
                        sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                    >
                        <CardMedia
                            component="img"
                            height='500px'
                            image={currentPost.imageUrl}
                            alt="random"
                        />
                        <CardContent sx={{ flexGrow: 1 }}>
                            <Typography gutterBottom variant="h5" component="h2">
                                {currentPost?.title}
                            </Typography>
                            <Typography>
                                {currentPost?.description}
                            </Typography>
                            <Typography>
                                {currentPost?.content}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small">Read</Button>
                        </CardActions>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    );
}