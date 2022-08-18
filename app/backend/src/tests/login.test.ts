import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Example from '../database/models/ExampleModel';

import { Response } from 'superagent';
import JwtService from '../services/jwt.service';
import ICreateUser from '../interfaces/ICreateUser.interface';

chai.use(chaiHttp);

const { expect } = chai;

// const createUserLoginMock: ICreateUser = {
//   id: 1,
//   email: 'any-email'


// describe('Teste Login', () => {
//   beforeEach(() => {
//     Sinon.stub(JwtService, 'sign').returns('token');

  // let chaiHttpResponse: Response;

  // before(async () => {
  //   sinon
  //     .stub(Example, "findOne")
  //     .resolves({
  //       ...<Seu mock>
  //     } as Example);
  // });

  // after(()=>{
  //   (Example.findOne as sinon.SinonStub).restore();
  // })

  // it('...', async () => {
  //   chaiHttpResponse = await chai
  //      .request(app)
  //      ...

  //   expect(...)
  // });

//   it('Seu sub-teste', () => {
//     expect(false).to.be.eq(true);
//   });
// });
