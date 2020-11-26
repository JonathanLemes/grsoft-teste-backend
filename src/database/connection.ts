import { createConnection } from 'typeorm';

createConnection({
    type: "mysql",
    host: process.env.CLEARDB_HOST || "",
    port: 3306,
    username: process.env.CLEARDB_USERNAME || "",
    password: process.env.CLEARDB_PASSWORD || "",
    database: process.env.CLEARDB_DATABASE || "",
}).catch((err) => {
    console.log(err);
});