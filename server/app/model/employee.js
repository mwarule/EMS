module.exports = (sequelize, dataType) => {
    const Employee = sequelize.define('employee', {
        id: {
            type: dataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        firstName: {
            type: dataType.STRING,
            validate:{
                len:{
                    args: [3,20],
                    msg:'First Name must be between 3 and 20 characters in length'
                }
            }
        },
        lastName: {
            type: dataType.STRING,
            validate:{
                len:{
                    args: [3,20],
                    msg:'Last Name must be between 3 and 20 characters in length'
                }
            }
        },
        gender: {
            type: dataType.STRING
        },
        dob: {
            type: dataType.DATE
        },
        email: {
            type: dataType.STRING,
            unique: {
                args: true,
                msg:'Email address already in use!'
            },
            allowNull: false
        },
        mobile: {
            type: dataType.STRING,
            allowNull: false,
            unique: {
                args: true,
                msg:'Mobile number already in use!'
            },
        }
    });

    return Employee;
}