/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API endpoints for managing users
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     UserRequestBody:
 *       type: object
 *       properties:
 *         username:
 *           type: string
 *         password:
 *           type: string
 *         profilePic:
 *           type: string
 *         email:
 *           type: string
 *         firstName:
 *           type: string
 *         lastName:
 *           type: string
 *         mobileNo:
 *           type: number
 *         address:
 *           type: string
 *         isActive:
 *           type: boolean
 *       required:
 *         - username
 *         - password
 *         - email
 *         - isActive
 *
 *     UserResponseBody:
 *       type: object
 *       properties:
 *         userId:
 *           type: number
 *           format: int64
 *         username:
 *           type: string
 *         profilePic:
 *           type: string
 *         email:
 *           type: string
 *         firstName:
 *           type: string
 *         lastName:
 *           type: string
 *         mobileNo:
 *           type: number
 *         address:
 *           type: string
 *         isActive:
 *           type: boolean
 */

/**
 * @swagger
 * /api/user:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserRequestBody'
 *     responses:
 *       200:
 *         description: Successfully created user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserResponseBody'
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /api/user:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Successfully retrieved users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/UserResponseBody'
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /api/user/{userId}:
 *   get:
 *     summary: Get user by ID
 *     tags: [Users]
 *     parameters:
 *       - name: userId
 *         in: path
 *         description: ID of the user
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successfully retrieved user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserResponseBody'
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /api/user/{userId}:
 *   put:
 *     summary: Update user by ID
 *     tags: [Users]
 *     parameters:
 *       - name: userId
 *         in: path
 *         description: ID of the user
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserRequestBody'
 *     responses:
 *       200:
 *         description: Successfully updated user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserResponseBody'
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /api/user/{userId}:
 *   delete:
 *     summary: Delete user by ID
 *     tags: [Users]
 *     parameters:
 *       - name: userId
 *         in: path
 *         description: ID of the user
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /api/user/login:
 *   post:
 *     summary: User login
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserRequestBody'
 *     responses:
 *       200:
 *         description: Successfully logged in
 *       401:
 *         description: Unauthorized - Invalid credentials
 *       500:
 *         description: Internal Server Error
 */

import express, { Request, Response } from 'express';
import * as userController from '../controllers/user.controller';

const UserRouter = express.Router();

UserRouter.post('/', async (req: Request, res: Response) => {
    try {
        const { username, password, profilePic, email, firstName, lastname, mobileNo, address, isActive } = req.body;
        const newUser = await userController.createUser(username, password, profilePic, email, firstName, lastname, mobileNo, address, isActive);
        res.json(newUser);
    } catch (error:any) {
        res.status(500).json({ error: `Error creating user: ${error.message}` });
    }
});

UserRouter.get('/', async (req: Request, res: Response) => {
    try {
        const users = await userController.getAllUsers();
        res.json(users);
    } catch (error:any) {
        res.status(500).json({ error: `Error getting users: ${error.message}` });
    }
});

UserRouter.get('/:userId', async (req: Request, res: Response) => {
    try {
        const userId = Number(req.params.userId);
        const user = await userController.getUserById(userId);
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error:any) {
        res.status(500).json({ error: `Error getting user by ID: ${error.message}` });
    }
});

UserRouter.put('/:userId', async (req: Request, res: Response) => {
    try {
        const userId = Number(req.params.userId);
        const { password, profilePic, email, firstName, lastname, mobileNo, address, isActive } = req.body;
        const updatedUser = await userController.updateUser(userId, password, profilePic, email, firstName, lastname, mobileNo, address, isActive);
        res.json(updatedUser);
    } catch (error:any) {
        res.status(500).json({ error: `Error updating user: ${error.message}` });
    }
});

UserRouter.delete('/:userId', async (req: Request, res: Response) => {
    try {
        const userId = Number(req.params.userId);
        await userController.deleteUser(userId);
        res.json({ message: 'User deleted successfully' });
    } catch (error:any) {
        res.status(500).json({ error: `Error deleting user: ${error.message}` });
    }
});

UserRouter.post('/auth/login', async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;
        const result = await userController.loginUser(username, password);
        if ('error' in result) {
            res.status(401).json({ error: result.error });
        } else {
            res.json(result);
        }
    } catch (error:any) {
        res.status(500).json({ error: `Error logging in: ${error.message}` });
    }
});

export default UserRouter;
