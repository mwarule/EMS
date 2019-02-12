const BaseController = require(APP_CONTROLLER_PATH + 'base');
const EmployeeHandler = require(APP_HANDLER_PATH + 'employee');

class EmployeeController extends BaseController {
    constructor() {
        super();
        this._employeeHandler = new EmployeeHandler();
    }

    create(req, res, next) {
        this._employeeHandler.create(req, this._responseManager.getDefaultResponseHandler(res));
    }

    findAll(req, res, next) {
        this._employeeHandler.findAll(req, this._responseManager.getDefaultResponseHandler(res));
    }

    findById(req, res, next) {
        this._employeeHandler.findById(req, this._responseManager.getDefaultResponseHandler(res));
    }


    update(req, res, next) {
        this._employeeHandler.update(req, this._responseManager.getDefaultResponseHandler(res));
    }


    delete(req, res, next) {
        this._employeeHandler.delete(req, this._responseManager.getDefaultResponseHandler(res));
    }

}

module.exports = EmployeeController;