const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('videogame', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    released: {
      type: DataTypes.STRING
    },
    rating: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    platforms: {
      type: DataTypes.STRING,
      allowNull: false
    },
    img: {
      type: DataTypes.TEXT
    },
    createdInDb: {
      type: DataTypes.BOOLEAN, 
      allowNull: false,
      defaultValue: true
    }
  },
  {
    timestamps: false
  });
};
