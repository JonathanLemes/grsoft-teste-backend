import { Router } from 'express';
import authController from './auth/authController';
import categoriesController from './controllers/categoriesController';
import productsController from './controllers/productsController';
import relationCategoriesProductsController from './controllers/relationCategoriesProductsController';
import usersController from './controllers/usersController';

const routes = Router();

routes.post('/users', usersController.create);
routes.post('/users/signin', authController.authenticate);
routes.post('/categories', categoriesController.create);
routes.post('/products', productsController.create);
routes.post('/categories/products', relationCategoriesProductsController.create);

routes.get('/categories', categoriesController.showAll);
routes.get('/products', productsController.showAll);
routes.get('/categories/products', relationCategoriesProductsController.showAll);

routes.get('/categories/:id', categoriesController.show);
routes.get('/categories/:id/products', relationCategoriesProductsController.showByCategoryId);
routes.get('/products/:id', productsController.show);

routes.delete('/categories', categoriesController.deleteAll);

export default routes;