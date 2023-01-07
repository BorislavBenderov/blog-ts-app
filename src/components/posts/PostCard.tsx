import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { IPost } from '../../contexts/PostContext';

interface Props {
    post: IPost,
    key: string | undefined
}

export const PostCard = ({post} : Props) => {
    return (
            <Grid item xs={12} sm={6} md={4}>
                <Card
                    sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                <CardMedia
                    component="img"
                    height='500px'
                    image="https://source.unsplash.com/random"
                    alt="random"
                />
                <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                        {post.title}
                    </Typography>
                    <Typography>
                        {post.description}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small">Read</Button>
                </CardActions>
            </Card>
        </Grid>
    );
}