import { Op } from 'sequelize';
import Attentence, { AttentenceSchema } from '../models/attentence.model';

// Create
export async function createAttentence(attentenceData:  AttentenceSchema): Promise<Attentence> {
  try {
    const newAttentence = await Attentence.create(attentenceData);
    return newAttentence;
  } catch (error:any) {
    throw new Error(`Error creating attentence: ${error.message}`);
  }
}

// Read (Get all attentence records)
export async function getAllAttentences(): Promise<Attentence[]> {
  try {
    const attentences = await Attentence.findAll();
    return attentences;
  } catch (error:any) {
    throw new Error(`Error getting attentences: ${error.message}`);
  }
}

// Read (Get attentence record by ID)
export async function getAttentenceById(attentenceId: number): Promise<Attentence | null> {
  try {
    const attentence = await Attentence.findByPk(attentenceId);
    return attentence;
  } catch (error:any) {
    throw new Error(`Error getting attentence by ID: ${error.message}`);
  }
}

// Update
export async function updateAttentence(attentenceId: number, updatedData:  AttentenceSchema): Promise<Attentence | null> {
  try {
    await Attentence.update(updatedData, { where: { attentenceId } });
    const updatedAttentence = await getAttentenceById(attentenceId);
    return updatedAttentence;
  } catch (error:any) {
    throw new Error(`Error updating attentence: ${error.message}`);
  }
}

// Delete
export async function deleteAttentence(attentenceId: number): Promise<void> {
  try {
    await Attentence.destroy({ where: { attentenceId } });
  } catch (error:any) {
    throw new Error(`Error deleting attentence: ${error.message}`);
  }
}

// Additional Function (Get attentences by studentId)
export async function getAttentencesByStudentId(studentId: number): Promise<Attentence[]> {
  try {
    const attentences = await Attentence.findAll({ where: { studentId } });
    return attentences;
  } catch (error:any) {
    throw new Error(`Error getting attentences by studentId: ${error.message}`);
  }
}
