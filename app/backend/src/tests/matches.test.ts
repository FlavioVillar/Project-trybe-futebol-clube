import * as Sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import Example from '../database/models/ExampleModel';
import { Response } from 'superagent';
import MatchController from '../controllers/match.controller';
import getMatchesMock from './utils/getMatchesMock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Matches', () => { 
  beforeEach(() => {
    Sinon.stub(MatchController, 'getMatches').returns(getMatchesMock as any);
  });

  afterEach(() => {
    Sinon.restore();
  })

  it('Deve retornar status 200', async () => {
    const response = await chai.request(app)
      .get('/matches')
      .send({});

    expect(response.status).to.be.eq(200);
  });

  it('Deve retornar um array de partidas', async () => {
    const response = await chai.request(app)
      .get('/matches')
      .send({});

    expect(response.body).to.be.deep.eq(getMatchesMock);
  });

  it ('Deve filtrar as partidas por status', async () => {
    const response = await chai.request(app)
      .get('/matches')
      .query({ inProgress: 'true' });

    expect(response.body).to.be.deep.eq(getMatchesMock.filter(match => match.inProgress));
  });

});