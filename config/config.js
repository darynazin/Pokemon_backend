import { config } from "dotenv";
config();

const storageBucket = process.env.FIREBASE_SERVICE_BUCKET_NAME;

export { storageBucket };
