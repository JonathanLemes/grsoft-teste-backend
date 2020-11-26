import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import Products from '../models/Products';
import productsView from '../views/productsView';
import * as Yup from 'yup';

export default {
    async create(request: Request, response: Response) {
        const {
            name,
            image_url,
            description
        } = request.body;
    
        const productsRepository = getRepository(Products);

        const data = {
            name,
            image_url,
            description
        }

        const schema = Yup.object().shape({
            name: Yup.string().required(),
            image_url: Yup.string().required(),
            description: Yup.string().required()
        });

        await schema.validate(data, {
            abortEarly: false
        });

        const product_data = productsRepository.create(data);
    
        await productsRepository.save(product_data);
    
        return response.status(201).json(product_data);
    },

    async show(request: Request, response: Response) {
        const { id } = request.params;
        const productsRepository = getRepository(Products);

        const product = await productsRepository.findOneOrFail(id);

        return response.json(productsView.render(product));
    },

    async showAll(request: Request, response: Response) {
        const productsRepository = getRepository(Products);

        const products = await productsRepository.find();

        return response.json(productsView.renderMany(products));
    }
}