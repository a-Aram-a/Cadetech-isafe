import dotenv from 'dotenv';

dotenv.config();

const CONFIG = {
    PORT: process.env.PORT ?? 8080,
    MONGODB_URI: process.env.MONGODB_URI ?? 'mongodb://localhost:27017/isafe_db',
    JWT_SECRET: process.env.JWT_SECRET ?? 'secret',
}

export default CONFIG