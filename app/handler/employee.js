const AlreadyExistsError = require(APP_ERROR_PATH + 'already-exists');
const ValidationError = require(APP_ERROR_PATH + 'validation');
const Sequelize = require('sequelize');
const { Employee, Department } = require('../../config/db');

class EmployeeHandler {
    constructor() {
    }

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
        Employee.findById(id)
            .then((employee) => {
                callback.onSuccess(employee);
            })
            .catch((error) => {
                callback.onError(error);
            });
    }

    create(req, callback) {
        let data = req.body;
        let employee = null;
        Employee.create({
            firstName: data.firstName,
            lastName: data.lastName,
            gender: data.gender,
            dob: data.dob,
            email: data.email,
            mobile: data.mobile
        })
            .then((emp) => {
                employee = emp;
                return emp.setDepartments([data.department]);
            })
            .then((data) => {
                callback.onSuccess(employee);
            })
            .catch(Sequelize.ValidationError, function (error) {
                let errorMessages = error.errors.map(function (elem) {
                    return elem.message;
                });
                throw new ValidationError('There have been validation errors: ' + errorMessages.join(' && '));
            })
            .catch((error) => {
                callback.onError(error);
            });
    }

    update(req, callback) {
        const id = req.params.id;
        Employee.update({
            firstName: req.body.firstname,
            lastName: req.body.lastname,
            gender: req.body.gender,
            dob: req.body.dob,
            email: req.body.email,
            mobile: req.body.mobile
        },
            { where: { id: id } })
            .then((saved) => {
                callback.onSuccess(saved);
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