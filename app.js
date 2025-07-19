import express from 'express';
import cors from 'cors';
import data from './data.js';
import pool from "./db.js";
import dotenv from 'dotenv';
dotenv.config({ quiet: true });

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const PORT = process.env.PORT || 3333;

// This is a public API endpoint that returns capital name for a given country and use get method
// Example: http://localhost:3333/debottamapi/INDIA and the response will be "New Delhi" a string

app.get('/debottamapi/:country', async (req, res) => {
    try {
        console.log('Received request for country:', req.params.country);
        let { rows } = await pool.query('SELECT capital FROM country WHERE country = $1', [req.params.country.toUpperCase()]);
        res.status(200).send(rows[0] ? rows[0].capital : 'Country not found');
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send('Internal Server Error');
    }
});

async function start() {
    try {
        let connection = await pool.connect();
        console.log('Connected to the database successfully');
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
        connection.release();
    } catch (error) {
        console.error('Error connecting to the database:', error);
        process.exit(1);
    }
}
start();