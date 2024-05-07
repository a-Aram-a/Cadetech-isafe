import mongoose from 'mongoose';
import CONFIG from '../../config';

export function connectDB() {
    mongoose.connect(CONFIG.MONGODB_URI).then(() => {
        console.log('DB Connected');
    })

    mongoose.connection.on('error', (err) => {
        console.error('DB Connection Error: ', err);
    })
}