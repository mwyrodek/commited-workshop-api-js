const request = require('supertest')('https://wyrodek.pl/workshop/api')
const { expect } = require('chai')

describe('Login Test', () =>{
    it('Check empty login call is returning 403 forbidden', async ()=>{
        const response = await request.post('/wp-json/jwt-auth/v1/token').send();

        expect(response.status).to.eql(403)
    })

    // incorrect mail
    // correct mail incoret passowrd
    // correct mail correct password - no permisons to use api (subscriber user type)
    // --> correct mail correct password - access to api

    it('Happy path user get token', async ()=>{
        const response = await request.post('/wp-json/jwt-auth/v1/token')
            .send({username: 'wyrodek.maciej+commited@gmail.com', password: 'D6OO8NeM!#8bC&17%x5UbS9$'});

        expect(response.status).to.eql(200)
    })
})