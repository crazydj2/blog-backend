
import menuRouter from './menu.js';

export const initRouter = app => {
    app.use('/menu', menuRouter);
};