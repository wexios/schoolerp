/**
 * @swagger
 * tags:
 *   name: Marks
 *   description: API endpoints for managing marks
 */

/**
 * @swagger
 * /mark:
 *   post:
 *     summary: Create a new mark
 *     tags: [Marks]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MarkRequestBody'
 *     responses:
 *       200:
 *         description: Successfully created mark
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MarkResponse'
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /mark:
 *   get:
 *     summary: Get all marks
 *     tags: [Marks]
 *     responses:
 *       200:
 *         description: Successfully retrieved marks
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/MarkResponse'
 *       404:
 *         description: No marks found
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /mark/{userId}:
 *   get:
 *     summary: Get mark by user ID
 *     tags: [Marks]
 *     parameters:
 *       - name: userId
 *         in: path
 *         description: ID of the user
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successfully retrieved mark
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MarkResponse'
 *       404:
 *         description: Mark not found
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /mark/{userId}:
 *   put:
 *     summary: Update mark by user ID
 *     tags: [Marks]
 *     parameters:
 *       - name: userId
 *         in: path
 *         description: ID of the user
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MarkRequestBody'
 *     responses:
 *       200:
 *         description: Successfully updated mark
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MarkResponse'
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /mark/{userId}:
 *   delete:
 *     summary: Delete mark by user ID
 *     tags: [Marks]
 *     parameters:
 *       - name: userId
 *         in: path
 *         description: ID of the user
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Mark deleted successfully
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     MarkRequestBody:
 *       type: object
 *       properties:
 *         studentId:
 *           type: integer
 *         subjectId:
 *           type: integer
 *         mark:
 *           type: integer
 *         isActive:
 *           type: boolean
 *       required:
 *         - studentId
 *         - subjectId
 *         - mark
 *         - isActive
 *
 *     MarkResponse:
 *       type: object
 *       properties:
 *         userId:
 *           type: integer
 *           format: int64
 *         studentId:
 *           type: integer
 *         subjectId:
 *           type: integer
 *         mark:
 *           type: integer
 *         isActive:
 *           type: boolean
 */

import express, { Request, Response, NextFunction } from 'express';
import {
  createMark,
  getAllMarks,
  getMarkByUserId,
  updateMark,
  deleteMark,
} from '../controllers/mark.controller';

const markRouter = express.Router();

// Error handling middleware
const errorHandler = (error: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(`Error: ${error.message}`);
  res.status(500).json({ error: 'Internal Server Error' });
};

// Create
markRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const created = await createMark(req.body);
    res.json(created);
  } catch (error:any) {
    errorHandler(error, req, res, next);
  }
});

// Read (Get all marks)
markRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const marks = await getAllMarks();
    if (marks && marks.length > 0) {
      res.json(marks);
    } else {
      res.status(404).json({ message: 'No marks found' });
    }
  } catch (error:any) {
    errorHandler(error, req, res, next);
  }
});

// Read (Get mark by user ID)
markRouter.get('/:userId', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const mark = await getMarkByUserId(Number(req.params.userId));
    if (mark) {
      res.json(mark);
    } else {
      res.status(404).json({ message: 'Mark not found' });
    }
  } catch (error:any) {
    errorHandler(error, req, res, next);
  }
});

// Update
markRouter.put('/:userId', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = req.params;
    const updatedData = req.body;
    const updatedMark = await updateMark(Number(userId), updatedData);
    res.json(updatedMark);
  } catch (error:any) {
    errorHandler(error, req, res, next);
  }
});

// Delete
markRouter.delete('/:userId', async (req: Request, res: Response, next: NextFunction) => {
  try {
    await deleteMark(Number(req.params.userId));
    res.json({ message: 'Mark deleted successfully' });
  } catch (error:any) {
    errorHandler(error, req, res, next);
  }
});

export default markRouter;
