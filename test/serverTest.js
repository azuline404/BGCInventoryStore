const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const random = require('random');

// CONFIG
// ======
chai.should();

chai.use(chaiHttp);

// VARIABLES
// =========
let randomProductID = random.int((min=0), (max=Number.MAX_SAFE_INTEGER))
let randomSkuID = random.int((min=0), (max=Number.MAX_SAFE_INTEGER))
let randomOrderID = random.int((min=0), (max=Number.MAX_SAFE_INTEGER))


// TESTS
// =====
describe('server routes', () => {

    // describe('GET / route', () => {
    //     it('should return OK status', (done) => {
    //         chai.request(server)
    //             .get('/')
    //             .end((err, response) => {
    //                 response.should.have.status(200)
    //             done()
    //             })
    //     })
    // })

    // describe('GET /redirect route', () => {
    //     it('should return OK status', (done) => {
    //         chai.request(server)
    //             .get('/redirect')
    //             .end((err, response) => {
    //                 response.should.have.status(200)
    //             done()
    //             })
    //     })
    // })

    describe('GET /home route', () => {
        it('should return OK status', (done) => {
            chai.request(server)
                .get('/home')
                .end((err, response) => {
                    response.should.have.status(200)
                done()
                })
        })
    })

    describe('GET /addProductPage route', () => {
        it('should return OK status', (done) => {
            chai.request(server)
                .get('/addProductPage')
                .end((err, response) => {
                    response.should.have.status(200)
                done()
                })
        })
    })

    describe('GET /addProduct route', () => {
        it('should return OK status', (done) => {
            chai.request(server)
                .get('/addProduct')
                .end((err, response) => {
                    response.should.have.status(200)
                done()
                })
        })
    })

    describe('GET /shopBottles route', () => {
        it('should return OK status', (done) => {
            chai.request(server)
                .get('/shopBottles')
                .end((err, response) => {
                    response.should.have.status(200)
                done()
                })
        })
    })

    describe('GET /shopBackpacks route', () => {
        it('should return OK status', (done) => {
            chai.request(server)
                .get('/shopBackpacks')
                .end((err, response) => {
                    response.should.have.status(200)
                done()
                })
        })
    })

    describe('GET /shopShirts route', () => {
        it('should return OK status', (done) => {
            chai.request(server)
                .get('/shopShirts')
                .end((err, response) => {
                    response.should.have.status(200)
                done()
                })
        })
    })

    describe('GET /shopAllProducts route', () => {
        it('should return OK status', (done) => {
            chai.request(server)
                .get('/shopAllProducts')
                .end((err, response) => {
                    response.should.have.status(200)
                done()
                })
        })
    })

    describe('GET /detail route', () => {
        it('should return OK status', (done) => {
            chai.request(server)
                .get('/detail')
                .end((err, response) => {
                    response.should.have.status(200)
                done()
                })
        })
    })

    describe('GET /detail/id route', () => {
        it('should return OK status', (done) => {
            chai.request(server)
                .get('/detail/'+randomProductID)
                .end((err, response) => {
                    response.should.have.status(200)
                done()
                })
        })
    })

    describe('GET /faq route', () => {
        it('should return OK status', (done) => {
            chai.request(server)
                .get('/faq')
                .end((err, response) => {
                    response.should.have.status(200)
                done()
                })
        })
    })

    describe('GET /after_add route', () => {
        it('should return OK status', (done) => {
            chai.request(server)
                .get('/after_add')
                .end((err, response) => {
                    response.should.have.status(200)
                done()
                })
        })
    })

    describe('GET /after_add/product_id/sku_id route', () => {
        it('should return OK status', (done) => {
            chai.request(server)
                .get('/after_add/'+randomProductID+'/'+randomSkuID)
                .end((err, response) => {
                    response.should.have.status(200)
                done()
                })
        })
    })

    // describe('GET /shopCart/order_id route', () => {
    //     it('should return OK status', (done) => {
    //         chai.request(server)
    //             .get('/shopCart/'+randomOrderID)
    //             .end((err, response) => {
    //                 response.should.have.status(200)
    //             done()
    //             })
    //     })
    // })


})

