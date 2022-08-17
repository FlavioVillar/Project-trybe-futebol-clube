import { Model, INTEGER, STRING } from 'sequelize';
import db from '.';

class UsersModel extends Model {
  declare id: number;
  declare name: string;
  declare email: string;
  declare password: string;
}

UsersModel.init(
  {
    id: {
      type: INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: STRING,
      allowNull: false,
    },
    role: {
      type: STRING,
      allowNull: false,
    },
    email: {
      type: STRING,
      allowNull: false,
    },
    password: {
      type: STRING,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    modelName: 'users',
    timestamps: false,
    underscored: true,
  },
);

export default UsersModel;
