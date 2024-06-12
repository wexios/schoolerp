/**
 * @swagger
 * tags:
 *   name: Batches
 *   description: API endpoints for managing batches
 */

/**
 * @swagger
 * /api/batches:
 *   post:
 *     summary: Create a new batch
 *     tags: [Batches]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BatchRequestBody'
 *     responses:
 *       201:
 *         description: Successfully created batch
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BatchResponse'
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /api/batches:
 *   get:
 *     summary: Get all batches
 *     tags: [Batches]
 *     responses:
 *       200:
 *         description: Successfully retrieved batches
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/BatchResponse'
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /api/batches/{batchIId}:
 *   get:
 *     summary: Get batch by ID
 *     tags: [Batches]
 *     parameters:
 *       - name: batchIId
 *         in: path
 *         description: ID of the batch
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successfully retrieved batch
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BatchResponse'
 *       404:
 *         description: Batch not found
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /api/batches/{batchIId}:
 *   put:
 *     summary: Update batch by ID
 *     tags: [Batches]
 *     parameters:
 *       - name: batchIId
 *         in: path
 *         description: ID of the batch
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BatchRequestBody'
 *     responses:
 *       200:
 *         description: Successfully updated batch
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BatchResponse'
 *       404:
 *         description: Batch not found
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /api/batches/{batchIId}:
 *   delete:
 *     summary: Delete batch by ID
 *     tags: [Batches]
 *     parameters:
 *       - name: batchIId
 *         in: path
 *         description: ID of the batch
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Successfully deleted batch
 *       404:
 *         description: Batch not found
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     BatchRequestBody:
 *       type: object
 *       properties:
 *         batchName:
 *           type: string
 *         batchStart:
 *           type: string
 *           format: date
 *         batchEnd:
 *           type: string
 *           format: date
 *         isActive:
 *           type: boolean
 *       required:
 *         - batchName
 *         - batchStart
 *         - batchEnd
 *         - isActive
 *
 *     BatchResponse:
 *       type: object
 *       properties:
 *         batchIId:
 *           type: integer
 *           format: int64
 *         batchName:
 *           type: string
 *         batchStart:
 *           type: string
 *           format: date
 *         batchEnd:
 *           type: string
 *           format: date
 *         isActive:
 *           type: boolean
 */

import express, { Request, Response } from 'express';
import {
  createBatch,
  getAllBatches,
  getBatchById,
  updateBatch,
  deleteBatch,
} from '../controllers/batch.controllers';
const BatchRouter = express.Router();

// Create batch
BatchRouter.post('/', async (req: Request, res: Response) => {
  try {
    const newBatch = await createBatch(req.body);
    res.status(201).json(newBatch);
  } catch (error:any) {
    res.status(500).json({ error: error.message });
  }
});

// Get all batches
BatchRouter.get('/', async (req: Request, res: Response) => {
  try {
    const batches = await getAllBatches();
    res.status(200).json(batches);
  } catch (error:any) {
    res.status(500).json({ error: error.message });
  }
});

// Get batch by ID
BatchRouter.get('/:batchIId', async (req: Request, res: Response) => {
  try {
    const batchIId = parseInt(req.params.batchIId, 10);
    const batch = await getBatchById(batchIId);

    if (batch) {
      res.status(200).json(batch);
    } else {
      res.status(404).json({ error: 'Batch not found' });
    }
  } catch (error:any) {
    res.status(500).json({ error: error.message });
  }
});

// Update batch
BatchRouter.put('/:batchIId', async (req: Request, res: Response) => {
  try {
    const batchIId = parseInt(req.params.batchIId, 10);
    const updatedBatch = await updateBatch(batchIId, req.body);

    if (updatedBatch) {
      res.status(200).json(updatedBatch);
    } else {
      res.status(404).json({ error: 'Batch not found' });
    }
  } catch (error:any) {
    res.status(500).json({ error: error.message });
  }
});

// Delete batch
BatchRouter.delete('/:batchIId', async (req: Request, res: Response) => {
  try {
    const batchIId = parseInt(req.params.batchIId, 10);
    await deleteBatch(batchIId);
    res.status(204).end();
  } catch (error:any) {
    res.status(500).json({ error: error.message });
  }
});

export default BatchRouter;
