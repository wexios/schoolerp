import { Op } from 'sequelize';
import Mark, { MarkSchema } from '../models/mark.model';


// Create
export async function createMark(markData: MarkSchema): Promise<Mark> {
  try {
    const newMark = await Mark.create(markData);
    return newMark;
  } catch (error:any) {
    throw new Error(`Error creating mark: ${error.message}`);
  }
}

// Read (Get all marks)
export async function getAllMarks(): Promise<Mark[]> {
  try {
    const marks = await Mark.findAll();
    return marks;
  } catch (error:any) {
    throw new Error(`Error getting marks: ${error.message}`);
  }
}

// Read (Get mark by user ID)
export async function getMarkByUserId(userId: number): Promise<Mark | null> {
  try {
    const mark = await Mark.findByPk(userId);
    return mark;
  } catch (error:any) {
    throw new Error(`Error getting mark by user ID: ${error.message}`);
  }
}

// Update
export async function updateMark(userId: number, updatedData: MarkSchema): Promise<Mark | null> {
  try {
    await Mark.update(updatedData, { where: { userId } });
    const updatedMark = await getMarkByUserId(userId);
    return updatedMark;
  } catch (error:any) {
    throw new Error(`Error updating mark: ${error.message}`);
  }
}

// Delete
export async function deleteMark(userId: number): Promise<void> {
  try {
    await Mark.destroy({ where: { userId } });
  } catch (error:any) {
    throw new Error(`Error deleting mark: ${error.message}`);
  }
}
