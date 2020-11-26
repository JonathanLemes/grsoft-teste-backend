import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import Users from '../models/Users';
import usersView from '../views/usersView';
import * as Yup from 'yup';

export default {
    async create(request: Request, response: Response) {
        const {
            name,
            email,
            password
        } = request.body;
    
        const usersRepository = getRepository(Users);

        const data = {
            name,
            email,
            password
        }

        const schema = Yup.object().shape({
            name: Yup.string().required(),
            email: Yup.string().required(),
            password: Yup.string().required()
        });

        await schema.validate(data, {
            abortEarly: false
        });

        const user_data = usersRepository.create(data);
    
        await usersRepository.save(user_data);
    
        return response.status(201).json(user_data);
    },

    async show(request: Request, response: Response) {
        const { id } = request.params;
        const usersRepository = getRepository(Users);

        const user = await usersRepository.findOneOrFail(id);

        return response.json(usersView.render(user));
    },

    async showAll(request: Request, response: Response) {
        const usersRepository = getRepository(Users);

        const users = await usersRepository.find();

        return response.json(usersView.renderMany(users));
    }
}