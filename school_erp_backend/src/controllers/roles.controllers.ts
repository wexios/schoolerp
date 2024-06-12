import { Op } from 'sequelize';
import Roles, { RolesSchema } from '../models/roles.model';

// Create
export async function createRole(roleData: RolesSchema): Promise<Roles> {
  try {
    const newRole = await Roles.create(roleData);
    return newRole;
  } catch (error:any) {
    throw new Error(`Error creating role: ${error.message}`);
  }
}

// Read (Get all roles)
export async function getAllRoles(): Promise<Roles[]> {
  try {
    const roles = await Roles.findAll();
    return roles;
  } catch (error:any) {
    throw new Error(`Error getting roles: ${error.message}`);
  }
}

// Read (Get role by ID)
export async function getRoleById(rollId: number): Promise<Roles | null> {
  try {
    const role = await Roles.findByPk(rollId);
    return role;
  } catch (error:any) {
    throw new Error(`Error getting role by ID: ${error.message}`);
  }
}

// Update
export async function updateRole(rollId: number, updatedData: RolesSchema): Promise<Roles | null> {
  try {
    await Roles.update(updatedData, { where: { rollId } });
    const updatedRole = await getRoleById(rollId);
    return updatedRole;
  } catch (error:any) {
    throw new Error(`Error updating role: ${error.message}`);
  }
}

// Delete
export async function deleteRole(rollId: number): Promise<void> {
  try {
    await Roles.destroy({ where: { rollId } });
  } catch (error:any) {
    throw new Error(`Error deleting role: ${error.message}`);
  }
}
