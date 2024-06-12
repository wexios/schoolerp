import { Op } from 'sequelize';
import Batch, { BatchSchema } from '../models/batch.model';

// Create
export async function createBatch(batchData: BatchSchema): Promise<Batch> {
  try {
    const newBatch = await Batch.create(batchData);
    return newBatch;
  } catch (error:any) {
    throw new Error(`Error creating batch: ${error.message}`);
  }
}

// Read (Get all batches)
export async function getAllBatches(): Promise<Batch[]> {
  try {
    const batches = await Batch.findAll();
    return batches;
  } catch (error:any) {
    throw new Error(`Error getting batches: ${error.message}`);
  }
}

// Read (Get batch by ID)
export async function getBatchById(batchIId: number): Promise<Batch | null> {
  try {
    const batch = await Batch.findByPk(batchIId);
    return batch;
  } catch (error:any) {
    throw new Error(`Error getting batch by ID: ${error.message}`);
  }
}

// Update
export async function updateBatch(batchIId: number, updatedData: BatchSchema): Promise<Batch | null> {
  try {
    await Batch.update(updatedData, { where: { batchIId } });
    const updatedBatch = await getBatchById(batchIId);
    return updatedBatch;
  } catch (error:any) {
    throw new Error(`Error updating batch: ${error.message}`);
  }
}

// Delete
export async function deleteBatch(batchIId: number): Promise<void> {
  try {
    await Batch.destroy({ where: { batchIId } });
  } catch (error:any) {
    throw new Error(`Error deleting batch: ${error.message}`);
  }
}
