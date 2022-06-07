const request = require('supertest')(process.env.URL)
const chai = require('chai');
const { expect } = require('chai')
const chaiExclude = require('chai-exclude');
const  auth = require('./utils/auth')

chai.use(chaiExclude);
require('dotenv').config();

describe('Creating Post', () =>{
    let token = null;

    // get login token
    before(async ()=>{
        token = await auth.getToken();

    })

    it('Create empty post', (done )=>{
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

    it('Read Post', (done )=>{
        const post = {
            id: 4119,
            slug: 'itea-morning-linki-z-tygodnia-8',
            title: {
              rendered: 'ITea Morning – Linki z Tygodnia 8',
            },
            link: 'https://wyrodek.pl/workshop/api/itea-morning-linki-z-tygodnia-8/',
            author: 1,
            featured_media: 0,
            comment_status: 'open',
            ping_status: 'open',
            sticky: false,
            template: '',
            format: 'standard',
            status: 'publish',
            type: 'post',
          };
          const propToExclude = ['content', 'excerpt', 'meta', 'categories',
          'tags', 'yoast_head', 'jetpack_featured_media_url', '_links', 'date', 'date_gmt', 'guid', 'modified', 'modified_gmt'];

          request.get(`/wp-json/wp/v2/posts/${post.id}`)
            .set('Authorization', `Bearer ${token}`)
            .expect(200)
            .then((response)=>{
                expect(response.body).excluding(propToExclude).to.deep.equal(post);
                done();
            })
            .catch((err) => done(err));
    })
})