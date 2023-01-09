import { Typography } from "@mui/material";
import { collection, onSnapshot, orderBy, query, QuerySnapshot, DocumentData } from "firebase/firestore";
import { useEffect, useState } from "react";
import { database } from "../../firebaseConfig";
import { Comment } from "./Comment";

export interface IComment {
    text?: string,
    commentId?: string,
    uid?: string,
    email?: string,
    id?: string,
    likes?: any
}

export const Comments = ({ postId }: any) => {
    const [comments, setComments] = useState<IComment[]>([]);

    useEffect(() => {
        const q = query(collection(database, 'comments'), orderBy("timestamp"));
        onSnapshot(q, (querySnapshot: QuerySnapshot<DocumentData>) => {
            setComments(querySnapshot.docs.map(item => {
                return { ...item.data(), id: item.id }
            }));
        });
    }, []);

    const currentPostComments = comments.filter(comment => comment.commentId === postId);

    return (
        <>
            <Typography
                component="p"
                variant="h3"
                align="center"
                color="text.primary"
                gutterBottom
                sx={{ marginTop: '40px' }}
            >
                Comments
            </Typography>
            {currentPostComments.length > 0
                ? currentPostComments.map((comment: IComment) => <Comment key={comment.id} comment={comment} />)
                : <Typography
                    component="p"
                    variant="h6"
                    align="center"
                    color="text.primary"
                    gutterBottom
                >
                    There are no comments for this post!
                </Typography>}
        </>
    );
}