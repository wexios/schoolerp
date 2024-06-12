/**
 * @swagger
 * tags:
 *   name: Subjects
 *   description: API endpoints for managing subjects
 */

/**
 * @swagger
 * /api/subject:
 *   post:
 *     summary: Create a new subject
 *     tags: [Subjects]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Subject'
 *     responses:
 *       200:
 *         description: Successfully created subject
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Subject'
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /api/subject:
 *   get:
 *     summary: Get all subjects
 *     tags: [Subjects]
 *     responses:
 *       200:
 *         description: Successfully retrieved subjects
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Subject'
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /api/subject/{subjectId}:
 *   get:
 *     summary: Get subject by ID
 *     tags: [Subjects]
 *     parameters:
 *       - name: subjectId
 *         in: path
 *         description: ID of the subject
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successfully retrieved subject
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Subject'
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /api/subject/{subjectId}:
 *   put:
 *     summary: Update subject by ID
 *     tags: [Subjects]
 *     parameters:
 *       - name: subjectId
 *         in: path
 *         description: ID of the subject
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Subject'
 *     responses:
 *       200:
 *         description: Successfully updated subject
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Subject'
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /api/subject/{subjectId}:
 *   delete:
 *     summary: Delete subject by ID
 *     tags: [Subjects]
 *     parameters:
 *       - name: subjectId
 *         in: path
 *         description: ID of the subject
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Subject deleted successfully
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Subject:
 *       type: object
 *       properties:
 *         subjectId:
 *           type: integer
 *         subjectName:
 *           type: string
 *         isActive:
 *           type: boolean
 *       required:
 *         - subjectName
 *         - isActive
 */

import express, { Request, Response, NextFunction } from 'express';
import {
  createSubject,
  getAllSubjects,
  getSubjectById,
  updateSubject,
  deleteSubject,
} from '../controllers/subject.controller';

const subjectRouter = express.Router();

// Error handling middleware
const errorHandler = (error: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(`Error: ${error.message}`);
  res.status(500).json({ error: 'Internal Server Error' });
};

// Create
subjectRouter.post('/', async (req: Request, res: Response,next:NextFunction) => {
  try {
   let created =  await createSubject(req.body);
   res.json(created);
  } catch (error:any) {
    errorHandler(error, req, res, next);
  }
});

// Read (Get all subjects)
subjectRouter.get('/', async (req: Request, res: Response,next:NextFunction) => {
  try {
    let subjects = await getAllSubjects();
    res.json(subjects);
  } catch (error:any) {
    errorHandler(error, req, res, next);
  }
});

// Read (Get subject by ID)
subjectRouter.get('/:subjectIId', async (req: Request, res: Response, next: NextFunction) => {
    try {
      const subject = await getSubjectById(Number(req.params.subjectIId));
      res.json(subject); // Send the subject data in the response
    } catch (error:any) {
      errorHandler(error, req, res, next);
    }
  });


// Update
subjectRouter.put('/subjects/:subjectIId', async (req: Request, res: Response,next:NextFunction) => {
  try {
    const { subjectIId } = req.params;
    const updatedData = req.body; // Assuming you are sending the updated data in the request body
    const updatedSubject = await updateSubject(Number(subjectIId), updatedData);
    res.json(updatedSubject);
  } catch (error:any) {
    errorHandler(error, req, res, next);
  }
});

// Delete
subjectRouter.delete('/:subjectIId', async (req: Request, res: Response,next:NextFunction) => {
  try {
    await deleteSubject(Number(req.params.subjectIId));
  } catch (error:any) {
    errorHandler(error, req, res, next);
  }
});

export default subjectRouter;
