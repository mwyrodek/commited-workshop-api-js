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

    it('Create empty post', async (done )=>{
        request.post('/wp-json/wp/v2/posts')
            .set('Authorization', `Bearer ${token}`)
            .send({
                title: 'test-fromapi-commited'
            })
            .expect(201)
            .then((response)=>{
                expect(response.body.status).to.equal('draft');
                expect(response.body.title.raw).to.equal('test-fromapi-commited');

                done();
            })
            .catch((err) => done(err));
    })
})