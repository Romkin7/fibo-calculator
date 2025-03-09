import { FC } from 'react';
import { Link } from 'react-router';
import { AppBar, Button, Toolbar, Typography } from '@mui/material';

const Navigation: FC = () => {
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Fibonacci Calculator
                </Typography>
                <Button color="inherit" component={Link} to="/">
                    Calculator
                </Button>
                <Button color="inherit" component={Link} to="/terms">
                    Terms
                </Button>
            </Toolbar>
        </AppBar>
    );
};

export default Navigation;
