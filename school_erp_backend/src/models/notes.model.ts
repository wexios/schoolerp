import { DataTypes, Model, Optional } from "sequelize";
import sequelize from './../utils/db';

export interface NotesSchema {
    notesId: number;
    subjectId: number;
    notesName: string;
    batchId: number;
    userId: number;
    noteFile: string;
    isActive: boolean;
}

// Optional type for omitting notesId
interface NotesOmitSchema extends Optional<NotesSchema, "notesId"> {}

class Notes extends Model<NotesSchema, NotesOmitSchema> implements NotesSchema {
    notesId!: number;
    subjectId!: number;
    notesName!: string;
    batchId!: number;
    userId!: number;
    noteFile!: string;
    isActive!: boolean;
}

Notes.init({
    notesId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    subjectId: {
        type: DataTypes.INTEGER,
    },
    notesName: {
        type: DataTypes.TEXT,
    },
    batchId: {
        type: DataTypes.INTEGER,
    },
    userId:{
        type: DataTypes.INTEGER,
    },
    noteFile:{
        type: DataTypes.TEXT,
    },
    isActive: {
        type: DataTypes.BOOLEAN
    }
}, {
    sequelize,
    modelName: "Note",
    tableName: "notes"
});

export default Notes;
