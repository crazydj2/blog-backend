
import menuRouter from './menu.js';


const init = app => {
    app.use('/menu', menuRouter);
};


export const initRouter = init;