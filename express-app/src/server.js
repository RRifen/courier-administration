const express = require('express')
const mysql = require('mysql2')
const app = express()
const port = 3030
const cors = require('cors')

const corsOptions = {
    origin: 'http://localhost:3000'
};

app.use(cors(corsOptions));

const dbConfig = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'delivery_administration',
    timezone: 'Z'
}

app.use(express.json());

app.post('/mysql', async (req, res) => {
    const connection = await mysql.createConnection(dbConfig);
    try {
        const {query} = req.body;
        const [rows] = await connection.promise().query(query);
        res.json({result: rows});
        console.log(Date.now() + `: ${query} has invoked `);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: error.sqlMessage });
    }
    finally {
        endConnection(connection);
    }
})

function endConnection(connection) {
    try {
        connection.end();
    } catch(error) {
        console.error(error);
    }
}

app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})