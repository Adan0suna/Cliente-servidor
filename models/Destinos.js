const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Destino = sequelize.define('Destino', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  nombre: { type: DataTypes.STRING, allowNull: false },
  tipo: { type: DataTypes.ENUM('turistico', 'hospedaje', 'comida'), allowNull: false },
  ubicacion: { type: DataTypes.STRING, allowNull: false },
  descripcion: { type: DataTypes.TEXT },
  latitud: { type: DataTypes.FLOAT }, // Para mapas
  longitud: { type: DataTypes.FLOAT }
});

module.exports = Destino;