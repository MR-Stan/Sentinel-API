

module.exports = function (sequelize, DataTypes) {
    var Sen_User = sequelize.define("Sen_User", {

        first_name: {
            type: DataTypes.STRING
        },
        last_name: {
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING,
            validate: {
                isEmail: true
            }
        },
        phone_number: {
            type: DataTypes.STRING
        },
        admin: {
            type: DataTypes.BOOLEAN,
            default: false
        },
        group: {
            type: DataTypes.BOOLEAN,
            default: false
        },
        pass: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lat: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        long: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        GroupId: {
            type: DataTypes.INTEGER
        },
        pinColor: DataTypes.STRING,
    });


    // Sen_User.associate = function (models) {
    //     Sen_User.hasMany(models.Group);
    // };

    return Sen_User;
};