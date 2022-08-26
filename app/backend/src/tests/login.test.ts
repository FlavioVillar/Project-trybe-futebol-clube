import * as Sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import Example from '../database/models/ExampleModel';
import { Response } from 'superagent';
import JwtService from '../services/jwt/jwt.service';

chai.use(chaiHttp);

const { expect } = chai;

const createUserLoginMock = {
  email: 'admin@admin.com' as string,
  password: 'scret_admin' as string,
}

const createUserLoginMockInvalid = {
  email: 'test@test.com' as string,
  password: 'test_hash' as string,
}



describe('Login', () => {
  beforeEach(() => {
    Sinon.stub(JwtService, 'createToken').returns('any-token');

  });

  afterEach(() => {
    Sinon.restore();
  })
    
  it('Deve retornar status 200', async () => {
    const response = await chai.request(app)
      .post('/login')
      .send(createUserLoginMock);
      
    expect(response.status).to.be.eq(200);
  });

  it('Deve retornar um token', async () => {
    const response = await chai.request(app)
      .post('/login')
      .send(createUserLoginMock);

    expect(response.body).to.be.deep.eq({ token: 'any-token' });
  });
  
  it('Deve retornar status 400', async () => {
    const response = await chai.request(app)
      .post('/login')
      .send({});
    
    expect(response.status).to.be.eq(400);
  });

  it('Deve retornar message de erro "All fields must be filled"', async () => {
    const response = await chai.request(app)
      .post('/login')
      .send({});
    
    expect(response.body).to.be.deep.eq({ message: 'All fields must be filled' });
  });

  it('Deve retornar message de erro "Incorrect email or password"', async () => {
    const response = await chai.request(app)
      .post('/login')
      .send(createUserLoginMockInvalid);
    
    expect(response.body).to.be.deep.eq({ message: 'Incorrect email or password' });
  });
});






