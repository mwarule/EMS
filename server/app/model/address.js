module.exports = (sequelize, dataType) => {
    const Address = sequelize.define('address', {
        id: {
            type: dataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        country: {
            type: dataType.STRING,
            allowNull: false
        },
        state: {
            type: dataType.STRING,
            allowNull: false
        },
        city: {
            type: dataType.STRING,
            allowNull: false
        },
        area: {
            type: dataType.STRING,
            validate: {
                len: {
                    args: [5],
                    msg: 'Area should be at least 5 characters in length'
                }
            },
            allowNull: false
        },
        pincode: {
            type: dataType.INTEGER,
            validate: {
                len: {
                    args: [6, 6],
                    msg: 'Invalid pincode'
                }
            },
            allowNull: false
        }
    });

    return Address;
}