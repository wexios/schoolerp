import { Op } from 'sequelize';
import Assignment, { AssignmentSchema } from '../models/assignment.model';
import User from '../models/user.model';
import Subject from '../models/subject.model';
import Batch from '../models/batch.model';
 // Adjust the import path accordingly

// Create
export async function createAssignment(assignmentData: AssignmentSchema): Promise<Assignment> {
  try {
    const newAssignment = await Assignment.create(assignmentData);
    return newAssignment;
  } catch (error:any) {
    throw new Error(`Error creating assignment: ${error.message}`);
  }
}

// Read (Get all assignments)
export async function getAllAssignments(): Promise<any[]> {
  try {
    const assignments = await Assignment.findAll();
   const mappedAssignments = await Promise.all(assignments.map(async (a)=>{
    const user = await User.findOne({where:{userId: a.userId}});
    const subject = await Subject.findOne({where:{
      subjectIId: a.subjectId
    }});
    const batch = await Batch.findOne({where:{batchIId: a.batchId}});
    return {
      assignmentId: a.assignmentId,
      title: a.title,
      marks:a.marks,
      user: user?.username,
      subject:subject?.subjectName,
      batch: batch?.batchName,
      date:a.date,
    };
  }))
    
    return mappedAssignments;
  } catch (error:any) {
    throw new Error(`Error getting assignments: ${error.message}`);
  }
}

// Read (Get assignment by ID)
export async function getAssignmentById(assignmentId: number): Promise<Assignment | null> {
  try {
    const assignment = await Assignment.findByPk(assignmentId);
    return assignment;
  } catch (error:any) {
    throw new Error(`Error getting assignment by ID: ${error.message}`);
  }
}

// Update
export async function updateAssignment(assignmentId: number, updatedData: AssignmentSchema): Promise<Assignment | null> {
  try {
    await Assignment.update(updatedData, { where: { assignmentId } });
    const updatedAssignment = await getAssignmentById(assignmentId);
    return updatedAssignment;
  } catch (error:any) {
    throw new Error(`Error updating assignment: ${error.message}`);
  }
}

// Delete
export async function deleteAssignment(assignmentId: number): Promise<void> {
  try {
    await Assignment.destroy({ where: { assignmentId } });
  } catch (error:any) {
    throw new Error(`Error deleting assignment: ${error.message}`);
  }
}

// Additional Function (Get assignments by userId)
export async function getAssignmentsByUserId(userId: number): Promise<Assignment[]> {
  try {
    const assignments = await Assignment.findAll({ where: { userId } });
    return assignments;
  } catch (error:any) {
    throw new Error(`Error getting assignments by userId: ${error.message}`);
  }
}
