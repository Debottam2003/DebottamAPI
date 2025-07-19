import pkg from 'pg';
import dotenv from 'dotenv';
dotenv.config({ quiet: true });

const { Pool } = pkg;
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    max: 100
});

export default pool;