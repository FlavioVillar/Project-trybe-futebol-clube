import * as Sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import Example from '../database/models/ExampleModel';
import { Response } from 'superagent';
import teamsController from '../controllers/teams.controller';

chai.use(chaiHttp);

const { expect } = chai;

const getTeamsMock = [
      {
        "id": 1,
        "teamName": "Avaí/Kindermann"
      },
      {
        "id": 2,
        "teamName": "Bahia"
      },
      {
        "id": 3,
        "teamName": "Botafogo"
      },
      {
        "id": 4,
        "teamName": "Corinthians"
      },
      {
        "id": 5,
        "teamName": "Cruzeiro"
      },
      {
        "id": 6,
        "teamName": "Ferroviária"
      },
      {
        "id": 7,
        "teamName": "Flamengo"
      },
      {
        "id": 8,
        "teamName": "Grêmio"
      },
      {
        "id": 9,
        "teamName": "Internacional"
      },
      {
        "id": 10,
        "teamName": "Minas Brasília"
      },
      {
        "id": 11,
        "teamName": "Napoli-SC"
      },
      {
        "id": 12,
        "teamName": "Palmeiras"
      },
      {
        "id": 13,
        "teamName": "Real Brasília"
      },
      {
        "id": 14,
        "teamName": "Santos"
      },
      {
        "id": 15,
        "teamName": "São José-SP"
      },
      {
        "id": 16,
        "teamName": "São Paulo"
      }
    ];

describe('Teams', () => {
  beforeEach(() => {
    Sinon.stub(teamsController, 'getTeams').returns(getTeamsMock as any);

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
    Sinon.stub(teamsController, 'getTeamById').returns(getTeamsMock as any);

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






