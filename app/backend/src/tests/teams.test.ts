import * as Sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import Example from '../database/models/ExampleModel';
import { Response } from 'superagent';
import Team from '../factories/Teams.factory';
import getTeamsMock from './utils/getTeamsMock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Teams', () => {
  beforeEach(() => {
    Sinon.stub(Team.controller(), 'getTeams' as any).returns(getTeamsMock as any);

  });

  afterEach(() => {
    Sinon.restore();
  })
    
  it('Deve retornar status 200', async () => {
    const response = await chai.request(app)
      .get('/teams')
      .send({});
      
    expect(response.status).to.be.eq(200);
  });

  it('Deve retornar um array de times', async () => {
    const response = await chai.request(app)
      .get('/teams')
      .send({});

    expect(response.body).to.be.deep.eq(getTeamsMock);
  });  

  it('Deve retornar um time pelo id', async () => {
    beforeEach(() => {
    Sinon.stub(Team.controller(), 'getTeamById' as any).returns(getTeamsMock as any);

  });

    const response = await chai.request(app)
      .get('/teams/1')
      .send({});

    expect(response.body).to.be.deep.eq(getTeamsMock[0]);

    afterEach(() => {
    Sinon.restore();
  })
  });
  
});






