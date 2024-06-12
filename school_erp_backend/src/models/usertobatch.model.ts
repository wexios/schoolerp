import { DataTypes, Model, Optional } from "sequelize";
import sequelize from '../utils/db';
import Subject from './subject.model';


export interface UsertobatchSchema{
    usertobatchId: Number;
    userId: Number;
    batchId:Number;
    from: String;
    to:String;
    sem:String;
    roll:string;
    status: Boolean;
}

interface UsertobatchOmitSchema extends Optional<UsertobatchSchema,"usertobatchId">{}

class Usertobatch extends Model<UsertobatchSchema,UsertobatchOmitSchema> implements UsertobatchSchema{
    usertobatchId!: Number;
    userId!: Number;
    batchId!:Number;
    from!: String;
    to!:String;
    sem!:String;
    roll!:string;
    status!: Boolean;

}
Usertobatch.init({
    usertobatchId:{
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
    from:{
        type: DataTypes.TEXT,
    },
    to:{
        type:DataTypes.TEXT,
        
    },
    sem:{
        type:DataTypes.TEXT,
    },
    roll:{
        type:DataTypes.TEXT,
    },
    status: {
        type: DataTypes.BOOLEAN,
    }
},{
    sequelize,
    modelName: "Usertobatch",
    tableName:"usertobatchs"
});
 
export default Usertobatch;