
import menu from './menu';


const init = app => {
    app.use('/menu', menu);

    app.get('/', (req, res) => {
        console.log('access......');
        res.end('Test......');
    });
};


export const initRouter = init;