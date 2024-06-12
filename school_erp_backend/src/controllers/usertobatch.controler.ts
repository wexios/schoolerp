import { Op } from 'sequelize';
import Usertobatch, { UsertobatchSchema } from '../models/usertobatch.model';


// Create
export async function createUsertobatch(usertobatchData: UsertobatchSchema): Promise<Usertobatch> {
  try {
    const newUsertobatch = await Usertobatch.create(usertobatchData);
    return newUsertobatch;
  } catch (error:any) {
    throw new Error(`Error creating user to batch relationship: ${error.message}`);
  }
}

// Read (Get all user to batch relationships)
export async function getAllUsertobatchRelationships(): Promise<Usertobatch[]> {
  try {
    const usertobatchRelationships = await Usertobatch.findAll();
    return usertobatchRelationships;
  } catch (error:any) {
    throw new Error(`Error getting user to batch relationships: ${error.message}`);
  }
}

// Read (Get user to batch relationship by ID)
export async function getUsertobatchRelationshipById(usertobatchId: number): Promise<Usertobatch | null> {
  try {
    const usertobatchRelationship = await Usertobatch.findByPk(usertobatchId);
    return usertobatchRelationship;
  } catch (error:any) {
    throw new Error(`Error getting user to batch relationship by ID: ${error.message}`);
  }
}

// Update
export async function updateUsertobatchRelationship(usertobatchId: number, updatedData: UsertobatchSchema): Promise<Usertobatch | null> {
  try {
    await Usertobatch.update(updatedData, { where: { usertobatchId } });
    const updatedUsertobatch = await getUsertobatchRelationshipById(usertobatchId);
    return updatedUsertobatch;
  } catch (error:any) {
    throw new Error(`Error updating user to batch relationship: ${error.message}`);
  }
}

// Delete
export async function deleteUsertobatchRelationship(usertobatchId: number): Promise<void> {
  try {
    await Usertobatch.destroy({ where: { usertobatchId } });
  } catch (error:any) {
    throw new Error(`Error deleting user to batch relationship: ${error.message}`);
  }
}
