import { DataTypes, Model, Optional } from "sequelize";
import sequelize from './../utils/db';

export interface AssignmentSchema {
    assignmentId: number;
    userId: number;
    date: string;
    subjectId: number;
    batchId: number;
    isActive: boolean;
    title: string;
    marks: number;
}

interface AssignmentOmitSchema extends Optional<AssignmentSchema, "assignmentId"> {}

class Assignment extends Model<AssignmentSchema, AssignmentOmitSchema> implements AssignmentSchema {
    assignmentId!: number;
    userId!: number;
    date!: string;
    subjectId!: number;
    batchId!: number;
    isActive!: boolean;
    title!: string;
    marks!: number;
}

Assignment.init({
    assignmentId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    userId: {
        type: DataTypes.INTEGER,
    },
    date: {
        type: DataTypes.TEXT
    },
    subjectId: {
        type: DataTypes.INTEGER,
    },
    batchId: {
        type: DataTypes.INTEGER,
    },
    isActive: {
        type: DataTypes.BOOLEAN,
    },
    title: {
        type: DataTypes.STRING, // Assuming the title is a string
    },
    marks: {
        type: DataTypes.INTEGER, // Assuming marks are integers
    }
}, {
    sequelize,
    modelName: "Assignment",
    tableName: "assignments"
});

export default Assignment;
