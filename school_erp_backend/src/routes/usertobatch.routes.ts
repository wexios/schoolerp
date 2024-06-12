/**
 * @swagger
 * tags:
 *   name: UserToBatchRelationships
 *   description: API endpoints for managing user to batch relationships
 */

/**
 * @swagger
 * /usertobatch:
 *   post:
 *     summary: Create a new user to batch relationship
 *     tags: [UserToBatchRelationships]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserToBatchRelationshipRequestBody'
 *     responses:
 *       200:
 *         description: Successfully created user to batch relationship
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserToBatchRelationshipResponseBody'
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /usertobatch:
 *   get:
 *     summary: Get all user to batch relationships
 *     tags: [UserToBatchRelationships]
 *     responses:
 *       200:
 *         description: Successfully retrieved user to batch relationships
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/UserToBatchRelationshipResponseBody'
 *       404:
 *         description: No user to batch relationships found
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /usertobatch/{usertobatchId}:
 *   get:
 *     summary: Get user to batch relationship by ID
 *     tags: [UserToBatchRelationships]
 *     parameters:
 *       - name: usertobatchId
 *         in: path
 *         description: ID of the user to batch relationship
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successfully retrieved user to batch relationship
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserToBatchRelationshipResponseBody'
 *       404:
 *         description: User to batch relationship not found
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /usertobatch/{usertobatchId}:
 *   put:
 *     summary: Update user to batch relationship by ID
 *     tags: [UserToBatchRelationships]
 *     parameters:
 *       - name: usertobatchId
 *         in: path
 *         description: ID of the user to batch relationship
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserToBatchRelationshipRequestBody'
 *     responses:
 *       200:
 *         description: Successfully updated user to batch relationship
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserToBatchRelationshipResponseBody'
 *       404:
 *         description: User to batch relationship not found
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /usertobatch/{usertobatchId}:
 *   delete:
 *     summary: Delete user to batch relationship by ID
 *     tags: [UserToBatchRelationships]
 *     parameters:
 *       - name: usertobatchId
 *         in: path
 *         description: ID of the user to batch relationship
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: User to batch relationship deleted successfully
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     UserToBatchRelationshipRequestBody:
 *       type: object
 *       properties:
 *         userId:
 *           type: integer
 *         batchId:
 *           type: integer
 *         from:
 *           type: string
 *         to:
 *           type: string
 *         sem:
 *           type: string
 *         roll:
 *           type: string
 *         status:
 *           type: boolean
 *       required:
 *         - userId
 *         - batchId
 *         - from
 *         - to
 *         - sem
 *         - roll
 *         - status
 *
 *     UserToBatchRelationshipResponseBody:
 *       type: object
 *       properties:
 *         usertobatchId:
 *           type: integer
 *           format: int64
 *         userId:
 *           type: integer
 *           format: int64
 *         batchId:
 *           type: integer
 *           format: int64
 *         from:
 *           type: string
 *         to:
 *           type: string
 *         sem:
 *           type: string
 *         roll:
 *           type: string
 *         status:
 *           type: boolean
 */

import express, { Request, Response, NextFunction } from 'express';
import {
  createUsertobatch,
  getAllUsertobatchRelationships,
  getUsertobatchRelationshipById,
  updateUsertobatchRelationship,
  deleteUsertobatchRelationship,
} from '../controllers/usertobatch.controler';

const usertobatchRouter = express.Router();

// Error handling middleware
const errorHandler = (error: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(`Error: ${error.message}`);
  res.status(500).json({ error: 'Internal Server Error' });
};

// Create
usertobatchRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    let createdUsertobatch = await createUsertobatch(req.body);
    res.json(createdUsertobatch);
  } catch (error:any) {
    errorHandler(error, req, res, next);
  }
});

// Read (Get all user to batch relationships)
usertobatchRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    let usertobatchRelationships = await getAllUsertobatchRelationships();
    if (usertobatchRelationships.length > 0) {
      res.json(usertobatchRelationships);
    } else {
      res.status(404).json({ message: 'No user to batch relationships found' });
    }
  } catch (error:any) {
    errorHandler(error, req, res, next);
  }
});

// Read (Get user to batch relationship by ID)
usertobatchRouter.get('/:usertobatchId', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const usertobatchRelationship = await getUsertobatchRelationshipById(Number(req.params.usertobatchId));
    if (usertobatchRelationship) {
      res.json(usertobatchRelationship);
    } else {
      res.status(404).json({ message: 'User to batch relationship not found' });
    }
  } catch (error:any) {
    errorHandler(error, req, res, next);
  }
});

// Update
usertobatchRouter.put('/:usertobatchId', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { usertobatchId } = req.params;
    const updatedData = req.body;
    const updatedUsertobatch = await updateUsertobatchRelationship(Number(usertobatchId), updatedData);
    if (updatedUsertobatch) {
      res.json(updatedUsertobatch);
    } else {
      res.status(404).json({ message: 'User to batch relationship not found' });
    }
  } catch (error:any) {
    errorHandler(error, req, res, next);
  }
});

// Delete
usertobatchRouter.delete('/:usertobatchId', async (req: Request, res: Response, next: NextFunction) => {
  try {
    await deleteUsertobatchRelationship(Number(req.params.usertobatchId));
    res.json({ message: 'User to batch relationship deleted successfully' });
  } catch (error:any) {
    errorHandler(error, req, res, next);
  }
});

export default usertobatchRouter;
