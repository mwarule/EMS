const router = require('express').Router();
const EmployeeController = require(APP_CONTROLLER_PATH + 'employee');
let employeeController = new EmployeeController();
router.post('/', employeeController.create);
router.get('/', employeeController.findAll);

module.exports = router;