module.exports = function (sequelize, DataTypes) {
  const Member = sequelize.define("member", {
    id: {
      type: DataTypes.NUMBER,
      primaryKey: true,
      comment: "ID",
    },
    username: {
      type: DataTypes.STRING(255),
      unique: true,
    },
    password: {
      type: DataTypes.STRING(60),
    },
    nickname: {
      type: DataTypes.STRING(255),
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
    },
  });

  return Member;
};
