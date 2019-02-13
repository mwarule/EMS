const env = require('./env');

const Sequelize = require('sequelize');
const EmployeeModel = require('../app/model/employee');
const DepartmentModel = require('../app/model/department');
const AddressModel = require('../app/model/address');
const sequelize = new Sequelize(env.database, env.username, env.password, {
    host: env.host,
    dialect: env.dialect,
    operatorsAliases: false,

    pool: {
        max: env.max,
        min: env.pool.min,
        acquire: env.pool.acquire,
        idle: env.pool.idle
    }
});

sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

// force: true will drop the tables if it already exists
sequelize.sync({
    force: true
}).then(() => {
    console.log('Drop and Resync with { force: false }');
    var departments = [{
        'name': 'Software Development'
    }, {
        'name': 'Networking'
    }, {
        'name': 'Certifications'
    }];
    Department.bulkCreate(departments, {
            returning: true
        })
        .then(data => {
            console.log('Departments added successfully!');
        })
        .catch(error => {
            console.log('Departments already exists in the table!');
        });
});

const EmployeeDepartment = sequelize.define('employee_department', {})
const Employee = EmployeeModel(sequelize, Sequelize);
const Department = DepartmentModel(sequelize, Sequelize);
const Address = AddressModel(sequelize, Sequelize);

Employee.Departments = Employee.belongsToMany(Department, {
    through: EmployeeDepartment
})
Department.Employees = Department.belongsToMany(Employee, {
    through: EmployeeDepartment
})

Employee.Addresses = Employee.hasMany(Address);

module.exports = {
    Employee,
    Department,
    Address
}