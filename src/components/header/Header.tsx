import * as React from 'react';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';

export const Header = () => {

  return (
    <React.Fragment>
      <Toolbar sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Button size="small">Subscribe</Button>
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
            Login
          </Button>
          <Button variant="outlined" size="small">
            Register
          </Button>
          <Button variant="outlined" size="small">
            Logout
          </Button>
          <Button variant="outlined" size="small">
            My Posts
          </Button>
          <Button variant="outlined" size="small">
            Create Post
          </Button>
        </CardActions>
      </Toolbar>
    </React.Fragment>
  );
}