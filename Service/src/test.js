import pg from "pg";
const { Pool } = pg;
const connectDB = (uri) => {
    const decodedUri = new URL(uri);
    const client = new Pool({
        user: decodedUri.username,
        host: decodedUri.hostname,
        database: decodedUri.pathname.split("/")[1],
        password: decodedUri.password,
        port: 5432,
        ssl: { rejectUnauthorized: false }
    });
    client.connect()
    .then(() => console.log('Connected to PostgreSQL server.'))
    .catch(err => console.error('Connection error', err.stack));
    return client;
}

export default connectDB;