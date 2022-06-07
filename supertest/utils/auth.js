const request = require('supertest')(process.env.URL)

module.exports.getToken = async function() {
    const response = await request.post('/wp-json/jwt-auth/v1/token')
    .send({username: process.env.LOGIN, password:  process.env.PASSWORD });
    
    return response.body.data.token;
};