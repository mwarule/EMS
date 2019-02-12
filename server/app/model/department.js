module.exports = (sequelize, dataType) => {
    const Department = sequelize.define('department', {
        id: {
            type: dataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: dataType.STRING,
            unique: true
        }
    });

    return Department;
}