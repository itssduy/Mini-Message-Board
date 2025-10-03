const { Client } = require('pg');
require('dotenv').config();

const SQL = `
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        username VARCHAR(255)
    );

    CREATE TABLE IF NOT EXISTS messages (
        id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        user_id INTEGER NOT NULL,
        text TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );


    INSERT INTO users (username)
    VALUES 
        ('Amando'),
        ('Charles');

    INSERT INTO messages (user_id, text)
    VALUES 
        (1, 'how are you today'),
        (2, 'im good');
`

async function main(){
    console.log("seeding...");

    const connectionString = `postgresql://${process.env.USER}:${process.env.PASSWORD}@${process.env.HOST}:${process.env.DBPORT}/${process.env.DB}`
    const client = new Client({
        connectionString: connectionString
    });
    await client.connect();
    await client.query(SQL);
    await client.end();

    console.log("done");

}

main();