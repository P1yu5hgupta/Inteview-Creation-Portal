const express = require( 'express');
const find = require( './controller/find.controller');
const create = require( './controller/create.controller');

const router = express.Router()

router.route('/getAllSchedule').get(find);
router.route('/create').post(create);
router.route('/update').put(find);


module.exports =router;