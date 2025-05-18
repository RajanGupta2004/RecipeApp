import express from 'express';
import router from './routes.js';
import connectDb from './config/connectDB.js';

const app = express();

const port = process.env.PORT || 8000;

// app level middleware

app.use(express.json());
app.use('api/v1/', router);

// Datbase connection
const startServer = async () => {
  await connectDb();
  app.listen(port, () => {
    console.log(`server is running at http://localhost:${port}`);
  });
};

startServer();
