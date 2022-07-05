
import menuRouter from './menu.js';
import articleRouter from './article.js';

export const initRouter = app => {
    app.use('/menu', menuRouter);
    app.use('/article', articleRouter);
};