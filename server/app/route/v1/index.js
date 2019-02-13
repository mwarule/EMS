const express = require('express'),
    router = express.Router();
const ROUTE_V1_PATH = APP_ROUTE_PATH + "v1/";
router.use('/employees', require(ROUTE_V1_PATH + 'employee'));
router.use('/departments', require(ROUTE_V1_PATH + 'department'));

module.exports = router;