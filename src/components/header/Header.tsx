import * as React from 'react';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import { Link } from 'react-router-dom';

export const Header = () => {

  return (
    <React.Fragment>
      <Toolbar sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Button size="small">
          <Link to='/'>
            Home
          </Link>
        </Button>
        <Typography
          component="h2"
          variant="h5"
          color="inherit"
          align="center"
          noWrap
          sx={{ flex: 1 }}
        >
        </Typography>
        <CardActions>
          <Button variant="outlined" size="small">
            <Link to='/login'>
              Login
            </Link>
          </Button>
          <Button variant="outlined" size="small">
            <Link to='/register'>
              Register
            </Link>
          </Button>
          <Button variant="outlined" size="small">
            Logout
          </Button>
          <Button variant="outlined" size="small">
            <Link to='/my-posts'>
              My Posts
            </Link>
          </Button>
          <Button variant="outlined" size="small">
            <Link to='/create'>
              Create Post
            </Link>
          </Button>
        </CardActions>
      </Toolbar>
    </React.Fragment>
  );
}