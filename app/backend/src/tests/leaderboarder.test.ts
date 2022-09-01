import * as Sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import Example from '../database/models/ExampleModel';
import { Response } from 'superagent';
import teamsController from '../controllers/teams/teams.controller';
import getTeamsMock from './utils/getTeamsMock';
import LeaderboardController from '../controllers/leaderboard/leaderboard.controller';
import homeResultsMock from './utils/homeResultsMock';
import awayResultsMock from './utils/awayResultsMock';
import leaderboardResultsMock from './utils/leaderboardResultsMock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Leaderboarder', () => {
  describe('Teste da função de classificação de mandante de jogo', () => {
  beforeEach(() => {
    Sinon.stub(LeaderboardController, 'getHomeTeamRanking').returns(homeResultsMock as any);
  });

  afterEach(() => {
    Sinon.restore();
  });

  it('Deve retornar status 200 para getHomeTeamRanking', async () => {
    const response = await chai.request(app)
      .get('/leaderboard/home')
      .send({});

    expect(response.status).to.be.eq(200);
  });

  it('Deve retornar uma tabela de classificação dos  mandantes', async () => {
    const response = await chai.request(app)
      .get('/leaderboard/home')
      .send({});

    expect(response.body).to.be.deep.eq(homeResultsMock);
  });
  });

  describe('Teste da função de classificação de visitante de jogo', () => {
    beforeEach(() => {
    Sinon.stub(LeaderboardController, 'getAwayTeamRanking').returns(awayResultsMock as any);
  });

  afterEach(() => {
    Sinon.restore();
  });
    it('Deve retornar status 200 para getAwayTeamRanking', async () => {
      const response = await chai.request(app)
        .get('/leaderboard/away')
        .send({});

      expect(response.status).to.be.eq(200);
    });
  
    it('Deve retornar uma tabela de classificação dos  visitantes', async () => {
      const response = await chai.request(app)
        .get('/leaderboard/away')
        .send({});
  

      expect(response.body).to.be.deep.eq(awayResultsMock);
    });
  });

  describe('Teste da função de classificação geral do campeonato', () => {
    beforeEach(() => {
    Sinon.stub(LeaderboardController, 'getTotalRanking').returns(leaderboardResultsMock as any);
  });

  afterEach(() => {
    Sinon.restore();
  });
    it('Deve retornar status 200 para getTotalRanking', async () => {
      const response = await chai.request(app)
        .get('/leaderboard')
        .send({});

      expect(response.status).to.be.eq(200);
    });
  
    it('Deve retornar uma tabela de classificação geral do campeonato', async () => {
      const response = await chai.request(app)
        .get('/leaderboard')
        .send({});  

      expect(response.body).to.be.deep.eq(leaderboardResultsMock);
    });
  } );

    
});