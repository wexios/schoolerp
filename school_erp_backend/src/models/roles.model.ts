import { DataTypes, Model, Optional } from "sequelize";
import sequelize from './../utils/db';


export interface RolesSchema{
    rollId: Number;
    rollName: String;
    rollstatus: Boolean;
}

interface RolesOmitSchema extends Optional<RolesSchema,"rollId">{}

class Roles extends Model<RolesSchema,RolesOmitSchema> implements RolesSchema{
    rollId!: Number;
    rollName!: String;
    rollstatus!: Boolean;

}
Roles.init({
    rollId:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    rollName:{
        type: DataTypes.TEXT
    },
    rollstatus: {
        type: DataTypes.BOOLEAN
    }
},{
    sequelize,
    modelName: "Roles",
    tableName:"roles"
});
 
export default Roles;