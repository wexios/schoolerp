import { Op } from 'sequelize';
import Notes, { NotesSchema } from '../models/notes.model';


// Create
export async function createNote(noteData: NotesSchema): Promise<Notes> {
  try {
    const newNote = await Notes.create(noteData);
    return newNote;
  } catch (error:any) {
    throw new Error(`Error creating note: ${error.message}`);
  }
}

// Read (Get all notes)
export async function getAllNotes(): Promise<Notes[]> {
  try {
    const notes = await Notes.findAll();
    return notes;
  } catch (error:any) {
    throw new Error(`Error getting notes: ${error.message}`);
  }
}

// Read (Get note by ID)
export async function getNoteById(notesId: number): Promise<Notes | null> {
  try {
    const note = await Notes.findByPk(notesId);
    return note;
  } catch (error:any) {
    throw new Error(`Error getting note by ID: ${error.message}`);
  }
}

// Update
export async function updateNote(notesId: number, updatedData: NotesSchema): Promise<Notes | null> {
  try {
    await Notes.update(updatedData, { where: { notesId } });
    const updatedNote = await getNoteById(notesId);
    return updatedNote;
  } catch (error:any) {
    throw new Error(`Error updating note: ${error.message}`);
  }
}

// Delete
export async function deleteNote(notesId: number): Promise<void> {
  try {
    await Notes.destroy({ where: { notesId } });
  } catch (error:any) {
    throw new Error(`Error deleting note: ${error.message}`);
  }
}

// Additional Function (Get notes by userId)
export async function getNotesByUserId(userId: number): Promise<Notes[]> {
  try {
    const notes = await Notes.findAll({ where: { userId } });
    return notes;
  } catch (error:any) {
    throw new Error(`Error getting notes by userId: ${error.message}`);
  }
}
