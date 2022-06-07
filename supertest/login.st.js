const request = require('supertest')(process.env.URL)
const { expect } = require('chai')

require('dotenv').config();

describe('Login Test', () =>{
    it('Check empty login call is returning 403 forbidden', async ()=>{
        console.log(process.env.LOGIN)
        const response = await request.post('/wp-json/jwt-auth/v1/token').send();

        expect(response.status).to.eql(403)
    })

    // incorrect mail
    // correct mail incoret passowrd
    // correct mail correct password - no permisons to use api (subscriber user type)
    // --> correct mail correct password - access to api

    it('Happy path user get token', async ()=>{
        const response = await request.post('/wp-json/jwt-auth/v1/token')
            .send({username: process.env.LOGIN, password:  process.env.PASSWORD });

        expect(response.status).to.eql(200)
    })
})