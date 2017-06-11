/**
 * Created by dilunika on 10/06/17.
 */

var db = require("datastore");

class VehicleOwners {

    insertVehicleOwner(vo) {

        const conn = db.conn();

        const data = {
            first_name: vo.firstName,
            last_name: vo.surname,
            nic: vo.nic,
            address: JSON.stringify(vo.address)
        };

        return conn.query('INSERT INTO vehicle_owners SET ?', data);

    }
}

module.exports = VehicleOwners;