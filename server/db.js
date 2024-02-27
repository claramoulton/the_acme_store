const pg = require('pg');

const client = new pg.Client(process.env.DATABASE_URL || "postgres://localhost/the_acme_store_db");

const createTables = async()=> {
    const SQL = `
    CROP TABLE IF EXISTS users;
    CROP TABLE IF EXISTS products;
    CROP TABLE IF EXISTS favorites;
    CREATE TABLE users(
        id UUID PRIMARY KEY,
        username VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(255)
    );
    CREATE TABLE products (
        id UUID PRIMARY KEY,
        name VARCHAR(100) UNIQUE NOT NULL
    );
    CREATE TABLE favorties(
        id UUID PRIMARY KEY,
        product_id UUID REFERENCES products(id) NOT NULL,
        user_id UUID REFERENCES users(id) NOT NULL,
        CONSTRAINT unique_product_user UNIQU(product_id, user_id)
    );
    `;
    await client.query(SQL);
};

module.exports = {
    client, 
    createTables
};