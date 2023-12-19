import cors from 'cors';
import express from 'express';
import globalErrorHandler from './src/app/middlewares/globalErrorHandler.mjs';
import router from './src/app/routes/index.mjs';

const app = express();

const corsOptions = {
  origin: '*', 
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/v1', router);

// Handle global errors
app.use(globalErrorHandler);

// Handle not found
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: 'Not Found',
    errorMessages: [
      {
        path: req.originalUrl,
        message: 'API Not Found',
      },
    ],
  });
  next();
});

app.get("/",(req,res)=>{
  res.send("testing ")
})

export default app;
