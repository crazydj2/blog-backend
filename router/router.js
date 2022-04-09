
import menuRouter from './menu.js';


const init = app => {
    app.use('/menu', menuRouter);

    app.get('/', (req, res) => {
        console.log('access......');
        res.end('TestTestTestTest......');
    });

    app.get('/menus', (req, res) => {
        console.log('access menus......');
        res.end('Test menus......');
    });
};


export const initRouter = init;