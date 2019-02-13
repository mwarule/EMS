const AlreadyExistsError = require(APP_ERROR_PATH + 'already-exists');
const ValidationError = require(APP_ERROR_PATH + 'validation');
const Sequelize = require('sequelize');
const { Employee, Department } = require('../../config/db');

class DepartmentHandler {
    constructor() {}

    findAll(req, callback) {
        Department.findAll()
            .then((employees) => {
                callback.onSuccess(employees);
            })
            .catch((error) => {
                callback.onError(error);
            });
    }

    findById(req, callback) {
        const id = req.params.id;
        Department.findById(id)
            .then((employee) => {
                callback.onSuccess(employee);
            })
            .catch((error) => {
                callback.onError(error);
            });
    }
}

module.exports = DepartmentHandler;