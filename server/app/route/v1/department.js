const router = require('express').Router();
const DepartmentController = require(APP_CONTROLLER_PATH + 'department');
let departmentController = new DepartmentController();
router.get('/', departmentController.findAll);
router.get('/:id', departmentController.findById);

module.exports = router;