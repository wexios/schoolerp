import { DataTypes, Model, Optional } from "sequelize";
import sequelize from './../utils/db';
import Subject from './subject.model';


export interface AttentenceSchema{
    attentenceId: Number;
    studentId: Number;
    date: string;
    techerId: number;
    subjectId: Number;
    isPresent: Boolean;
}

interface AttentenceOmitSchema extends Optional<AttentenceSchema,"attentenceId">{}

class Attentence extends Model<AttentenceSchema,AttentenceOmitSchema> implements AttentenceSchema{
    attentenceId!: Number;
    studentId!: Number;
    date!: string;
    techerId!: number;
    subjectId!: Number;
    isPresent!: Boolean;

}
Attentence.init({
    attentenceId:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    studentId:{
        type: DataTypes.INTEGER,
    
    },
    date:{
        type: DataTypes.TEXT
    },
    techerId:{
        type: DataTypes.INTEGER,
    },
    subjectId:{
        type:DataTypes.INTEGER,
        
    },
    isPresent: {
        type: DataTypes.BOOLEAN,
    }
},{
    sequelize,
    modelName: "Attentence",
    tableName:"attentences"
});
 
export default Attentence;