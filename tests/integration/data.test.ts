import request from 'supertest';
import { createConnection } from 'typeorm';
import app from '../../src/server';

async function connect() {
    return await createConnection({
        type: 'sqlite',
        database: '__tests__/unit/database.sqlite',
        migrations: [
            'src/migrations/*.ts'
        ],
        entities: [
            './src/models/*.ts'
        ],
        cli: {
            migrationsDir: 'src/migrations'
        }
    }).catch((err) => {
        console.log(err);
    });
}

describe('database', () => {
    it('should create a new category', async () => {
        await connect();

        const data = {
            name: 'Category Test',
            url: `/category-test`
        }

        const server = request(app);

        const response = await server.post('/categories').send(data);

        expect(response.status).toBe(201);
    });

    it('should log the new category created', async () => {
        await connect();

        const server = request(app);

        const response = await server.get('/categories');

        console.warn(response.body);

        expect(response.status).toBe(200);
    });

    it('should delete all data created', async () => {
        await connect();

        const server = request(app);

        const response = await server.delete('/categories');

        expect(response.status).toBe(401);
    });

});