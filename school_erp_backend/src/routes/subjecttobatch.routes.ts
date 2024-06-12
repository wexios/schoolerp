/**
 * @swagger
 * tags:
 *   name: SubjectToBatchRelationships
 *   description: API endpoints for managing relationships between subjects and batches
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     SubjectToBatchRelationship:
 *       type: object
 *       properties:
 *         subjectId:
 *           type: integer
 *         userId:
 *           type: integer
 *         batchId:
 *           type: string
 *         subjecttToBatchId:
 *           type: integer
 *         from:
 *           type: string
 *         to:
 *           type: string
 *         sem:
 *           type: string
 *         status:
 *           type: boolean
 *       required:
 *         - subjectId
 *         - userId
 *         - batchId
 *         - subjecttToBatchId
 *         - from
 *         - to
 *         - sem
 *         - status
 */

/**
 * @swagger
 * /subjecttobatch:
 *   post:
 *     summary: Create a new subject to batch relationship
 *     tags: [SubjectToBatchRelationships]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SubjectToBatchRelationship'
 *     responses:
 *       200:
 *         description: Successfully created subject to batch relationship
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SubjectToBatchRelationship'
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /subjecttobatch:
 *   get:
 *     summary: Get all subject to batch relationships
 *     tags: [SubjectToBatchRelationships]
 *     responses:
 *       200:
 *         description: Successfully retrieved subject to batch relationships
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/SubjectToBatchRelationship'
 *       404:
 *         description: No subject to batch relationships found
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /subjecttobatch/{subjectToBatchId}:
 *   get:
 *     summary: Get subject to batch relationship by ID
 *     tags: [SubjectToBatchRelationships]
 *     parameters:
 *       - name: subjectToBatchId
 *         in: path
 *         description: ID of the subject to batch relationship
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successfully retrieved subject to batch relationship
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SubjectToBatchRelationship'
 *       404:
 *         description: Subject to batch relationship not found
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /subjecttobatch/{subjectToBatchId}:
 *   put:
 *     summary: Update subject to batch relationship by ID
 *     tags: [SubjectToBatchRelationships]
 *     parameters:
 *       - name: subjectToBatchId
 *         in: path
 *         description: ID of the subject to batch relationship
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SubjectToBatchRelationship'
 *     responses:
 *       200:
 *         description: Successfully updated subject to batch relationship
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SubjectToBatchRelationship'
 *       404:
 *         description: Subject to batch relationship not found
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /subjecttobatch/{subjectToBatchId}:
 *   delete:
 *     summary: Delete subject to batch relationship by ID
 *     tags: [SubjectToBatchRelationships]
 *     parameters:
 *       - name: subjectToBatchId
 *         in: path
 *         description: ID of the subject to batch relationship
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Successfully deleted subject to batch relationship
 *       404:
 *         description: Subject to batch relationship not found
 *       500:
 *         description: Internal Server Error
 */

import express, { Request, Response, NextFunction } from 'express';
import {
  createSubjectToBatch,
  getAllSubjectToBatchRelationships,
  getSubjectToBatchRelationshipById,
  updateSubjectToBatchRelationship,
  deleteSubjectToBatchRelationship,
} from '../controllers/subjecttobatch.controller';

const subjectToBatchRouter = express.Router();

// Error handling middleware
const errorHandler = (error: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(`Error: ${error.message}`);
  res.status(500).json({ error: 'Internal Server Error' });
};

// Create
subjectToBatchRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    let created = await createSubjectToBatch(req.body);
    res.json(created);
  } catch (error:any) {
    errorHandler(error, req, res, next);
  }
});

// Read (Get all subject to batch relationships)
subjectToBatchRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    let subjectToBatchRelationships = await getAllSubjectToBatchRelationships();
    if (subjectToBatchRelationships.length > 0) {
      res.json(subjectToBatchRelationships);
    } else {
      res.status(404).json({ message: 'No subject to batch relationships found.' });
    }
  } catch (error:any) {
    errorHandler(error, req, res, next);
  }
});

// Read (Get subject to batch relationship by ID)
subjectToBatchRouter.get('/:subjectToBatchId', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const subjectToBatchRelationship = await getSubjectToBatchRelationshipById(Number(req.params.subjectToBatchId));
    if (subjectToBatchRelationship) {
      res.json(subjectToBatchRelationship);
    } else {
      res.status(404).json({ message: 'Subject to batch relationship not found.' });
    }
  } catch (error:any) {
    errorHandler(error, req, res, next);
  }
});

// Update
subjectToBatchRouter.put('/:subjectToBatchId', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { subjectToBatchId } = req.params;
    const updatedData = req.body;
    const updatedSubjectToBatch = await updateSubjectToBatchRelationship(Number(subjectToBatchId), updatedData);
    if (updatedSubjectToBatch) {
      res.json(updatedSubjectToBatch);
    } else {
      res.status(404).json({ message: 'Subject to batch relationship not found.' });
    }
  } catch (error:any) {
    errorHandler(error, req, res, next);
  }
});

// Delete
subjectToBatchRouter.delete('/:subjectToBatchId', async (req: Request, res: Response, next: NextFunction) => {
  try {
    await deleteSubjectToBatchRelationship(Number(req.params.subjectToBatchId));
    res.status(204).end();
  } catch (error:any) {
    errorHandler(error, req, res, next);
  }
});

export default subjectToBatchRouter;
