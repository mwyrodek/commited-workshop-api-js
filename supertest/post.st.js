const request = require('supertest')(process.env.URL)
const { expect } = require('chai')
const  auth = require('./utils/auth')

require('dotenv').config();

describe('Creating Post', () =>{
    let token = null;

    // get login token
    before(async ()=>{
        token = await auth.getToken();

    })

    it('Create empty post', async ()=>{
        console.log(token)
    })
})