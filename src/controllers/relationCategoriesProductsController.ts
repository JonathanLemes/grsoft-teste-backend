import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import RELATION_Categories_Products from '../models/RELATION_Categories_Products';
import Categories from '../models/Categories';
import Products from '../models/Products';
import relationCategoriesProductsView from '../views/relationCategoriesProductsView';
import * as Yup from 'yup';

interface relationView extends RELATION_Categories_Products {
    category: Categories,
    product: Products
}

export default {
    async create(request: Request, response: Response) {
        const {
            categories_id,
            products_id
        } = request.body;
    
        const relationsRepository = getRepository(RELATION_Categories_Products);

        const data = {
            categories_id: parseInt(categories_id),
            products_id: parseInt(products_id)
        }

        const schema = Yup.object().shape({
            categories_id: Yup.number().required(),
            products_id: Yup.number().required()
        });

        await schema.validate(data, {
            abortEarly: false
        });

        const relation_data = relationsRepository.create(data);
    
        await relationsRepository.save(relation_data);
    
        return response.status(201).json(relation_data);
    },

    async show(request: Request, response: Response) {
        const { id } = request.params;

        const relationsRepository = getRepository(RELATION_Categories_Products);
        const categoriesRepository = getRepository(Categories);
        const productsRepository = getRepository(Products);

        const relation = await relationsRepository.findOneOrFail(id);
        const categories = await categoriesRepository.find();
        const products = await productsRepository.find();

        categories.forEach((category) => {
            if (category.id === relation.categories_id) {
                products.forEach((product) => {
                    if (product.id === relation.products_id) {
                        return response.json(relationCategoriesProductsView.render({
                            ...relation,
                            category,
                            product
                        }));
                    }
                })
            }
        });
    },

    async showAll(request: Request, response: Response) {
        const relationsRepository = getRepository(RELATION_Categories_Products);
        const categoriesRepository = getRepository(Categories);
        const productsRepository = getRepository(Products);

        const relations = await relationsRepository.find();
        const categories = await categoriesRepository.find();
        const products = await productsRepository.find();

        const relationsView: relationView[] = [];

        relations.forEach((relation) => {
            categories.forEach((category) => {
                if (category.id === relation.categories_id) {
                    products.forEach((product) => {
                        if (product.id === relation.products_id) {
                            relationsView.push(relationCategoriesProductsView.render({
                                ...relation,
                                category,
                                product
                            }));
                        }
                    })
                }
            });
        });

        return response.json(relationsView);
    }
}