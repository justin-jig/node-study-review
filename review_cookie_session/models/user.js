


const UserModels = (sequelize, DataTypes) => {

    const model = sequelize.define('users', {

        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement : true,
            primaryKey: true
        },
        userid: {
            type: DataTypes.STRING(20),
            allowNull: false
        },
        pw: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        salt : {
            type:DataTypes.STRING(255),
            allowNull: false
        },
        name: {
            type: DataTypes.STRING(30),
            allowNull: false,
            defaultValue : 'name' // 기본값
        }
    });

    return model
}
module.exports = UserModels;
