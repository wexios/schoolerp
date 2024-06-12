import { Op } from 'sequelize';
import Submission, { SubmissionSchema } from '../models/subbmission.model';


// Create
export async function createSubmission(submissionData: SubmissionSchema): Promise<Submission> {
  try {
    const newSubmission = await Submission.create(submissionData);
    return newSubmission;
  } catch (error:any) {
    throw new Error(`Error creating submission: ${error.message}`);
  }
}

// Read (Get all submissions)
export async function getAllSubmissions(): Promise<Submission[]> {
  try {
    const submissions = await Submission.findAll();
    return submissions;
  } catch (error:any) {
    throw new Error(`Error getting submissions: ${error.message}`);
  }
}

// Read (Get submission by userId)
export async function getSubmissionByUserId(userId: number): Promise<Submission[]> {
  try {
    const submissions = await Submission.findAll({ where: { userId } });
    return submissions;
  } catch (error:any) {
    throw new Error(`Error getting submission by userId: ${error.message}`);
  }
}

// Read (Get submission by assignmentId)
export async function getSubmissionByAssignmentId(assignmentId: number): Promise<Submission[]> {
  try {
    const submissions = await Submission.findAll({ where: { assignmentId } });
    return submissions;
  } catch (error:any) {
    throw new Error(`Error getting submission by assignmentId: ${error.message}`);
  }
}

export async function updateSubmission(userId: number, updatedData: SubmissionSchema): Promise<Submission[] | null> {
  try {
    const [affectedRows] = await Submission.update(updatedData, { where: { userId } });

    // Check if any rows were affected
    if (affectedRows > 0) {
      const updatedSubmission = await getSubmissionByUserId(userId);
      return updatedSubmission;
    } else {
      return null; // No rows were updated
    }
  } catch (error:any) {
    throw new Error(`Error updating submission: ${error.message}`);
  }
}
// Delete
export async function deleteSubmission(userId: number): Promise<void> {
  try {
    await Submission.destroy({ where: { userId } });
  } catch (error:any) {
    throw new Error(`Error deleting submission: ${error.message}`);
  }
}
