import { Button, CardActions } from "@mui/material";
import { deleteDoc, doc } from "firebase/firestore";
import { database } from "../../firebaseConfig";

export const DeleteComment = ({ commentId }: any) => {

    const onDeleteComment = async () => {
        const confirmation = window.confirm('Are you sure you want to delete this post?');

        if (confirmation) {
            try {
                await deleteDoc(doc(database, 'comments', commentId));
            } catch (error: any) {
                alert(error.message)
            }
        }
    }

    return (
        <CardActions>
            <Button size="small" onClick={onDeleteComment}>
                Delete
            </Button>
        </CardActions>
    );
}