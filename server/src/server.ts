import { config } from 'dotenv';
config();

import app from './app';

app.set('port', process.env.PORT || 8080);
app.set('ip', process.env.IP || '127.0.0.1');

const PORT = app.get('port');
const IP = app.get('ip');
app.listen(PORT, IP, () => {
    console.info(
        `${process.env.PROJECT_NAME} server is running on port ${PORT} and ip ${IP}...`,
    );
});
