
import menuRouter from './menu';


const init = app => {
    app.use('/menu', menuRouter);

    app.get('/', (req, res) => {
        console.log('access......');
        res.end('Test......');
    });

    app.get('/menus', (req, res) => {
        console.log('access menus......');
        res.end('Test menus......');
    });
};


export const initRouter = init;