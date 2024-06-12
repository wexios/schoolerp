import { DataTypes, Model, Optional } from "sequelize";
import sequelize from './../utils/db';


export interface SubjectSchema{
    subjectIId: Number;
    subjectName: String;
    isActive: Boolean;
}

interface SubjectOmitSchema extends Optional<SubjectSchema,"subjectIId">{}

class Subject extends Model<SubjectSchema,SubjectOmitSchema> implements SubjectSchema{
    subjectIId!: Number;
    subjectName!: String;
    isActive!: Boolean;

}
Subject.init({
    subjectIId:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    subjectName:{
        type: DataTypes.TEXT
    },
    isActive: {
        type: DataTypes.BOOLEAN
    }
},{
    sequelize,
    modelName: "Subject",
    tableName:"subjects"
});
 
export default Subject;