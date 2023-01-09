import { Button, Card, CardActions, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import Container from "@mui/material/Container";
import { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { DeletePost, Footer } from "../../components";
import { PostContext, PostContextType } from "../../contexts/PostContext";
import { PostLikes } from "../../components/post-likes/PostLikes";
import { CreateComment } from "../../components/comments/CreateComment";
import { Comments } from "../../components/comments/Comments";
import { AuthContext, IAuth } from "../../contexts/AuthContext";

export const PostDetails = () => {
    const { postId } = useParams();
    const { posts } = useContext(PostContext) as PostContextType;
    const { loggedUser } = useContext(AuthContext) as IAuth;

    const currentPost = posts.find(post => post.id === postId);
    const ownerOfPost = currentPost?.ownerId === loggedUser?.uid;

    return (
        <>
            <Container sx={{ py: 8 }} maxWidth="md">
                <Grid container spacing={4} direction="column">
                    <Grid item xs={12} sm={6} md={4}>
                        <Card
                            sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                        >
                            <CardMedia
                                component="img"
                                height='500px'
                                image={currentPost?.imageUrl}
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
                                {!loggedUser
                                    ? <Typography>Likes: {currentPost?.likes?.length}</Typography>
                                    : <PostLikes currentPost={currentPost} />}
                            </CardContent>
                            {ownerOfPost
                                ? <CardActions>
                                    <Button size="small">
                                        <Link to={`/edit/${postId}`}>Edit</Link>
                                    </Button>
                                    <DeletePost postId={postId} />
                                </CardActions>
                                : null}
                        </Card>
                    </Grid>
                </Grid>
                {loggedUser
                    ?
                    <CreateComment currentPost={currentPost} />
                    : null}
                <Comments postId={postId} />
                <Footer />
            </Container>
        </>
    );
}