const express = require( 'express');
const find = require( './controller/find.controller');
const create = require( './controller/create.controller');
const update = require( './controller/update.controller');
const del = require( './controller/delete.controller');

const router = express.Router()

router.route('/getAllSchedule').get(find);
router.route('/create').post(create);
router.route('/update').post(update);
router.route('/delete').post(del);

module.exports =router;