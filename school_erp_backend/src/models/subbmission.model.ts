import { DataTypes, Model, Optional } from "sequelize";
import sequelize from './../utils/db';

export interface SubmissionSchema {
    userId: number;
    submissionId: number;
    date: string;
    assignmentId: number;
    isActive: boolean;
}

// Optional type for omitting submissionId
interface SubmissionOmitSchema extends Optional<SubmissionSchema, "submissionId"> {}

class Submission extends Model<SubmissionSchema, SubmissionOmitSchema> implements SubmissionSchema {
    userId!: number;
    submissionId!: number;
    date!: string;
    assignmentId!: number;
    isActive!: boolean;
}

Submission.init({
    userId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    submissionId: {
        type: DataTypes.INTEGER,
    },
    date: {
        type: DataTypes.TEXT,
    },
    assignmentId: {
        type: DataTypes.INTEGER,
    },

    isActive: {
        type: DataTypes.BOOLEAN
    }
}, {
    sequelize,
    modelName: "Submission",
    tableName: "submission"
});

export default Submission;
