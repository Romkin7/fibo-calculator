import { Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { FC } from 'react';

const TermsPage: FC = () => {
    return (
        <section>
            <Grid>
                <Typography
                    component="h1"
                    variant="h4"
                    sx={{
                        width: '100%',
                        fontSize: 'clamp(2rem, 10vw, 2.15rem)',
                    }}
                >
                    Terms of use
                </Typography>
                <Typography
                    component="p"
                    variant="body1"
                    sx={{
                        width: '100%',
                        fontSize: 'clamp(1rem, 5vw, 1.15rem)',
                    }}
                >
                    Fibonacchi calculator is a simple app that calculates the
                    Fibonacci value of a given index. The app is for educational
                    purposes only and should not be used in production. The app
                    is built with React, Express, PostgreSQL, and Redis. The app
                    uses a worker service to calculate the Fibonacci value of an
                    index. The worker service is built with Node.js and Redis.
                    The worker service listens to an insert event and calculates
                    the Fibonacci value of the index. The worker service then
                    stores the value in Redis and PostgreSQL. The app uses a
                    PostgreSQL database to store the indexes and the
                    corresponding Fibonacci values. The app uses a Redis
                    database to store the Fibonacci values.
                </Typography>
            </Grid>
        </section>
    );
};

export default TermsPage;
