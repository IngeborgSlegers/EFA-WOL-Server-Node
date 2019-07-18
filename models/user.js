module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    firstName: {
      type: DataTypes.STRING,
      allonNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allonNull: false
    },
    email: {
      type: DataTypes.STRING,
      allonNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allonNull: false
    }
  })
  return User
}