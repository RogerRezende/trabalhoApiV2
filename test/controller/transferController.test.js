const request = require('supertest');
const sinon = require('sinon');
const { expect } = require('chai');

const app = require('../../app');

const transferService = require('../../service/transferService');

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

        it('Using mocks: From and To not exist return 400', async () => {
            const transferServiceMock = sinon.stub(transferService, 'transfer')
            transferServiceMock.throws(new Error('Usuário remetente ou destinatário não encontrado'));

            const response = await request(app)
                .post('/transfers')
                .send({
                    from: "Bruce",
                    to: "Selina",
                    amount: 1000
                });

            expect(response.status).to.equal(400);
            expect(response.body).to.have.property('error', 'Usuário remetente ou destinatário não encontrado');

            sinon.restore();
        });

        it('Using mocks: From and To exist and return 201', async () => {
            const transferServiceMock = sinon.stub(transferService, 'transfer')
            transferServiceMock.returns({
                from: "Bruce",
                to: "Selina",
                amount: 1000,
                date: new Date().toISOString()
            });

            const response = await request(app)
                .post('/transfers')
                .send({
                    from: "Bruce",
                    to: "Selina",
                    amount: 1000
                });

            expect(response.status).to.equal(201);
            expect(response.body).to.have.property('from', 'Bruce');
            expect(response.body).to.have.property('to', 'Selina');
            expect(response.body).to.have.property('amount', 1000);
            expect(response.body).to.have.property('date');

            sinon.restore();
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
