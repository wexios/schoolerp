import { Router } from "express";
import AssignmentRouer from "../routes/assignments.routes";
import AttendenceRouter from "../routes/attentence.route";
import markRouter from "../routes/marks.route";
import notesRouter from "../routes/note.routes";
import rolesRouter from "../routes/roles.routes";
import subjectRouter from "../routes/subject.route";
import subjectToBatchRouter from "../routes/subjecttobatch.routes";
import submissionRouter from "../routes/submission.routes";
import UserRouter from "../routes/user.routes";
import usertobatchRouter from "../routes/usertobatch.routes";
import swaggerJsdoc, { Options } from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { port } from "./env.config";
import BatchRouter from "../routes/batch.route";

const APIRouter:Router = Router();
const swaggerOptions: Options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'School ERP',
        version: '1.0.0',
        description: 'A School ERP (Enterprise Resource Planning) system is a comprehensive software solution designed to streamline and enhance the management and administration of educational institutions, primarily focused on schools. It integrates various modules and functionalities to automate routine tasks, improve communication, and provide valuable insights for efficient decision-making. Here is a detailed description of School ERP:',
      },
      servers: [
        {
          url: `http://localhost:${port}`, // Update with your actual server URL
        },
      ],
    },
    apis: [
      './src/routes/assignments.routes.ts',
      './src/routes/attentence.route.ts',
      './src/routes/batch.route.ts', 
      './src/routes/marks.route.ts',
      './src/routes/note.routes.ts',
      './src/routes/roles.routes.ts',
      './src/routes/subject.route.ts',
      './src/routes/subjecttobatch.routes.ts',
      './src/routes/submission.routes.ts',
      './src/routes/user.routes.ts',
      './src/routes/usertobatch.routes.ts',
    ]

  };
  

  const specs = swaggerJsdoc(swaggerOptions);
  APIRouter.use('/swagger', swaggerUi.serve, swaggerUi.setup(specs));
APIRouter.use('/assignment',AssignmentRouer);
APIRouter.use('/attendance',AttendenceRouter);
APIRouter.use('/batches',BatchRouter);
APIRouter.use('/marks',markRouter);
APIRouter.use('/note',notesRouter);
APIRouter.use('/role',rolesRouter);
APIRouter.use('/subject',subjectRouter);
APIRouter.use('/subjectToBatch',subjectToBatchRouter);
APIRouter.use('/submission',submissionRouter);
APIRouter.use('/user',UserRouter);
APIRouter.use('/userToBatch',usertobatchRouter);
export default APIRouter;