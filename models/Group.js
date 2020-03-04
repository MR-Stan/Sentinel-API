

module.exports = function (sequelize, DataTypes) {

    var Group = sequelize.define("Group", {
        name: {
            type: DataTypes.STRING,
        },
        wayPoint: {
            type: DataTypes.STRING,
        },
        lat: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        long: {
            type: DataTypes.STRING,
            allowNull: true,
        }
    });

    Group.associate = function (models) {
        Group.hasMany(models.Sen_User);
    };

    return Group;
};