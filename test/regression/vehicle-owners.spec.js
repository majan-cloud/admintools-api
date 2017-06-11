/**
 * Created by dilunika on 10/06/17.
 */
const request = require('supertest')('http://localhost:3001');
const assert  = require('chai').assert;

describe('Vehicle Owner API', () => {

    it('Register Vehicle Owner', (done) => {

        const vehicleOwner = {
            firstName: 'Amal',
            surname: 'Silva',
            nic: '833434434333V',
            address: {
                street: '20, Main Mawatha, Mathara',
                city: 'Mathara',
                postalCode: 10290
            }
        };

        request.post('/vehicle-owners')
            .send(vehicleOwner)
            .expect(201)
            .expect((res) => {
                const payload = res.body;
                assert.property(payload, '_links');
                assert.property(payload, 'vehicleOwner');
            })
            .end(done)
    });
});