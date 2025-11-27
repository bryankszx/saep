/*
 * ============================================
 * INSTALAÇÃO DE DEPENDÊNCIAS
 * ============================================
 * 
 * npm install express
 * npm install cors
 * npm install dotenvr
 * npm install body-parser
 * npm install prisma
 * npm install @prisma/client
 * ============================================
 */
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const message = require('./modulo/config.js');

// Import dos controladores
const produtoController = require('./controller/Produtos/produto.js');
const estoqueController = require('./controller/Estoque/estoque');
const fabricanteController = require('./controller/Fabricante/Fabricante');
const categoriaController = require('./controller/Categorias/categoria');
const fichaTecnicaController = require('./controller/FichaTecnica/fichatecnica');

// Configuração de CORS
app.use((request, response, next) => {
    response.header('Access-Control-Allow-Origin', '*');
    response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    response.header('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers, X-Requested-With');
    next();
});

// Configuração do body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Rotas para Produtos
app.get('/v1/saep/produtos', cors(), async function(request, response) {
    const dados = await produtoController.listarProdutos();
    response.status(dados.status_code).json(dados);
});

app.get('/v1/saep/produto/:id', cors(), async function(request, response) {
    const id = request.params.id;
    const dados = await produtoController.buscarProdutoPorId(id);
    response.status(dados.status_code).json(dados);
});

app.post('/v1/saep/produto', cors(), async function(request, response) {
    const contentType = request.headers['content-type'];
    const dados = await produtoController.inserirProduto(request.body, contentType);
    response.status(dados.status_code).json(dados);
});

app.put('/v1/saep/produto/:id', cors(), async function(request, response) {
    const id = request.params.id;
    const contentType = request.headers['content-type'];
    const dados = await produtoController.atualizarProduto(id, request.body, contentType);
    response.status(dados.status_code).json(dados);
});

app.delete('/v1/saep/produto/:id', cors(), async function(request, response) {
    const id = request.params.id;
    const dados = await produtoController.deletarProduto(id);
    response.status(dados.status_code).json(dados);
});

// Rotas para Estoque
app.get('/v1/saep/estoque', cors(), async function(request, response) {
    const { produtoId, dataInicio, dataFim } = request.query;
    const dados = await estoqueController.listarMovimentacoes(produtoId, dataInicio, dataFim);
    response.status(dados.status_code).json(dados);
});

app.post('/v1/saep/estoque', cors(), async function(request, response) {
    const contentType = request.headers['content-type'];
    const dados = await estoqueController.inserirMovimentacao(request.body, contentType);
    response.status(dados.status_code).json(dados);
});

// Rotas para Fabricante
app.get('/v1/saep/fabricantes', cors(), async function(request, response) {
    const dados = await fabricanteController.listarFabricantes();
    response.status(dados.status_code).json(dados);
});

app.get('/v1/saep/fabricante/:id', cors(), async function(request, response) {
    const id = request.params.id;
    const dados = await fabricanteController.buscarFabricantePorId(id);
    response.status(dados.status_code).json(dados);
});

app.post('/v1/saep/fabricante', cors(), async function(request, response) {
    const contentType = request.headers['content-type'];
    const dados = await fabricanteController.inserirFabricante(request.body, contentType);
    response.status(dados.status_code).json(dados);
});

app.put('/v1/saep/fabricante/:id', cors(), async function(request, response) {
    const id = request.params.id;
    const contentType = request.headers['content-type'];
    const dados = await fabricanteController.atualizarFabricante(id, request.body, contentType);
    response.status(dados.status_code).json(dados);
});

app.delete('/v1/saep/fabricante/:id', cors(), async function(request, response) {
    const id = request.params.id;
    const dados = await fabricanteController.deletarFabricante(id);
    response.status(dados.status_code).json(dados);
});

// Rotas para Categoria
app.get('/v1/saep/categorias', cors(), async function(request, response) {
    const dados = await categoriaController.listarCategorias();
    response.status(dados.status_code).json(dados);
});

app.get('/v1/saep/categoria/:id', cors(), async function(request, response) {
    const id = request.params.id;
    const dados = await categoriaController.buscarCategoriaPorId(id);
    response.status(dados.status_code).json(dados);
});

app.post('/v1/saep/categoria', cors(), async function(request, response) {
    const contentType = request.headers['content-type'];
    const dados = await categoriaController.inserirCategoria(request.body, contentType);
    response.status(dados.status_code).json(dados);
});

app.put('/v1/saep/categoria/:id', cors(), async function(request, response) {
    const id = request.params.id;
    const contentType = request.headers['content-type'];
    const dados = await categoriaController.atualizarCategoria(id, request.body, contentType);
    response.status(dados.status_code).json(dados);
});

app.delete('/v1/saep/categoria/:id', cors(), async function(request, response) {
    const id = request.params.id;
    const dados = await categoriaController.deletarCategoria(id);
    response.status(dados.status_code).json(dados);
});

// Rotas para Ficha Técnica
app.get('/v1/saep/ficha-tecnica/produto/:produtoId', cors(), async function(request, response) {
    const produtoId = request.params.produtoId;
    const dados = await fichaTecnicaController.buscarFichaTecnicaPorProduto(produtoId);
    response.status(dados.status_code).json(dados);
});

app.get('/v1/saep/ficha-tecnica/:id', cors(), async function(request, response) {
    const id = request.params.id;
    const dados = await fichaTecnicaController.buscarFichaTecnicaPorId(id);
    response.status(dados.status_code).json(dados);
});

app.post('/v1/saep/ficha-tecnica', cors(), async function(request, response) {
    const contentType = request.headers['content-type'];
    const dados = await fichaTecnicaController.inserirFichaTecnica(request.body, contentType);
    response.status(dados.status_code).json(dados);
});

app.put('/v1/saep/ficha-tecnica/:id', cors(), async function(request, response) {
    const id = request.params.id;
    const contentType = request.headers['content-type'];
    const dados = await fichaTecnicaController.atualizarFichaTecnica(id, request.body, contentType);
    response.status(dados.status_code).json(dados);
});

app.delete('/v1/saep/ficha-tecnica/:id', cors(), async function(request, response) {
    const id = request.params.id;
    const dados = await fichaTecnicaController.deletarFichaTecnica(id);
    response.status(dados.status_code).json(dados);
});

// Rota padrão
app.get('/', function(request, response) {
    response.status(200).json({
        status: true,
        message: 'API SAEP está funcionando!',
        status_code: 200
    });
});

// Rota não encontrada
app.use(function(request, response) {
    response.status(404).json(message.ERROR_NOT_FOUND);
});

// Iniciar o servidor
const port = process.env.PORT || 8080;
app.listen(port, function() {
    console.log(`Servidor rodando na porta ${port}`);
});

module.exports = app;