import 'reflect-metadata';
import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import router from "./routes";
import AppError from "@shared/errors/AppError";
import '@shared/typeorm';

const app = express();

app.use(cors());
app.use(express.json());


app.use(router);

app.use((error: Error, request: Request, respose: Response, next: NextFunction) => {

  if (error instanceof AppError) {
    return respose.status(error.statusCode).json({
      status: 'error',
      message: error.message,
    })
  }

  return respose.status(500).json({
    status: 'error',
    message: 'Internal server error'
  })
});

app.listen(3333, () => {
  console.log("run port 3333");

})





