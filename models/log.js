module.exports = (sequelize, DataTypes) => {
  const Log = sequelize.define('log', {
    date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    activity: {
      type: DataTypes.STRING,
      allowNull: false
    },
    duration: {
      type: DataTypes.STRING,
      allowNull: false
    },
    notes: {
      type: DataTypes.STRING,
      allowNull: false
    }
  })
  return Log
}