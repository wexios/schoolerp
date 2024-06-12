/**
 * @swagger
 * tags:
 *   name: Notes
 *   description: API endpoints for managing notes
 */

/**
 * @swagger
 * /api/note:
 *   post:
 *     summary: Create a new note
 *     tags: [Notes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NoteRequestBody'
 *     responses:
 *       200:
 *         description: Successfully created note
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/NoteResponse'
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /api/note:
 *   get:
 *     summary: Get all notes
 *     tags: [Notes]
 *     responses:
 *       200:
 *         description: Successfully retrieved notes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/NoteResponse'
 *       404:
 *         description: No notes found
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /api/note/{notesId}:
 *   get:
 *     summary: Get note by ID
 *     tags: [Notes]
 *     parameters:
 *       - name: notesId
 *         in: path
 *         description: ID of the note
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successfully retrieved note
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/NoteResponse'
 *       404:
 *         description: Note not found
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /api/note/{notesId}:
 *   put:
 *     summary: Update note by ID
 *     tags: [Notes]
 *     parameters:
 *       - name: notesId
 *         in: path
 *         description: ID of the note
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NoteRequestBody'
 *     responses:
 *       200:
 *         description: Successfully updated note
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/NoteResponse'
 *       404:
 *         description: Note not found
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /api/note/{notesId}:
 *   delete:
 *     summary: Delete note by ID
 *     tags: [Notes]
 *     parameters:
 *       - name: notesId
 *         in: path
 *         description: ID of the note
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Note deleted successfully
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /api/note/user/{userId}:
 *   get:
 *     summary: Get notes by user ID
 *     tags: [Notes]
 *     parameters:
 *       - name: userId
 *         in: path
 *         description: ID of the user
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successfully retrieved notes for the specified user
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/NoteResponse'
 *       404:
 *         description: No notes found for the specified user
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     NoteRequestBody:
 *       type: object
 *       properties:
 *         subjectId:
 *           type: integer
 *         notesName:
 *           type: string
 *         batchId:
 *           type: integer
 *         userId:
 *           type: integer
 *         noteFile:
 *           type: string
 *         isActive:
 *           type: boolean
 *       required:
 *         - subjectId
 *         - notesName
 *         - batchId
 *         - userId
 *         - noteFile
 *         - isActive
 *
 *     NoteResponse:
 *       type: object
 *       properties:
 *         notesId:
 *           type: integer
 *           format: int64
 *         subjectId:
 *           type: integer
 *         notesName:
 *           type: string
 *         batchId:
 *           type: integer
 *         userId:
 *           type: integer
 *         noteFile:
 *           type: string
 *         isActive:
 *           type: boolean
 */

import express, { Request, Response, NextFunction } from 'express';
import {
  createNote,
  getAllNotes,
  getNoteById,
  updateNote,
  deleteNote,
  getNotesByUserId,
} from '../controllers/notes.controllers';

const notesRouter = express.Router();

// Error handling middleware
const errorHandler = (error: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(`Error: ${error.message}`);
  res.status(500).json({ error: 'Internal Server Error' });
};

// Create
notesRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    let createdNote = await createNote(req.body);
    res.json(createdNote);
  } catch (error:any) {
    errorHandler(error, req, res, next);
  }
});

// Read (Get all notes)
notesRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    let notes = await getAllNotes();
    if (notes.length > 0) {
      res.json(notes);
    } else {
      res.status(404).json({ message: 'No notes found' });
    }
  } catch (error:any) {
    errorHandler(error, req, res, next);
  }
});

// Read (Get note by ID)
notesRouter.get('/:notesId', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const note = await getNoteById(Number(req.params.notesId));
    if (note) {
      res.json(note);
    } else {
      res.status(404).json({ message: 'Note not found' });
    }
  } catch (error:any) {
    errorHandler(error, req, res, next);
  }
});

// Update
notesRouter.put('/:notesId', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { notesId } = req.params;
    const updatedData = req.body;
    const updatedNote = await updateNote(Number(notesId), updatedData);
    if (updatedNote) {
      res.json(updatedNote);
    } else {
      res.status(404).json({ message: 'Note not found' });
    }
  } catch (error:any) {
    errorHandler(error, req, res, next);
  }
});

// Delete
notesRouter.delete('/:notesId', async (req: Request, res: Response, next: NextFunction) => {
  try {
    await deleteNote(Number(req.params.notesId));
    res.json({ message: 'Note deleted successfully' });
  } catch (error:any) {
    errorHandler(error, req, res, next);
  }
});

// Additional Function (Get notes by userId)
notesRouter.get('/user/:userId', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = req.params;
    const notes = await getNotesByUserId(Number(userId));
    if (notes.length > 0) {
      res.json(notes);
    } else {
      res.status(404).json({ message: 'No notes found for the specified user' });
    }
  } catch (error:any) {
    errorHandler(error, req, res, next);
  }
});

export default notesRouter;
