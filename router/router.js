
import menuRouter from './menu';


const init = app => {
    app.use('/menu', menuRouter);

    app.get('/', (req, res) => {
        console.log('access......');
        res.end('Test......');
    });
};


export const initRouter = init;