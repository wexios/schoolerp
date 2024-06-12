/**
 * @swagger
 * tags:
 *   name: Roles
 *   description: API endpoints for managing roles
 */

/**
 * @swagger
 * /role:
 *   post:
 *     summary: Create a new role
 *     tags: [Roles]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RoleRequestBody'
 *     responses:
 *       200:
 *         description: Successfully created role
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RoleResponse'
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /role:
 *   get:
 *     summary: Get all roles
 *     tags: [Roles]
 *     responses:
 *       200:
 *         description: Successfully retrieved roles
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/RoleResponse'
 *       404:
 *         description: No roles found
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /role/{rollId}:
 *   get:
 *     summary: Get role by ID
 *     tags: [Roles]
 *     parameters:
 *       - name: rollId
 *         in: path
 *         description: ID of the role
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successfully retrieved role
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RoleResponse'
 *       404:
 *         description: Role not found
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /role/{rollId}:
 *   put:
 *     summary: Update role by ID
 *     tags: [Roles]
 *     parameters:
 *       - name: rollId
 *         in: path
 *         description: ID of the role
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RoleRequestBody'
 *     responses:
 *       200:
 *         description: Successfully updated role
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RoleResponse'
 *       404:
 *         description: Role not found
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /role/{rollId}:
 *   delete:
 *     summary: Delete role by ID
 *     tags: [Roles]
 *     parameters:
 *       - name: rollId
 *         in: path
 *         description: ID of the role
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Role deleted successfully
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     RoleRequestBody:
 *       type: object
 *       properties:
 *         rollName:
 *           type: string
 *         rollstatus:
 *           type: boolean
 *       required:
 *         - rollName
 *         - rollstatus
 *
 *     RoleResponse:
 *       type: object
 *       properties:
 *         rollId:
 *           type: integer
 *           format: int64
 *         rollName:
 *           type: string
 *         rollstatus:
 *           type: boolean
 */


import express, { Request, Response, NextFunction } from 'express';
import {
  createRole,
  getAllRoles,
  getRoleById,
  updateRole,
  deleteRole,
} from '../controllers/roles.controllers';

const rolesRouter = express.Router();

// Error handling middleware
const errorHandler = (error: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(`Error: ${error.message}`);
  res.status(500).json({ error: 'Internal Server Error' });
};

// Create
rolesRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    let createdRole = await createRole(req.body);
    res.json(createdRole);
  } catch (error:any) {
    errorHandler(error, req, res, next);
  }
});

// Read (Get all roles)
rolesRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    let roles = await getAllRoles();
    if (roles.length > 0) {
      res.json(roles);
    } else {
      res.status(404).json({ message: 'No roles found' });
    }
  } catch (error:any) {
    errorHandler(error, req, res, next);
  }
});

// Read (Get role by ID)
rolesRouter.get('/:rollId', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const role = await getRoleById(Number(req.params.rollId));
    if (role) {
      res.json(role);
    } else {
      res.status(404).json({ message: 'Role not found' });
    }
  } catch (error:any) {
    errorHandler(error, req, res, next);
  }
});

// Update
rolesRouter.put('/:rollId', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { rollId } = req.params;
    const updatedData = req.body;
    const updatedRole = await updateRole(Number(rollId), updatedData);
    if (updatedRole) {
      res.json(updatedRole);
    } else {
      res.status(404).json({ message: 'Role not found' });
    }
  } catch (error:any) {
    errorHandler(error, req, res, next);
  }
});

// Delete
rolesRouter.delete('/:rollId', async (req: Request, res: Response, next: NextFunction) => {
  try {
    await deleteRole(Number(req.params.rollId));
    res.json({ message: 'Role deleted successfully' });
  } catch (error:any) {
    errorHandler(error, req, res, next);
  }
});

export default rolesRouter;
