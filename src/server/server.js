import express from 'express';
const app = express();

import router from './router';
app.use('/assets', express.static('build'));
app.get('*', router);

app.listen(3000, () => {
    console.log('ready to serve pages');
});
