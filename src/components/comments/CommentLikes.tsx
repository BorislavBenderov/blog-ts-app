import { Typography } from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { database } from "../../firebaseConfig";
import { AuthContext, IAuth } from "../../contexts/AuthContext";
import { useContext } from "react";

export const CommentLikes = ({ comment }: any) => {
    const { loggedUser } = useContext(AuthContext) as IAuth;

    const onLike = async () => {
        if (comment?.likes?.includes(loggedUser?.uid)) {
            try {
                await updateDoc(doc(database, 'comments', comment?.id), {
                    likes: arrayRemove(loggedUser?.uid)
                });
            } catch (error: any) {
                alert(error.message);
            }

        } else {
            try {
                await updateDoc(doc(database, 'comments', comment?.id), {
                    likes: arrayUnion(loggedUser?.uid)
                });
            } catch (error: any) {
                alert(error.message);
            }
        }
    }

    return (
        <Typography onClick={onLike} sx={{ cursor: 'pointer', display: 'inline-block' }}>
            {comment?.likes.includes(loggedUser?.uid)
                ? <FavoriteIcon sx={{ color: 'red' }} />
                : <FavoriteBorderIcon />}
            {comment?.likes?.length}
        </Typography>
    );
}