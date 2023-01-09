import { Card, CardActions, CardContent, Grid, Typography } from "@mui/material";
import { useContext } from "react";
import { AuthContext, IAuth } from "../../contexts/AuthContext";
import { CommentLikes } from "./CommentLikes";
import { IComment } from "./Comments";
import { DeleteComment } from "./DeleteComment";

interface Props {
    comment: IComment,
    key: string | undefined
}

export const Comment = ({ comment }: Props) => {
    const { loggedUser } = useContext(AuthContext) as IAuth;

    const ownerOfComment = comment?.uid === loggedUser?.uid;

    return (
        <Grid container spacing={4} direction="column">
            <Grid item xs={12} sm={6} md={4}>
                <Card
                    sx={{ height: '100%', display: 'flex', flexDirection: 'column', marginBottom: '20px' }}
                >
                    <CardContent sx={{ flexGrow: 1 }}>
                        <Typography gutterBottom variant="h5" component="h2">
                            {comment?.email}
                        </Typography>
                        <Typography>
                            {comment?.text}
                        </Typography>
                        {loggedUser
                            ? <CommentLikes comment={comment} />
                            : <Typography>Comment Likes: {comment?.likes?.length}</Typography>}

                    </CardContent>
                    {ownerOfComment
                        ? <CardActions>
                            <DeleteComment commentId={comment?.id} />
                        </CardActions>
                        : null}
                </Card>
            </Grid>
        </Grid>
    );
}