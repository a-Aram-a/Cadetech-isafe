import dotenv from 'dotenv';

dotenv.config();

const CONFIG = {
    PORT: process.env.PORT ?? 8080,
    MONGODB_URI: process.env.MONGODB_URI ?? 'mongodb://localhost:27017/isafe_db',
    JWT_SECRET: process.env.JWT_SECRET ?? 'secret',
    ADMIN_EMAIL: process.env.ADMIN_EMAIL ?? '',
    ADMIN_PASSWORD: process.env.ADMIN_PASSWORD ?? '',
    CHIRPSTACK_SERVER_GRPC_URL: process.env.CHIRPSTACK_SERVER_URL ?? 'grpc://localhost:8080',
    CHIRPSTACK_API_KEY: process.env.CHIRPSTACK_API_KEY ?? '',
}

export default CONFIG