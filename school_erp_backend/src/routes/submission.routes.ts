/**
 * @swagger
 * /api/submission:
 *   post:
 *     summary: Create a new submission
 *     tags: [Submissions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SubmissionRequestBody'
 *     responses:
 *       200:
 *         description: Successfully created submission
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SubmissionResponse'
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /api/submission:
 *   get:
 *     summary: Get all submissions
 *     tags: [Submissions]
 *     responses:
 *       200:
 *         description: Successfully retrieved submissions
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/SubmissionResponse'
 *       404:
 *         description: No submissions found
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /api/submission/{userId}:
 *   get:
 *     summary: Get submission by user ID
 *     tags: [Submissions]
 *     parameters:
 *       - name: userId
 *         in: path
 *         description: ID of the user
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successfully retrieved submission
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SubmissionResponse'
 *       404:
 *         description: Submission not found
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /api/submission/{userId}:
 *   put:
 *     summary: Update submission by user ID
 *     tags: [Submissions]
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
 *             $ref: '#/components/schemas/SubmissionRequestBody'
 *     responses:
 *       200:
 *         description: Successfully updated submission
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SubmissionResponse'
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /api/submission/{userId}:
 *   delete:
 *     summary: Delete submission by user ID
 *     tags: [Submissions]
 *     parameters:
 *       - name: userId
 *         in: path
 *         description: ID of the user
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Submission deleted successfully
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     SubmissionRequestBody:
 *       type: object
 *       properties:
 *         submissionId:
 *           type: integer
 *         date:
 *           type: string
 *         assignmentId:
 *           type: integer
 *         isActive:
 *           type: boolean
 *       required:
 *         - date
 *         - assignmentId
 *         - isActive
 *
 *     SubmissionResponse:
 *       type: object
 *       properties:
 *         userId:
 *           type: integer
 *           format: int64
 *         submissionId:
 *           type: integer
 *           format: int64
 *         date:
 *           type: string
 *         assignmentId:
 *           type: integer
 *           format: int64
 *         isActive:
 *           type: boolean
 */
import express, { Request, Response, NextFunction } from 'express';
import {
  createSubmission,
  getAllSubmissions,
  getSubmissionByUserId,
  updateSubmission,
  deleteSubmission,
} from '../controllers/submission.controller';

const submissionRouter = express.Router();

// Error handling middleware
const errorHandler = (error: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(`Error: ${error.message}`);
  res.status(500).json({ error: 'Internal Server Error' });
};

// Create
submissionRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const created = await createSubmission(req.body);
    res.json(created);
  } catch (error:any) {
    errorHandler(error, req, res, next);
  }
});

// Read (Get all submissions)
submissionRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const submissions = await getAllSubmissions();
    if (submissions && submissions.length > 0) {
      res.json(submissions);
    } else {
      res.status(404).json({ message: 'No submissions found' });
    }
  } catch (error:any) {
    errorHandler(error, req, res, next);
  }
});

// Read (Get submission by user ID)
submissionRouter.get('/:userId', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const submission = await getSubmissionByUserId(Number(req.params.userId));
    if (submission) {
      res.json(submission);
    } else {
      res.status(404).json({ message: 'Submission not found' });
    }
  } catch (error:any) {
    errorHandler(error, req, res, next);
  }
});

// Update
submissionRouter.put('/:userId', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = req.params;
    const updatedData = req.body;
    const updatedSubmission = await updateSubmission(Number(userId), updatedData);
    res.json(updatedSubmission);
  } catch (error:any) {
    errorHandler(error, req, res, next);
  }
});

// Delete
submissionRouter.delete('/:userId', async (req: Request, res: Response, next: NextFunction) => {
  try {
    await deleteSubmission(Number(req.params.userId));
    res.json({ message: 'Submission deleted successfully' });
  } catch (error:any) {
    errorHandler(error, req, res, next);
  }
});

export default submissionRouter;
