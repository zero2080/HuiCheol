const {DataTypes } = require("sequelize");
const bcrypt = require('bcryptjs');

const saltRounds = 10;

function User(sequelize){
    const Entity = sequelize.define("user",{
        id:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        email:{
            type: DataTypes.STRING,
            allowNull: false
        },
        password:{
            type:DataTypes.STRING,
            allowNull: true
        },
        googleId:{
            type: DataTypes.STRING,
            allowNull: true,
            unique: true,
            field: 'google_id'
        },
        kakaoId:{
            type: DataTypes.STRING,
            allowNull: true,
            unique: true,
            field: 'kakao_id'
        },
        createdAt:{
            type: DataTypes.DATE,
            field:'created_at',
            defaultValue: DataTypes.NOW
        }
    },{
        tableName:'user',
        updatedAt: false,
        hooks: {
            beforeCreate: (user) => {
                if(user.password){
                    const salt = bcrypt.genSaltSync(saltRounds);
                    user.password = bcrypt.hashSync(user.password, salt);
                }
            }
        }
    });
    Entity.prototype.validPassword = function(password) {
        return bcrypt.compareSync(password, this.password);
    }
    return Entity;
}

module.exports = User;