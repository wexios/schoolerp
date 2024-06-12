import { DataTypes, Model, Optional } from "sequelize";
import sequelize from './../utils/db';
import bcrypt from 'bcryptjs';
import logger from "../utils/logger";

export interface UserSchema{
    userId: Number;
    username: String;
    password: string;
    profilePic: String;
    email:String;
    firstName:String;
    lastname:String;
    mobileNo:string;
    address:String;
    isActive: Boolean;
}

interface UserOmitSchema extends Optional<UserSchema,"userId">{}

class User extends Model<UserSchema, UserOmitSchema> implements UserSchema {
    userId!: number;
    username!: string;
    password!: string ; // Ensure it's a primitive string, not String
    profilePic!: string;
    email!: string;
    firstName!: string;
    lastname!: string;
    mobileNo!: string;
    address!: string;
    isActive!: boolean;

    // Method to compare password
    async comparePassword(candidatePassword: string): Promise<boolean> {
        return bcrypt.compare(candidatePassword, this.password);
    }
}
User.init({
    userId:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    username:{
        type: DataTypes.TEXT,
    },
    password:{
        type: DataTypes.TEXT,
        allowNull: false
    },
    profilePic:{
        type: DataTypes.TEXT,
    },
    email:{
        type:DataTypes.TEXT,
    },
    firstName:{
        type:DataTypes.TEXT,
    },
    lastname:{
        type:DataTypes.TEXT,
    },
    mobileNo:{
        type:DataTypes.STRING,
    },
    address:{
        type:DataTypes.TEXT,
    },
    isActive: {
        type: DataTypes.BOOLEAN,
    }
},{
    sequelize,
    modelName: "User",
    tableName:"users",
 
});
User.beforeCreate(async (user, options) => {
    return bcrypt
      .hash(user.password, 10)           // Hash the user's password with a salt factor of 10
      .then((hash) => {
        user.password = hash;            // Update the user's password with the hashed value
      })
      .catch((err) => {
        throw new Error();             // Throw an error if hashing fails
      });
  });
  
  // Define a hook to hash the user's password before updating the user
  User.beforeUpdate(async (user, options) => {
    logger.info(user);                 // Log user information
    if (user.password) {
      return bcrypt
        .hash(user.password, 10)         // Hash the user's password with a salt factor of 10
        .then((hash) => {
          user.password = hash;          // Update the user's password with the hashed value
        })
        .catch((err) => {
          throw new Error();           // Throw an error if hashing fails
        });
    }
  });
 
export default User;
