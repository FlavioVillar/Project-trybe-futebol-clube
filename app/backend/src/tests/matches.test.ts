import * as Sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import Example from '../database/models/ExampleModel';
import { Response } from 'superagent';
import MatchController from '../controllers/match.controller';
import getMatchesMock from './utils/getMatchesMock';
import JwtService from '../services/jwt/jwt.service';

chai.use(chaiHttp);

const { expect } = chai;

describe('Matches', () => { 
  describe('testa função getMatches', () => { 
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

  describe('testa função updateMatches', () => {
    beforeEach(() => {
      Sinon.stub(MatchController, 'updateMatch').returns(getMatchesMock as any);
    }
    );
  
    afterEach(() => {
      Sinon.restore();
    }
    );
  
    it('Deve retornar status 200', async () => {
      const response = await chai.request(app)
        .patch('/matches/1/finish')
        .send({id: 1, inProgress: true});
  
      expect(response.status).to.be.eq(200);
    });
  
    it('Deve retornar uma mensagem de sucesso', async () => {
      const response = await chai.request(app)
        .patch('/matches/1/finish')
        .send({id: 1, inProgress: true});
  
      expect(response.body).to.be.deep.eq({ message: 'Finished' });
    });
  });

  describe('testa validação do token', () => {
    beforeEach(() => {
      Sinon.stub(MatchController, 'createMatch').returns({ id: 1 } as any);
    });
  
    afterEach(() => {
      Sinon.restore();
    });
    
    it('Deve retornar uma mensagem de token invalido', async () => {
      const response = await chai.request(app)
        .post('/matches')
        .send({
          homeTeam: 16,
          homeTeamGoals: 2,
          awayTeam: 8,
          awayTeamGoals: 2,
        });
  
      expect(response.body).to.be.deep.eq({ message: 'Token must be a valid token' });
      });        
  })

  describe('testa função createMatch', () => {    
    beforeEach(() => {
      Sinon.stub(JwtService, 'verifyToken').returns({ email: 'admin@admin.com' } as any);
      Sinon.stub(MatchController, 'createMatch').returns({
  "id": 1,
  "homeTeam": 16,
  "homeTeamGoals": 2,
  "awayTeam": 8,
  "awayTeamGoals": 2,
  "inProgress": true,
} as any);
    });
  
    afterEach(() => {
      Sinon.restore();
    }
    );
  
    it('Deve retornar uma mensagem de validação de times repetidos', async () => {
      const response = await chai.request(app)
        .post('/matches')
        .send({
          homeTeam: 8,
          homeTeamGoals: 2,
          awayTeam: 8,
          awayTeamGoals: 2,
        });
  
      expect(response.body).to.be.deep.eq({ message: 'It is not possible to create a match with two equal teams' });
    });

        it('Deve retornar uma mensagem de validação de time inexistente', async () => {
      const response = await chai.request(app)
        .post('/matches')
        .send({
          homeTeam: 38,
          homeTeamGoals: 2,
          awayTeam: 8,
          awayTeamGoals: 2,
        });
  
      expect(response.body).to.be.deep.eq({ message: 'There is no team with such id!' });
    });

    it('Deve retornar status 201', async () => {
      const response = await chai.request(app)
        .post('/matches')
        .send({
          homeTeam: 3,
          homeTeamGoals: 2,
          awayTeam: 8,
          awayTeamGoals: 2,
        });
  
      expect(response.status).to.be.eq(201);
    });
  });
});
