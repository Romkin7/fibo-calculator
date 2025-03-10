import { config } from 'dotenv';
config();

import app from './app';

app.set('port', process.env.PORT);

const PORT = app.get('port');
app.listen(PORT, () => {
    console.info(
        `${process.env.PROJECT_NAME} server is running on port ${PORT}...`,
    );
});
