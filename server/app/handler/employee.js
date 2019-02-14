const AlreadyExistsError = require(APP_ERROR_PATH + 'already-exists');
const ValidationError = require(APP_ERROR_PATH + 'validation');
const Sequelize = require('sequelize');
const { Employee, Address, Department } = require('../../config/db');

class EmployeeHandler {
    constructor() {}

    findAll(req, callback) {
        Employee.findAll()
            .then((employees) => {
                callback.onSuccess(employees);
            })
            .catch((error) => {
                callback.onError(error);
            });
    }

    findById(req, callback) {
        const id = req.params.id;
        Employee.findById(id, {
                attributes: ['firstName', 'lastName', 'gender', 'dob', 'email', 'mobile',
                    'designation', 'primarySkill'
                ],
                include: [{
                        model: Department,
                        attributes: ['id', 'name']
                    },
                    {
                        model: Address,
                        attributes: ['country', 'state', 'city', 'area', 'pincode']
                    }
                ]
            })
            .then((employee) => {
                callback.onSuccess(employee);
            })
            .catch((error) => {
                callback.onError(error);
            });
    }

    create(req, callback) {
        let data = req.body;
        Employee.create({
                firstName: data.firstName,
                lastName: data.lastName,
                gender: data.gender,
                dob: data.dob,
                email: data.email,
                mobile: data.mobile,
                designation: data.designation,
                primarySkill: data.primarySkill,
                addresses: data.address
            }, {
                include: [Employee.Addresses],
            })
            .then((emp) => {
                return emp.setDepartments(data.department);
            })
            .then((data) => {
                callback.onSuccess(null, 'Employee created successfully');
            })
            .catch(Sequelize.ValidationError, function(error) {
                let errorMessages = error.errors.map(function(elem) {
                    return elem.message;
                });
                throw new ValidationError('There have been validation errors: ' + errorMessages.join(' && '));
            })
            .catch((error) => {
                callback.onError(error);
            });
    }

    update(req, callback) {
        let id = req.params.id;
        let data = req.body;
        Employee.update({
                firstName: data.firstName,
                lastName: data.lastName,
                gender: data.gender,
                dob: data.dob,
                email: data.email,
                mobile: data.mobile,
                designation: data.designation,
                primarySkill: data.primarySkill,
                addresses: data.address
            }, {
                where: { id: id }
            }, {
                include: [Employee.Addresses]
            })
            .then((saved) => {
                callback.onSuccess(null, 'Employee updated successfully');
            })
            .catch((error) => {
                callback.onError(error);
            });
    }

    delete(req, callback) {
        const id = req.params.id;
        Employee.destroy({
                where: { id: id }
            })
            .then((saved) => {
                callback.onSuccess(saved);
            })
            .catch((error) => {
                callback.onError(error);
            });
    }
}

module.exports = EmployeeHandler;