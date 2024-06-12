import { Op } from 'sequelize';
import SubjectToBatch, { subjecttobatchSchema } from '../models/subjecttobatch.model';


// Create
export async function createSubjectToBatch(subjectToBatchData: subjecttobatchSchema): Promise<SubjectToBatch> {
  try {
    const newSubjectToBatch = await SubjectToBatch.create(subjectToBatchData);
    return newSubjectToBatch;
  } catch (error:any) {
    throw new Error(`Error creating subject to batch relationship: ${error.message}`);
  }
}

// Read (Get all subject to batch relationships)
export async function getAllSubjectToBatchRelationships(): Promise<SubjectToBatch[]> {
  try {
    const subjectToBatchRelationships = await SubjectToBatch.findAll();
    return subjectToBatchRelationships;
  } catch (error:any) {
    throw new Error(`Error getting subject to batch relationships: ${error.message}`);
  }
}

// Read (Get subject to batch relationship by ID)
export async function getSubjectToBatchRelationshipById(subjectToBatchId: number): Promise<SubjectToBatch | null> {
  try {
    const subjectToBatchRelationship = await SubjectToBatch.findByPk(subjectToBatchId);
    return subjectToBatchRelationship;
  } catch (error:any) {
    throw new Error(`Error getting subject to batch relationship by ID: ${error.message}`);
  }
}

// Update
export async function updateSubjectToBatchRelationship(subjectToBatchId: number, updatedData: subjecttobatchSchema): Promise<SubjectToBatch | null> {
  try {
    await SubjectToBatch.update(updatedData, { where: {subjecttToBatchId: subjectToBatchId } });
    const updatedSubjectToBatch = await getSubjectToBatchRelationshipById(subjectToBatchId);
    return updatedSubjectToBatch;
  } catch (error:any) {
    throw new Error(`Error updating subject to batch relationship: ${error.message}`);
  }
}

// Delete
export async function deleteSubjectToBatchRelationship(subjectToBatchId: number): Promise<void> {
  try {
    await SubjectToBatch.destroy({ where: { subjecttToBatchId:subjectToBatchId } });
  } catch (error:any) {
    throw new Error(`Error deleting subject to batch relationship: ${error.message}`);
  }
}
