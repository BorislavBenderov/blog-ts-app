import { Button } from "@mui/material";
import { deleteDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { database } from "../../firebaseConfig";

export const DeletePost = ({ postId }) => {
    const navigate = useNavigate();

    const onDeletePost = () => {
        const confirmation = window.confirm('Are you sure you want to delete this post?');

        if (confirmation) {
            deleteDoc(doc(database, 'posts', postId))
                .then(() => {
                    navigate('/');
                })
                .catch((err) => {
                    alert(err.message);
                })
        }
    }

    return (
        <Button size="small" onClick={onDeletePost}>Delete</Button>
    );
}