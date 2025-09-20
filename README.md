# API de Transferências e Usuários

Esta API permite o registro, login, consulta de usuários e transferências de valores entre usuários. O objetivo é servir de base para estudos de testes e automação de APIs.

## Funcionalidades
- Registro de usuário (não permite duplicados)
- Login de usuário (obrigatório informar usuário e senha)
- Consulta de todos os usuários
- Transferência de valores entre usuários
  - Só é permitido transferir acima de R$ 5.000,00 para destinatários marcados como "favorecido"
  - Transferências para não favorecidos devem ser menores que R$ 5.000,00
- Banco de dados em memória (os dados são perdidos ao reiniciar o servidor)
- Documentação Swagger disponível em `/api-docs`

## Estrutura de Diretórios
```
controller/         # Rotas e controllers
model/              # Modelos e "banco de dados" em memória
service/            # Lógica de negócio
app.js              # Configuração do Express e rotas
server.js           # Inicialização do servidor
swagger.json        # Documentação Swagger
```

## Instalação e Execução

1. **Clone o repositório**
2. **Instale as dependências:**
   ```
   npm install express swagger-ui-express
   ```
3. **Inicie o servidor:**
   ```
   node server.js
   ```
4. **Acesse a documentação:**
   - [http://localhost:3000/api-docs](http://localhost:3000/api-docs)

## Endpoints Principais

- `POST /users/register` — Registro de usuário
- `POST /users/login` — Login
- `GET /users` — Listar usuários
- `POST /transfers` — Realizar transferência
- `GET /transfers` — Listar transferências

Consulte exemplos de payloads e respostas na documentação Swagger.

## Observações
- Não há autenticação JWT/token nesta versão.
- O saldo inicial dos usuários é 0. Para testar transferências, ajuste manualmente o saldo no array de usuários ou implemente um endpoint de depósito.

---

API criada para fins didáticos e de automação de testes.
