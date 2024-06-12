/**
 * @swagger
 * tags:
 *   name: Attendance
 *   description: API endpoints for managing attendance records
 */

/**
 * @swagger
 * /api/attendance:
 *   post:
 *     summary: Create a new attendance record
 *     tags: [Attendance]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AttentenceRequestBody'
 *     responses:
 *       201:
 *         description: Successfully created attendance record
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AttentenceResponse'
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /api/attendance:
 *   get:
 *     summary: Get all attendance records
 *     tags: [Attendance]
 *     responses:
 *       200:
 *         description: Successfully retrieved attendance records
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/AttentenceResponse'
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /api/attendance/{attendanceId}:
 *   get:
 *     summary: Get attendance record by ID
 *     tags: [Attendance]
 *     parameters:
 *       - name: attendanceId
 *         in: path
 *         description: ID of the attendance record
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successfully retrieved attendance record
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AttentenceResponse'
 *       404:
 *         description: Attendance record not found
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /api/attendance/{attendanceId}:
 *   put:
 *     summary: Update attendance record by ID
 *     tags: [Attendance]
 *     parameters:
 *       - name: attendanceId
 *         in: path
 *         description: ID of the attendance record
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AttentenceRequestBody'
 *     responses:
 *       200:
 *         description: Successfully updated attendance record
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AttentenceResponse'
 *       404:
 *         description: Attendance record not found
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /api/attendance/{attendanceId}:
 *   delete:
 *     summary: Delete attendance record by ID
 *     tags: [Attendance]
 *     parameters:
 *       - name: attendanceId
 *         in: path
 *         description: ID of the attendance record
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Successfully deleted attendance record
 *       404:
 *         description: Attendance record not found
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /api/attendance/student/{studentId}:
 *   get:
 *     summary: Get attendance records by student ID
 *     tags: [Attendance]
 *     parameters:
 *       - name: studentId
 *         in: path
 *         description: ID of the student
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successfully retrieved attendance records for the student
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/AttentenceResponse'
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     AttentenceRequestBody:
 *       type: object
 *       properties:
 *         studentId:
 *           type: integer
 *           format: int64
 *         date:
 *           type: string
 *           format: date
 *         techerId:
 *           type: integer
 *           format: int64
 *         subjectId:
 *           type: integer
 *           format: int64
 *         isPresent:
 *           type: boolean
 *       required:
 *         - studentId
 *         - date
 *         - techerId
 *         - subjectId
 *         - isPresent
 *
 *     AttentenceResponse:
 *       type: object
 *       properties:
 *         attentenceId:
 *           type: integer
 *           format: int64
 *         studentId:
 *           type: integer
 *           format: int64
 *         date:
 *           type: string
 *           format: date
 *         techerId:
 *           type: integer
 *           format: int64
 *         subjectId:
 *           type: integer
 *           format: int64
 *         isPresent:
 *           type: boolean
 */





import express, { Request, Response } from 'express';
import {
  createAttentence,
  getAllAttentences,
  getAttentenceById,
  updateAttentence,
  deleteAttentence,
  getAttentencesByStudentId,
} from '../controllers/attentence.controller';

const AttendenceRouter = express.Router();

// Create attentence record
AttendenceRouter.post('/', async (req: Request, res: Response) => {
  try {
    const newAttentence = await createAttentence(req.body);
    res.status(201).json(newAttentence);
  } catch (error:any) {
    res.status(500).json({ error: error.message });
  }
});

// Get all attentence records
AttendenceRouter.get('/', async (req: Request, res: Response) => {
  try {
    const attentences = await getAllAttentences();
    res.status(200).json(attentences);
  } catch (error:any) {
    res.status(500).json({ error: error.message });
  }
});

// Get attentence record by ID
AttendenceRouter.get('/:attentenceId', async (req: Request, res: Response) => {
  try {
    const attentenceId = parseInt(req.params.attentenceId, 10);
    const attentence = await getAttentenceById(attentenceId);

    if (attentence) {
      res.status(200).json(attentence);
    } else {
      res.status(404).json({ error: 'Attentence not found' });
    }
  } catch (error:any) {
    res.status(500).json({ error: error.message });
  }
});

// Update attentence record
AttendenceRouter.put('/:attentenceId', async (req: Request, res: Response) => {
  try {
    const attentenceId = parseInt(req.params.attentenceId, 10);
    const updatedAttentence = await updateAttentence(attentenceId, req.body);

    if (updatedAttentence) {
      res.status(200).json(updatedAttentence);
    } else {
      res.status(404).json({ error: 'Attentence not found' });
    }
  } catch (error:any) {
    res.status(500).json({ error: error.message });
  }
});

// Delete attentence record
AttendenceRouter.delete('/:attentenceId', async (req: Request, res: Response) => {
  try {
    const attentenceId = parseInt(req.params.attentenceId, 10);
    await deleteAttentence(attentenceId);
    res.status(204).end();
  } catch (error:any) {
    res.status(500).json({ error: error.message });
  }
});

// Get attentences by studentId
AttendenceRouter.get('/student/:studentId', async (req: Request, res: Response) => {
  try {
    const studentId = parseInt(req.params.studentId, 10);
    const attentences = await getAttentencesByStudentId(studentId);
    res.status(200).json(attentences);
  } catch (error:any) {
    res.status(500).json({ error: error.message });
  }
});

export default AttendenceRouter;

