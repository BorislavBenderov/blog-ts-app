import { Typography } from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { database } from "../../firebaseConfig";
import { AuthContext, IAuth } from "../../contexts/AuthContext";
import { useContext } from "react";

export const PostLikes = ({ currentPost }: any) => {
    const { loggedUser } = useContext(AuthContext) as IAuth;

    const onLike = async () => {
        if (currentPost?.likes?.includes(loggedUser?.uid)) {
            try {
                await updateDoc(doc(database, 'posts', currentPost.id), {
                    likes: arrayRemove(loggedUser?.uid)
                });
            } catch (error: any) {
                alert(error.message);
            }

        } else {
            try {
                await updateDoc(doc(database, 'posts', currentPost.id), {
                    likes: arrayUnion(loggedUser?.uid)
                });
            } catch (error: any) {
                alert(error.message);
            }
        }
    }

    return (
        <Typography onClick={onLike} sx={{ cursor: 'pointer' }}>
            {currentPost?.likes.includes(loggedUser?.uid)
                ? <FavoriteIcon sx={{ color: 'red' }} />
                : <FavoriteBorderIcon />}
        </Typography>
    );
}