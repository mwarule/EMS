const BaseController = require(APP_CONTROLLER_PATH + 'base');
const DepartmentHandler = require(APP_HANDLER_PATH + 'department');

class DepartmentController extends BaseController {
    constructor() {
        super();
        this._departmentHandler = new DepartmentHandler();
    }

    findAll(req, res, next) {
        this._departmentHandler.findAll(req, this._responseManager.getDefaultResponseHandler(res));
    }

    findById(req, res, next) {
        this._departmentHandler.findById(req, this._responseManager.getDefaultResponseHandler(res));
    }

}

module.exports = DepartmentController;