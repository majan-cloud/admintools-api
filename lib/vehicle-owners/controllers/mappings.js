var router      = require('express').Router({ mergeParams: true });
var actions     = require('./actions');

router.post('/', actions.register);

module.exports = router;