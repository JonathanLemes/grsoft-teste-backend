import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import Categories from '../models/Categories';
import categoriesView from '../views/categoriesView';
import * as Yup from 'yup';

export default {
    async create(request: Request, response: Response) {
        const {
            name,
            url
        } = request.body;
    
        const categoriesRepository = getRepository(Categories);

        const data = {
            name,
            url
        }

        const schema = Yup.object().shape({
            name: Yup.string().required(),
            url: Yup.string().required()
        });

        await schema.validate(data, {
            abortEarly: false
        });

        const category_data = categoriesRepository.create(data);
    
        await categoriesRepository.save(category_data);
    
        return response.status(201).json(category_data);
    },

    async show(request: Request, response: Response) {
        const { id } = request.params;
        const categoriesRepository = getRepository(Categories);

        const category = await categoriesRepository.findOneOrFail(id);

        return response.json(categoriesView.render(category));
    },

    async showAll(request: Request, response: Response) {
        const categoriesRepository = getRepository(Categories);

        const categories = await categoriesRepository.find();

        return response.json(categoriesView.renderMany(categories));
    },

    async deleteAll(request: Request, response: Response) {
        const categoriesRepository = getRepository(Categories);

        categoriesRepository.createQueryBuilder().delete().execute().then((res) => {
            response.status(401).json({
                check: true,
                res: res
            });
        }).catch((err) => {
            response.status(500).json({
                check: false,
                res: err
            });
        });
    }
}