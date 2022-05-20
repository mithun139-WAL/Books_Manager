const chai = require('chai');
const chaiHttp = require('chai-http');
const book = require('../app');

chai.should();
chai.use(chaiHttp);

describe('Books API', () => {
  describe('GET /books', () => {
    it('It Should not  get all the books without token', (done) => {
      chai
        .request(book)
        .get('/books')
        .end((err, response) => {
          response.should.have.status(401);
          done();
        });
    });

    it('It Should not  get all the books', (done) => {
      chai
        .request(book)
        .get('/book')
        .end((err, response) => {
          response.should.have.status(404);
          done();
        });
    });
  });
  describe('GET /books', () => {
    it('It Shoud GET all the books successfully with token passing', (done) => {
      chai
        .request(book)
        .post('/user/login')
        .send({
          email: 'alphahappened139@gmail.com',
          password: 'Alpha@1398',
        })
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.have.property('token');
          response.body.should.be.a('object');
          var token = response.body.token;
          chai
            .request(book)
            .get('/books')
            .set('token', token)
            .end((error, response) => {
              response.should.have.status(200);
              done();
            });
        });
    });
  });

  describe('PUT /books/edit/:id', () => {
    it('It Shoud GET all the books successfully with token passing', (done) => {
      chai
        .request(book)
        .post('/user/login')
        .send({
          email: 'alphahappened139@gmail.com',
          password: 'Alpha@1398',
        })
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.have.property('token');
          response.body.should.be.a('object');
          var token = response.body.token;
          chai
            .request(book)
            .put('/books/edit/6')
            .set('token', token)
            .send({
              name: 'Harry Potter and the Udaal',
              isbn_no: '9780590353403',
              author: 'JK Udaal',
              edition: 1988,
              publication: 'Bloomsbury Publishing',
              price: 1999,
              availability: 0,
              categoryId: 3,
            })
            .end((error, response) => {
              response.should.have.status(200);
              response.body.should.be.a('object');
              done();
            });
        });
    });
  });

  describe('POST /user/login', () => {
    it('It Shoud POST credentials for login successfully', (done) => {
      chai
        .request(book)
        .post('/user/login')
        .send({
          email: 'alphahappened139@gmail.com',
          password: 'Alpha@1398',
        })
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.have.property('token');
          response.body.should.be.a('object');
          done();
        });
    });
  });

  describe('GET /categories', () => {
    it('It Shoud GET all the categories successfully with token passing', (done) => {
      chai
        .request(book)
        .post('/user/login')
        .send({
          email: 'alphahappened139@gmail.com',
          password: 'Alpha@1398',
        })
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.have.property('token');
          response.body.should.be.a('object');
          var token = response.body.token;
          chai
            .request(book)
            .get('/categories')
            .set('token', token)
            .end((error, response) => {
              response.should.have.status(200);
              done();
            });
        });
    });
  });
});
