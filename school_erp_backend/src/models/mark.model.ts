import { DataTypes, Model, Optional } from "sequelize";
import sequelize from './../utils/db';


export interface MarkSchema{
    userId: Number;
    studentId: Number;
    subjectId: Number;
    mark: Number;
    isActive: Boolean;
}

interface MarkOmitSchema extends Optional<MarkSchema,"userId">{}

class Mark extends Model<MarkSchema,MarkOmitSchema> implements MarkSchema{
    userId!: Number;
    studentId!: Number;
    subjectId!: Number;
    mark!: Number;
    isActive!: Boolean;

}
Mark.init({
    userId:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    studentId:{
        type: DataTypes.INTEGER
    },
    subjectId:{
        type: DataTypes.INTEGER
    },
    mark:{
        type: DataTypes.INTEGER
    },
    isActive: {
        type: DataTypes.BOOLEAN
    }
},{
    sequelize,
    modelName: "Mark",
    tableName:"marks"
});
 
export default Mark;