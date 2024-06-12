import { DataTypes, Model, Optional } from "sequelize";
import sequelize from './../utils/db';


export interface subjecttobatchSchema{
    subjectId: Number;
    userId: Number;
    batchId: String;
    subjecttToBatchId: Number;
    from:String;
    to:String;
    sem:string;
    status: Boolean;
}

interface subjecttobatchOmitSchema extends Optional<subjecttobatchSchema,"subjecttToBatchId">{}

class SubjectToBatch extends Model<subjecttobatchSchema,subjecttobatchOmitSchema> implements subjecttobatchSchema{
    subjecttToBatchId!: Number;
    subjectId!: Number;
    userId!: Number;
    batchId!: String;
    SubjecttobatchId!: Number;
    from!:String;
    to!:String;
    sem!:string;
    status!: Boolean;

}
SubjectToBatch.init({
    subjectId:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    userId:{
        type: DataTypes.INTEGER,
    },
    batchId:{
        type: DataTypes.INTEGER,
    },
    subjecttToBatchId:{
        type: DataTypes.TEXT
    },
    to:{
        type: DataTypes.TEXT
    },
    sem:{
        type: DataTypes.TEXT
    },
    from:{
        type: DataTypes.TEXT
    },
    status: {
        type: DataTypes.BOOLEAN
    }
},{
    sequelize,
    modelName: "Subjecttobatch",
    tableName:"subjecttobatchs"
});
 
export default SubjectToBatch;