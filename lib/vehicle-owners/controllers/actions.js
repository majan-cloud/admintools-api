/* jshint -W079 */
const Promise = require('bluebird')
    , config = require('config')
    , logger = require('metalogger')()
    , representor = require('representor-serializer')
    , _ = require('lodash');

let actions = {}
    , VehicleOwners = require("vehicle-owners/models/vehicle-owners")
    , model = new VehicleOwners();

const responseMediaType = 'application/hal+json';

actions.register =  (req, res, next) => {

    const vo = req.body;

    logger.info('Register Vehicle Owner Req : ', vo);

    model.insertVehicleOwner(vo)
            .then(results => respondWithRegisteredVehicleOwner(results, vo, res))
            .catch(err => next(err));
};

function respondWithRegisteredVehicleOwner (results, vo, res) {

    const vehicleOwner = Object.assign({}, vo, {id: results.insertId});
    const href = '/vehicle-owners/' + results.insertId;

    let response = {
        data: {
            vehicleOwner
        },
        actions: [
            {
                href,
                name: "self"
            }
        ]
    };

    response = representor(response, responseMediaType);

    res.set('Content-Type', responseMediaType)
        .status(201)
        .send(response);
};


module.exports = actions;