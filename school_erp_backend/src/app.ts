import Assignment from "./models/assignment.model";
import Attentence from "./models/attentence.model";
import Batch from "./models/batch.model";
import Mark from "./models/mark.model";
import Notes from "./models/notes.model";
import Roles from "./models/roles.model";
import Submission from "./models/subbmission.model";
import Subject from "./models/subject.model";
import SubjectToBatch from "./models/subjecttobatch.model";
import User from "./models/user.model";
import Usertobatch from "./models/usertobatch.model";
import APIRouter from "./utils/api";
import {  baseEmail, port } from "./utils/env.config";
import logger from "./utils/logger";
import express,{ Application} from "express";
import cors from 'cors';
const app:Application = express();
app.use(cors());
app.use(express.json({ limit: '100mb' }));
(async()=>{
    Subject.sync({force: false});
    Batch.sync({force: false});
    Notes.sync({force: false});
    Assignment.sync({force: false});
    Mark.sync({force: false});
    Submission.sync({force: false});
    Attentence.sync({force: false});
    User.sync({force: false});
    Roles.sync({force: false});
    Usertobatch.sync({force: false});
    SubjectToBatch.sync({force: false});
})();
app.use('/api',APIRouter);
app.listen(port,()=>{
    logger.info(`Server is running on ${port}`);
});