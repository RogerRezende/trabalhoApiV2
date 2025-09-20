const request = require('supertest');
const sinon = require('sinon');
const { expect } = require('chai');

const app = require('../../app');

describe('Transfer Controller', () => {
    describe('POST /transfers', () => {
        it('From and To not exist return 400', async () => {
            const response = await request(app)
                .post('/transfers')
                .send({
                    from: "Bruce",
                    to: "Selina",
                    amount: 1000
                });

            expect(response.status).to.equal(400);
            expect(response.body).to.have.property('error', 'Usuário remetente ou destinatário não encontrado');        
        });
        it('From and To not exist and Amount is not a number return 400', async () => {
            const response = await request(app)
                .post('/transfers')
                .send({
                    from: "Bruce",
                    to: "Selina",
                    amount: "1000"
                });

            expect(response.status).to.equal(400);
            expect(response.body).to.have.property('error', 'Dados de transferência inválidos');
        });
    });
});
