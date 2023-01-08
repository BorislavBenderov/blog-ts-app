import { Button } from "@mui/material";
import { deleteDoc, doc } from "firebase/firestore";
import { database } from "../../firebaseConfig";

export const DeletePost = ({ postId }) => {
    const onDeletePost = async () => {
        const confirmation = window.confirm('Are you sure you want to delete this post?');

        if (confirmation) {
            deleteDoc(doc(database, 'posts', postId));
        }
    }
    
    return (
        <Button size="small" onClick={onDeletePost}>Delete</Button>
    );
}