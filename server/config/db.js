const env = require('./env');

const Sequelize = require('sequelize');
const EmployeeModel = require('../app/model/employee');
const DepartmentModel = require('../app/model/department');
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

const EmployeeDepartment = sequelize.define('employee_department', {})
const Employee = EmployeeModel(sequelize, Sequelize);
const Department = DepartmentModel(sequelize, Sequelize);

Employee.belongsToMany(Department, { through: EmployeeDepartment })
Department.belongsToMany(Employee, { through: EmployeeDepartment })


// force: true will drop the table if it already exists
sequelize.sync({ force: false }).then(() => {
  console.log('Drop and Resync with { force: false }');
  var departments = [
    {
      'name': 'Software Development'
    }, {
      'name': 'Networking'
    }, {
      'name': 'Certifications'
    }
  ];
  Department.bulkCreate(departments, { returning: true })
    .then(data => {
      console.log('Departments added successfully!');
    })
    .catch(error => {
      console.log('Departments already exists in the table!');
    });
});

module.exports = { Employee, Department }