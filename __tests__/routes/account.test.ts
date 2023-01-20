import request from "supertest"

import app from "../../src/index"

describe('Account routes', () => {
    it('Get All - respond with a json message', (done) => {
        request(app)
            .get('/account')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, {
                "1": {
                    "account_number": "01",
                    "agency": "01",
                    "balance": 0,
                    "client": {
                        "name": "Paulo",
                        "lastName": "Jefferson Mendes Oliveira",
                        "cpf": "000.000.000-00"
                    },
                    "id": 1
                },
                "2": {
                    "account_number": "02",
                    "agency": "01",
                    "balance": 0,
                    "client": {
                        "name": "José",
                        "lastName": "Medeiros",
                        "cpf": "100.000.000-00"
                    },
                    "id": 2
                }
            }, done)
    });

    let id: number;
    it('Create Account - respond with an inserted object', async () =>
        request(app)
            .post('/account')
            .set('Accept', 'application/json')
            .send({
                "account_number": "03",
                "agency": "01",
                "name": "Paulo",
                "lastName": "Jefferson Mendes Oliveira",
                "cpf": "300.000.000-00"
            })
            .expect('Content-Type', /json/)
            .expect(201)
            .then((response) => {
                //Account test
                expect(response.body).toHaveProperty('id')
                id = response.body.id
                expect(response.body).toHaveProperty('client')
                expect(response.body.account_number).toBe("03")
                expect(response.body.agency).toBe("01")
                //Client test
                expect(response.body.client.name).toBe("Paulo")
                expect(response.body.client.lastName).toBe("Jefferson Mendes Oliveira")
                expect(response.body.client.cpf).toBe("300.000.000-00")
            }),
    );

    it('Get One - respond with an json', async () =>
        request(app)
            .get(`/account/${id}`)
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(200)
            .then((response) => {
                //Account test
                expect(response.body).toHaveProperty('id')
                expect(response.body).toHaveProperty('client')
                expect(response.body.account_number).toBe("03")
                expect(response.body.agency).toBe("01")
                //Client test
                expect(response.body.client.name).toBe("Paulo")
                expect(response.body.client.lastName).toBe("Jefferson Mendes Oliveira")
                expect(response.body.client.cpf).toBe("300.000.000-00")
            })
    );

    it('Get One - responds with invalid ObjectId error', (done) => {
        request(app)
        .get('/account/52151')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(404, done)
    })
})