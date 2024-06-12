import { DataTypes, Model, Optional } from "sequelize";
import sequelize from './../utils/db';


export interface BatchSchema{
    batchIId: Number;
    batchName: String;
    batchStart: String;
    batchEnd: String;
    isActive: Boolean;
}

interface BatchOmitSchema extends Optional<BatchSchema,"batchIId">{}

class Batch extends Model<BatchSchema,BatchOmitSchema> implements BatchSchema{
    batchIId!: Number;
    batchName!: String;
    batchStart!:String;
    batchEnd!: String;
    isActive!: Boolean;

}
Batch.init({
    batchIId:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    batchName:{
        type: DataTypes.TEXT
    },
    batchStart:{
        type: DataTypes.TEXT
    },
    batchEnd:{
        type: DataTypes.TEXT
    },
    isActive: {
        type: DataTypes.BOOLEAN
    }
},{
    sequelize,
    modelName: "Batch",
    tableName:"batchs"
});
 
export default Batch;