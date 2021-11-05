const db = require('../db/connection.js');
const testData = require('../db/data/test-data/index.js');
const  seed  = require('../db/seeds/seed.js');
const app = require('../app');
const request = require('supertest');
const categories = require('../db/data/test-data/categories.js');
const { get } = require('superagent');



afterAll(() => db.end());
beforeEach(() => seed(testData));


describe('Building End point testing for both happy and sad path', function () {

    describe('Status: 200 GET api/categories. Happy Path', function () {
        test('STATUS: 200, returns array with categories objects inside', function () {
            return request(app)
            .get('/api/categories')
            .expect(200)
            .then(({body}) => {
                expect(Array.isArray(body)).toBe(true);
                expect(body.length).toBe(4);
                body.forEach(object => {
                    expect(object).toEqual(
                        expect.objectContaining({
                            slug: expect.any(String),
                            description: expect.any(String)
                        })
                    )
                })
            });
            
        })
    })

    describe('Status: 404, invalid path', function () {
        
        test('Status: 404, invalid path', function () {
        return request(app)
        .get('/api/bad_path_request')
        .expect(404)
        .then(({body}) => {
            expect(body.msg).toBe('Invalid path')
        })
        })
        
    })

    describe('Status:200, GET api/reviews/:review_id, uses get method with a parametric end point to pick individual reviews', function () {
        
        test('Status:200, GET api/reviews/:review_id, uses get method with a parametric end point to pick individual reviews', function () {
            return request(app)
            .get('/api/reviews/1')
            .expect(200)
            .then(({body}) => {
                const {data} = body;
                console.log
                expect(Array.isArray(data)).toBe(true);
                expect(data.length).toBe(1);
                expect(data[0]).toEqual(
                        {   
                            review_id: expect.any(Number),
                            title: expect.any(String),
                            designer: expect.any(String),
                            owner: expect.any(String),
                            review_img_url: expect.any(String),
                            review_body: expect.any(String),
                            category: expect.any(String),
                            created_at: expect.any(String),
                            votes: expect.any(Number),
                            comment_count: expect.any(String)
                        })
                    
                })
            });
        })

        
    describe('Errors for GET api/reviews/:review_id', function () {

        test('Status:400, invalid team_id i.e "hello', function () {
            return request(app)
            .get('/api/reviews/hello')
            .expect(400)
            .then(({body}) => {
                expect(body.msg).toBe("Invalid request");
            })

        })

        test('Status: 404 Invalid team_id, correct data type but not a valid option, i.e team_id = 500', function () {
            return request(app)
            .get('/api/reviews/9999')
            .expect(404)
            .then(({body}) => {
                expect(body.msg).toBe("Incorrect request")
            })
        })
    })

    describe('Status:202 , PATCH api/reviews/:review_id updates a review with the relevant data', function () {
        test('Status: 202 PATCH /api/reviews/:review_id to patching an object', function () {
            
            const data = {updated_votes: 20}
            return request(app)
            .patch('/api/reviews/2')
            .send(data)
            .expect(202)
            .then(({body})=> {
                const result = {
                    title: 'Jenga',
                    designer: 'Leslie Scott',
                    owner: 'philippaclaire9',
                    review_img_url:
                    'https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png',
                    review_body: 'Fiddly fun for all the family',
                    category: 'dexterity',
                    created_at: expect.any(String),
                    votes: 25,
                    review_id: 2
                    }

                   const {rows} = body

                expect(rows[0]).toEqual(result);
            })
        })
            
    })

    describe('Status:404, Errors for PATCH /api/reviews/:review_id', function () {
        test('Status: 404, tries to use a different key name than updated_votes, will throw a custom error', function () {

            const data = {chocolateCake: 20}
            return request(app)
            .patch('/api/reviews/2')
            .send(data)
            .expect(404)
            .then(({body}) => {
                expect(body.msg).toBe('Invalid update')
            })
        })
    
        test('Status: 404, tries to use a different data type on the key name updated_votes, will throw a custom error', function () {

            const data = {updated_votes: 'tequila'}
            return request(app)
            .patch('/api/reviews/2')
            .send(data)
            .expect(404)
            .then(({body}) => {
                expect(body.msg).toBe('Invalid update')
            })
        })
    
        test('Status: 404, tries to use a different data type on the key name updated_votes, will throw a custom error', function () {

            const data = {updated_votes: 50}
            return request(app)
            .patch('/api/reviews/500')
            .send(data)
            .expect(404)
            .then(({body}) => {
                expect(body.msg).toBe('Invalid update')
            })
        })
    
    })

    describe('Status 200: GET /api/reviews retrieves all reviews from review table. Then filters through them with queries', function (){
        
        test('Status 200: GET /api/reviews retrieves all reviews from review table.', function () {
            return request(app)
            .get('/api/reviews')
            .expect(200)
            .then(({body}) => {
                const {data} = body;
                expect(Array.isArray(data)).toBe(true);
                expect(data.length).toBe(13);
                body.data.forEach(object => {
                    expect(object).toEqual(
                        expect.objectContaining({
                            review_id: expect.any(Number),
                            title: expect.any(String),
                            designer: expect.any(String),
                            owner: expect.any(String),
                            review_img_url: expect.any(String),
                            review_body: expect.any(String),
                            category: expect.any(String),
                            created_at: expect.any(String),
                            votes: expect.any(Number),
                            comment_count: expect.any(String)})
                    )
                })        
            })
        })

        describe('Sort by query', function () {
            test('Status 200: Get /api/reviews?sort_by=owner', function () {
            return request(app)
            .get('/api/reviews?sort_by=owner')
            .expect(200)
            .then(({body}) => {
                const {data} = body;
                expect(Array.isArray(data)).toBe(true);
                expect(data.length).toBe(13);
                expect(data).toBeSortedBy('owner', { descending: true })
                body.data.forEach(object => {
                    expect(object).toEqual(
                        expect.objectContaining({
                            review_id: expect.any(Number),
                            title: expect.any(String),
                            designer: expect.any(String),
                            owner: expect.any(String),
                            review_img_url: expect.any(String),
                            review_body: expect.any(String),
                            category: expect.any(String),
                            created_at: expect.any(String),
                            votes: expect.any(Number),
                            comment_count: expect.any(String)
                        })
                    )
                   })
                })               
        })

        test('Status 400: Get /api/reviews?sort_by=droptable tries to inject an incorrect value into sort_by query', function () {
            return request(app)
            .get('/api/reviews?sort_by=droptable')
            .expect(400)
            .then(({body}) => {
                expect(body.msg).toBe('Incorrect option');
                })               
        })
        })
        
        describe('sort by order', function () {

            test('Status:200, GET /api/reviews?sort_by=owners&&order=ASC', function () {
                return request(app)
                .get('/api/reviews?sort_by=owner&&order=ASC')
                .expect(200)
                .then(({body}) => {
                    const {data} = body;
                    expect(Array.isArray(data)).toBe(true);
                    expect(data.length).toBe(13);
                    expect(data).toBeSortedBy('owner')
                    body.data.forEach(object => {
                        expect(object).toEqual(
                            expect.objectContaining({
                                review_id: expect.any(Number),
                                title: expect.any(String),
                                designer: expect.any(String),
                                owner: expect.any(String),
                                review_img_url: expect.any(String),
                                review_body: expect.any(String),
                                category: expect.any(String),
                                created_at: expect.any(String),
                                votes: expect.any(Number),
                                comment_count: expect.any(String)
                            })
                        )
                        })
                    })     
            })

            test('Status:200, GET /api/reviews?sort_by=owners Tests default order of DESC', function () {
                return request(app)
                .get('/api/reviews?sort_by=owner')
                .expect(200)
                .then(({body}) => {
                    const {data} = body;
                    expect(Array.isArray(data)).toBe(true);
                    expect(data.length).toBe(13);
                    expect(data).toBeSortedBy('owner', {descending: true});
                    body.data.forEach(object => {
                        expect(object).toEqual(
                            expect.objectContaining({
                                review_id: expect.any(Number),
                                title: expect.any(String),
                                designer: expect.any(String),
                                owner: expect.any(String),
                                review_img_url: expect.any(String),
                                review_body: expect.any(String),
                                category: expect.any(String),
                                created_at: expect.any(String),
                                votes: expect.any(Number),
                                comment_count: expect.any(String)
                            })
                        )
                        })
                    })     
            })

            test('Status:400, GET /api/reviews?sort_by=owners&&order=droptable  tests for correct input value and ensures the value is sanitized ', function () {
                return request(app)
                .get('/api/reviews?sort_by=owner&&order=droptable')
                .expect(400)
                .then(({body}) => {
                    expect(body.msg).toBe('Incorrect option')
                })
            })
        })

        describe('Introduces the category query which filters through reviews by the category', function () {

            test('Status: 200, GET /api/reviews?category=eurogame retrieves all games with the category column = to euro games', function () {
                return request(app)
                .get('/api/reviews?category=dexterity')
                .expect(200)
                .then(({body}) => {
                    const {data} = body;
                    expect(Array.isArray(data)).toBe(true);
                    expect(data.length).toBe(1);
                    expect(data).toBeSortedBy('owner', {descending: true})
                    body.data.forEach(object => {
                        expect(object).toEqual(
                            expect.objectContaining({
                                review_id: expect.any(Number),
                                title: expect.any(String),
                                designer: expect.any(String),
                                owner: expect.any(String),
                                review_img_url: expect.any(String),
                                review_body: expect.any(String),
                                category: expect.any(String),
                                created_at: expect.any(String),
                                votes: expect.any(Number),
                                comment_count: expect.any(String)
                            })
                        )
                        })
                    })     
            })

            test('Status: 400, GET /api/reviews?category=bobs incorrect value for the category', function () {
                return request(app)
                .get('/api/reviews?category=bobs')
                .expect(400)
                .then(({body}) => {
                    expect(body.msg).toBe('Invalid option');
                })
            })
        })
    })

    describe('GET /api/reviews/:review_id/comments gets all comments assigned to a review_id', function () {
        test('Status: 200, GET /api/reviews/:1/comments test happy path for fetching all the comments on the review', function () {
            return request(app)
            .get('/api/reviews/2/comments')
            .expect(200)
            .then(({body}) => {

                const {data} = body;
                expect(Array.isArray(data)).toBe(true);
                expect(data.length).toBe(3);
                data.forEach(object => {
                    expect(object).toEqual(
                        expect.objectContaining({
                            comment_id: expect.any(Number),
                            votes: expect.any(Number),
                            created_at: expect.any(String),
                            author: expect.any(String),
                            body: expect.any(String)
                        })
                    )
                })

            })
        })
    
        test('Status: 404, review_id that does not exist', function () {
            return request(app)
            .get('/api/reviews/9000000/comments')
            .expect(404)
            .then(({body}) => {
                expect(body.msg).toBe('Invalid id');
            })
        })

        test('Status: 404, review_id that does not exist', function () {
            return request(app)
            .get('/api/reviews/hello/comments')
            .expect(400)
            .then(({body}) => {
                expect(body.msg).toBe('Invalid request');
            })
        })
    })

    describe('POST /api/reviews/:review_id/comments sends a username and body key inside a object and creates a new comment within the comment table', function () {
        
        test('Status:201, will add a new comment to the comment table', function () {
            const data = {username: 'philippaclaire9', body: 'This is a test but will it work?'}
            return request(app)
            .post('/api/reviews/2/comments')
            .send(data)
            .expect(201)
            .then(({body}) => {
                const newComment = {
                    body: 'This is a test but will it work?',
                    votes: 0,
                    author: 'philippaclaire9',
                    review_id: 2,
                    created_at: expect.any(String),
                    comment_id: expect.any(Number)
                }
                const { data } = body
                expect(data[0]).toEqual(newComment);
            })
        })

        test('Status:400, will add a new comment to the comment table, will cause error due to wrong data type on body', function () {
            const data = {username: 'philippaclaire9', body: 5}
            return request(app)
            .post('/api/reviews/2/comments')
            .send(data)
            .expect(400)
            .then(({body}) => {
                expect(body.msg).toBe('Invalid option')
            })
        })



    })

    describe('DELETE /api/comments/:comment_id deletes a comment from the comment table by a chosen comment_id', function () {
        
        test("Status: 204, /api/comments/1 deletes the comment from the comments table and doesn't return anything", function () {

            return request(app)
            .delete('/api/comments/1')
            .expect(204)
        })
    })
    
    describe('GET /api/ returns a JSON of all available end points', function () {

        test('Status: 200, GET /api/ brings a Json file to the users attention', function () {
            return request(app)
            .get('/api')
            .expect(200)
            .then(({body}) => {
                const {data} = body;
                expect(data).not.toBe(null || undefined)
            })
        })
    })

    describe('GET /api/users/:username', function () {

        test('Status: 200, GET /api/users/philippaclaire9 should bring back a single user object from the user table database, using a parametric endpoint via the username column', function () {
            const user = "'philippaclaire9'"
            return request(app)
            .get(`/api/users/${user}`)
            .expect(200)
            .then(({body}) => {
                const {data} = body;
                expect(Array.isArray(data)).toBe(true);
                expect(data[0]).toEqual({
                    username: expect.any(String),
                    name: expect.any(String),
                    avatar_url: expect.any(String)
                })
            })
        })

        test.only('Status: 404, GET /api/users/potato Should return back an empty array and will throw a custom error.', function () {
            const user = "'potato'"
            return request(app)
            .get(`/api/users/${user}`)
            .expect(404)
            .then(({body}) => {
                expect(body.msg).toBe('Invalid Username');
            })
        })
    })

})// end of main describe block            