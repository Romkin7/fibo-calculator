import { FC, FormEvent, useEffect, useState } from 'react';
import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import {
    Button,
    Card,
    FormControl,
    FormLabel,
    TextField,
    Typography,
} from '@mui/material';
import SignInContainer from '../components/SignInContainer';
import Item from '../components/Item';
import axios from 'axios';

const FiboCalculatorPage: FC = () => {
    const [isIndexError, setIsIndexError] = useState<boolean>(() => false);
    const [indexErrorMessage, setIndexErrorMessage] = useState<string>(
        () => '',
    );
    const [calculatedValues, setCalculatedValues] = useState<Record<
        string,
        number
    > | null>(() => null);
    const [seenIndexes, setSeenIndexes] = useState<Record<string, number>[]>(
        () => [],
    );
    const fetchValues = async () => {
        const { data } = await axios.get('/api/values');
        const calculatedValues = data;
        console.log('Calculated values: ', calculatedValues);
        setCalculatedValues(calculatedValues);
    };
    const fetchIndexes = async () => {
        const { data } = await axios.get('/api/indexes');
        const seenIndexes = data;
        setSeenIndexes(seenIndexes);
    };
    useEffect(() => {
        fetchValues();
        fetchIndexes();

        const interval = setInterval(() => {
            fetchValues();
            fetchIndexes();
        }, 5000); // Poll every 5 seconds

        return () => clearInterval(interval); // Clear interval on component unmount
    }, []);
    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.target as HTMLFormElement);
        const index = formData.get('index') as string;
        axios
            .post('/api/values', { index })
            .then((response: unknown) => {
                console.log(response);
                event.currentTarget.reset();
                console.log('Index:', index);
            })
            .catch((error: unknown) => {
                console.log(error);
                setIsIndexError(true);
                setIndexErrorMessage('Invalid index');
            });
    };
    const renderValues = () => {
        const values = [];
        for (const key in calculatedValues) {
            values.push(
                <li key={key}>
                    For index {key}, I calculated {calculatedValues[key]}
                </li>,
            );
        }
        console.log(values);
        return values;
    };
    return (
        <Box sx={{ width: '100%' }}>
            <Grid
                container
                rowSpacing={1}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                justifyContent={'center'}
            >
                <Grid size={4} marginTop={2}>
                    <Item>
                        <SignInContainer
                            style={{
                                minHeight: '25vh',
                            }}
                            direction="column"
                            justifyContent="space-between"
                        >
                            <Card variant="outlined">
                                <Typography
                                    component="h1"
                                    variant="h4"
                                    sx={{
                                        width: '100%',
                                        fontSize: 'clamp(2rem, 10vw, 2.15rem)',
                                    }}
                                >
                                    Submit your index
                                </Typography>
                                <Box
                                    component="form"
                                    onSubmit={handleSubmit}
                                    noValidate
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        width: '100%',
                                        gap: 2,
                                    }}
                                >
                                    <FormControl>
                                        <FormLabel htmlFor="index">
                                            Index
                                        </FormLabel>
                                        <TextField
                                            error={isIndexError}
                                            helperText={indexErrorMessage}
                                            id="index"
                                            type="number"
                                            name="index"
                                            placeholder="1"
                                            autoComplete="number"
                                            autoFocus
                                            required
                                            fullWidth
                                            variant="outlined"
                                            color={
                                                isIndexError
                                                    ? 'error'
                                                    : 'primary'
                                            }
                                        />
                                    </FormControl>
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                    >
                                        Submit
                                    </Button>
                                </Box>
                            </Card>
                        </SignInContainer>
                    </Item>
                </Grid>
                <Grid size={8} marginTop={2}>
                    <Item style={{ minHeight: '20vh', marginBottom: '1rem' }}>
                        <Typography
                            component="h2"
                            variant="h5"
                            sx={{
                                width: '100%',
                                fontSize: 'clamp(2rem, 10vw, 2.15rem)',
                            }}
                        >
                            Indexes, that I have seen
                        </Typography>
                        <ul>
                            {seenIndexes?.length &&
                                seenIndexes.map(
                                    (index: Record<string, number>) => {
                                        return (
                                            <li key={index.number}>
                                                {index.number}
                                            </li>
                                        );
                                    },
                                )}
                        </ul>
                    </Item>
                    <Item>
                        <Typography
                            component="h2"
                            variant="h5"
                            sx={{
                                width: '100%',
                                fontSize: 'clamp(2rem, 10vw, 2.15rem)',
                            }}
                        >
                            Calculated values
                        </Typography>
                        <ul>{renderValues()}</ul>
                    </Item>
                </Grid>
            </Grid>
        </Box>
    );
};

export default FiboCalculatorPage;
