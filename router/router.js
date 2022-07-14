
import menuRouter from './menu.js';
import articleRouter from './article.js';
import adminRouter from './admin.js';

export const initRouter = app => {
    app.use('/menu', menuRouter);
    app.use('/article', articleRouter);
    app.use('/admin', adminRouter);
};