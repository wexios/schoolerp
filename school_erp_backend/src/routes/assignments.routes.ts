/**
 * @swagger
 * components:
 *   schemas:
 *     Assignment:
 *       type: object
 *       properties:
 *         assignmentId:
 *           type: integer
 *           description: The ID of the assignment
 *         userId:
 *           type: integer
 *           description: The ID of the user associated with the assignment
 *         date:
 *           type: string
 *           description: The date of the assignment
 *         subjectId:
 *           type: integer
 *           description: The ID of the subject associated with the assignment
 *         batchId:
 *           type: integer
 *           description: The ID of the batch associated with the assignment
 *         isActive:
 *           type: boolean
 *           description: Indicates whether the assignment is active or not
 *         title:
 *           type: string
 *           description: The title of the assignment
 *         marks:
 *           type: integer
 *           description: The marks obtained in the assignment
 *       required:
 *         - userId
 *         - date
 *         - subjectId
 *         - batchId
 *         - isActive
 */

/**
 * @swagger
 * /api/assignment:
 *   post:
 *     summary: Create a new assignment
 *     tags:
 *       - Assignments
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Assignment'
 *     responses:
 *       201:
 *         description: Successfully created assignment
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Assignment'
 */

/**
 * @swagger
 * /api/assignment:
 *   get:
 *     summary: Get all assignments
 *     tags:
 *       - Assignments
 *     responses:
 *       200:
 *         description: Successfully retrieved assignments
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Assignment'
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /api/assignment/{assignmentId}:
 *   get:
 *     summary: Get assignment by ID
 *     tags:
 *       - Assignments
 *     parameters:
 *       - name: assignmentId
 *         in: path
 *         description: ID of the assignment
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successfully retrieved assignment
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Assignment'
 *       404:
 *         description: Assignment not found
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /api/assignment/{assignmentId}:
 *   put:
 *     summary: Update assignment by ID
 *     tags:
 *       - Assignments
 *     parameters:
 *       - name: assignmentId
 *         in: path
 *         description: ID of the assignment
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Assignment'
 *     responses:
 *       200:
 *         description: Successfully updated assignment
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Assignment'
 *       404:
 *         description: Assignment not found
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /api/assignment/{assignmentId}:
 *   delete:
 *     summary: Delete assignment by ID
 *     tags:
 *       - Assignments
 *     parameters:
 *       - name: assignmentId
 *         in: path
 *         description: ID of the assignment
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Successfully deleted assignment
 *       404:
 *         description: Assignment not found
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /api/assignment/user/{userId}:
 *   get:
 *     summary: Get assignments by userId
 *     tags:
 *       - Assignments
 *     parameters:
 *       - name: userId
 *         in: path
 *         description: ID of the user
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successfully retrieved assignments
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Assignment'
 *       500:
 *         description: Internal Server Error
 */


import express, { Request, Response } from 'express';
import {
  createAssignment,
  getAllAssignments,
  getAssignmentById,
  updateAssignment,
  deleteAssignment,
  getAssignmentsByUserId,
} from '../controllers/assignment.controller';

const AssignmentRouer = express.Router();

// Create assignment
AssignmentRouer.post('/', async (req: Request, res: Response) => {
  try {
    const newAssignment = await createAssignment(req.body);
    res.status(201).json(newAssignment);
  } catch (error:any) {
    res.status(500).json({ error: error.message });
  }
});

// Get all assignments
AssignmentRouer.get('/', async (req: Request, res: Response) => {
  try {
    const assignments = await getAllAssignments();
    res.status(200).json(assignments);
  } catch (error:any) {
    res.status(500).json({ error: error.message });
  }
});

// Get assignment by ID
AssignmentRouer.get('/:assignmentId', async (req: Request, res: Response) => {
  try {
    const assignmentId = parseInt(req.params.assignmentId, 10);
    const assignment = await getAssignmentById(assignmentId);

    if (assignment) {
      res.status(200).json(assignment);
    } else {
      res.status(404).json({ error: 'Assignment not found' });
    }
  } catch (error:any) {
    res.status(500).json({ error: error.message });
  }
});

// Update assignment
AssignmentRouer.put('/:assignmentId', async (req: Request, res: Response) => {
  try {
    const assignmentId = parseInt(req.params.assignmentId, 10);
    const updatedAssignment = await updateAssignment(assignmentId, req.body);

    if (updatedAssignment) {
      res.status(200).json(updatedAssignment);
    } else {
      res.status(404).json({ error: 'Assignment not found' });
    }
  } catch (error:any) {
    res.status(500).json({ error: error.message });
  }
});

// Delete assignment
AssignmentRouer.delete('/:assignmentId', async (req: Request, res: Response) => {
  try {
    const assignmentId = parseInt(req.params.assignmentId, 10);
    await deleteAssignment(assignmentId);
    res.status(204).end();
  } catch (error:any) {
    res.status(500).json({ error: error.message });
  }
});

// Get assignments by userId
AssignmentRouer.get('/user/:userId', async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.userId, 10);
    const assignments = await getAssignmentsByUserId(userId);
    res.status(200).json(assignments);
  } catch (error:any) {
    res.status(500).json({ error: error.message });
  }
});

export default AssignmentRouer;
