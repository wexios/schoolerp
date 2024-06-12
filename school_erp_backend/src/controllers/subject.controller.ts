import { Op } from 'sequelize';
import Subject, { SubjectSchema } from '../models/subject.model';

// Create
export async function createSubject(subjectData: SubjectSchema): Promise<Subject> {
  try {
    const newSubject = await Subject.create(subjectData);
    return newSubject;
  } catch (error:any) {
    throw new Error(`Error creating subject: ${error.message}`);
  }
}

// Read (Get all subjects)
export async function getAllSubjects(): Promise<Subject[]> {
  try {
    const subjects = await Subject.findAll();
    return subjects;
  } catch (error:any) {
    throw new Error(`Error getting subjects: ${error.message}`);
  }
}

// Read (Get subject by ID)
export async function getSubjectById(subjectIId: number): Promise<Subject | null> {
  try {
    const subject = await Subject.findByPk(subjectIId);
    return subject;
  } catch (error:any) {
    throw new Error(`Error getting subject by ID: ${error.message}`);
  }
}

// Update
export async function updateSubject(subjectIId: number, updatedData: SubjectSchema): Promise<Subject | null> {
  try {
    await Subject.update(updatedData, { where: { subjectIId } });
    const updatedSubject = await getSubjectById(subjectIId);
    return updatedSubject;
  } catch (error:any) {
    throw new Error(`Error updating subject: ${error.message}`);
  }
}

// Delete
export async function deleteSubject(subjectIId: number): Promise<void> {
  try {
    await Subject.destroy({ where: { subjectIId } });
  } catch (error:any) {
    throw new Error(`Error deleting subject: ${error.message}`);
  }
}
