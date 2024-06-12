import { Request, Response } from 'express';
import User, { UserSchema } from '../models/user.model';
import jwt from 'jsonwebtoken';
import { jwtSecret } from '../utils/env.config';
import logger from '../utils/logger';
import  bcrypt  from 'bcryptjs';

// Function to generate a JWT token
function generateToken(userId: number, username: string): string {
    const payload = {
        userId,
        username,
        // Add any other user-related data you want in the token
    };

    // Replace 'your-secret-key' with your actual secret key
    const token = jwt.sign(payload, jwtSecret, { expiresIn: '1h' });

    return token;
}

// Create
export async function createUser(username: string, password: string, profilePic: string, email: string, firstName: string, lastname: string, mobileNo: string, address: string, isActive: boolean): Promise<UserSchema> {
    try {
        const newUser = await User.create({ username, password, profilePic, email, firstName, lastname, mobileNo, address, isActive });
        return newUser;
    } catch (error:any) {
        throw new Error(`Error creating user: ${error.message}`);
    }
}

// Read (Get all users)
export async function getAllUsers(): Promise<UserSchema[]> {
    try {
        const users = await User.findAll();
        return users;
    } catch (error:any) {
        throw new Error(`Error getting users: ${error.message}`);
    }
}

// Read (Get user by ID)
export async function getUserById(userId: number): Promise<UserSchema | null> {
    try {
        const user = await User.findByPk(userId);
        return user;
    } catch (error:any) {
        throw new Error(`Error getting user by ID: ${error.message}`);
    }
}

// Update
export async function updateUser(userId: number, password: string | undefined, profilePic: string, email: string, firstName: string, lastname: string, mobileNo: string, address: string, isActive: boolean): Promise<UserSchema | null> {
    try {
        const existingUser = await User.findByPk(userId);

        if (!existingUser) {
            throw new Error('User not found');
        }

        // Update the password if provided
        if (password) {
            existingUser.password = password;
        }

        // Update other fields
        await existingUser.update({ profilePic, email, firstName, lastname, mobileNo, address, isActive });

        return existingUser;
    } catch (error:any) {
        throw new Error(`Error updating user: ${error.message}`);
    }
}

// Delete
export async function deleteUser(userId: number): Promise<void> {
    try {
        await User.destroy({ where: { userId } });
    } catch (error:any) {
        throw new Error(`Error deleting user: ${error.message}`);
    }
}

// Login
export async function loginUser(username: string, password: string): Promise<{ message: string, token: string } | { error: string }> {
    try {
        // Find user by username
        logger.info(username)
        const user = await User.findOne({ where: { username } });
        logger.info(user?.toJSON());
        const isPasswordCorrect = await bcrypt.compare(password,String(user?.password));
        logger.info(isPasswordCorrect);
        if (user && isPasswordCorrect) {
            // Generate a JWT token
            const token = generateToken(user.userId, user.username);

            return { message: 'Login successful', token };
        } else {
            return { error: 'Invalid credentials' };
        }
    } catch (error:any) {
        throw new Error(`Error logging in: ${error.message}`);
    }
}
