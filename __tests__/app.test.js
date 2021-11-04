const db = require('../db/connection.js');
const testData = require('../db/data/test-data/index.js');
const  seed  = require('../db/seeds/seed.js');
const app = require('../app');
const request = require('supertest');
const categories = require('../db/data/test-data/categories.js');



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

        // random console logged errors started here
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

            test.only('200: GET /api/reviews?category=eurogame retrieves all games with the category column = to euro games', function () {
                return request(app)
                .get('/api/reviews?category=eurogame')
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
        })
    })


}) // end of main describe block