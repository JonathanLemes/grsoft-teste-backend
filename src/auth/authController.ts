import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { getRepository } from 'typeorm';
import Users from '../models/Users';

export default {
    authenticate: async (request: Request, response: Response) => {
        const {
            email,
            password
        } = request.body;

        const usersRepository = getRepository(Users);
        const users = await usersRepository.find();

        let userFound = false;

        let userData = {};
        users.map((user) => {
            if (email === user.email && password === user.password) {
                userFound = true;
                userData = {
                    name: user.name,
                    email: user.email
                };
            }
        });
        
        if (userFound) {
            return response.json({
                userData,
                token: jwt.sign(request.params, 'PRIVATEKEY'),
            });
        } else {
            return response.status(401).json({});
        }
    }
}