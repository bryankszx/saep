const message = require('../../modulo/config.js');
const produtoDAO = require('../../model/DAO/estoque');
const { inserirProduto } = require('../Produtos/produto.js');

// Inserir um novo Estoque
const inserirEstoque = async function(estoque, contentType) {
    try {
        if (String(contentType).toLowerCase() !== 'application/json') {
            return message.ERROR_CONTENT_TYPE;
        }

        if (
            !estoque.preco || estoque.preco === '' || estoque.preco === undefined ||
            !estoque.estoque || estoque.estoque === '' || estoque.estoque === undefined
        ) {
            return message.ERROR_REQUIRED_FIELDS;
        }

        // Validação adicional para preço e estoque
        if (isNaN(estoque.preco) || parseFloat(estoque.preco) <= 0) {
            return {
                status: false,
                status_code: 400,
                message: 'O preço deve ser um número maior que zero.'
            };
        }

        if (isNaN(estoque.estoque) || parseInt(estoque.estoque, 10) < 0) {
            return {
                status: false,
                status_code: 400,
                message: 'O estoque deve ser um número inteiro maior ou igual a zero.'
            };
        }

        // Verifica se o produto existe
        const produtoExistente = await produtoDAO.selectByIdProduto(estoque.produtoId);
        if (!produtoExistente || produtoExistente.length === 0) {
            return message.ERROR_NOT_FOUND;
        }

        const resultDadosEstoque = await produtoDAO.insertEstoque(estoque);

        if (resultDadosProduto) {
            return message.SUCESS_CREATED_ITEM;
        } else {
            return message.ERROR_INTERNAL_SERVER_MODEL;
        }
    } catch (error) {
        console.error('Erro no controlador ao inserir produto:', error);
        return message.ERROR_INTERNAL_SERVER_CONTROLLER;
    }
};

// Listar todos os produtos
const listarProdutos = async function() {
    try {
        const dadosProdutos = {};
        const resultDadosProdutos = await produtoDAO.selectAllProdutos();

        if (resultDadosProdutos && resultDadosProdutos.length > 0) {
            dadosProdutos.status = true;
            dadosProdutos.status_code = 200;
            dadosProdutos.quantidade = resultDadosProdutos.length;
            dadosProdutos.produtos = resultDadosProdutos;

            return dadosProdutos;
        } else {
            return message.ERROR_NOT_FOUND;
        }
    } catch (error) {
        console.error('Erro no controlador ao listar produtos:', error);
        return message.ERROR_INTERNAL_SERVER_CONTROLLER;
    }
};

// Buscar produto por ID
const buscarProduto = async function(id) {
    try {
        if (!id || id === '' || id === undefined || isNaN(id)) {
            return message.ERROR_REQUIRED_FIELDS;
        }

        const dadosProduto = {};
        const resultDadosProduto = await produtoDAO.selectByIdProduto(id);

        if (resultDadosProduto && resultDadosProduto.length > 0) {
            dadosProduto.status = true;
            dadosProduto.status_code = 200;
            dadosProduto.produto = resultDadosProduto[0];

            return dadosProduto;
        } else {
            return message.ERROR_NOT_FOUND;
        }
    } catch (error) {
        console.error('Erro no controlador ao buscar produto por ID:', error);
        return message.ERROR_INTERNAL_SERVER_CONTROLLER;
    }
};

// Atualizar produto
const atualizarProduto = async function(id, dadosProduto, contentType) {
    try {
        if (String(contentType).toLowerCase() !== 'application/json') {
            return message.ERROR_CONTENT_TYPE;
        }

        if (
            !id || id === '' || id === undefined || isNaN(id) ||
            !dadosProduto.nome || dadosProduto.nome === '' || dadosProduto.nome === undefined ||
            !dadosProduto.preco || dadosProduto.preco === '' || dadosProduto.preco === undefined ||
            dadosProduto.estoque === undefined || dadosProduto.estoque === ''
        ) {
            return message.ERROR_REQUIRED_FIELDS;
        }

        // Verifica se o produto existe
        const produtoExistente = await produtoDAO.selectByIdProduto(id);
        if (!produtoExistente || produtoExistente.length === 0) {
            return message.ERROR_NOT_FOUND;
        }

        // Verifica se já existe outro produto com o mesmo nome
        const produtoMesmoNome = await produtoDAO.selectByNome(dadosProduto.nome);
        if (produtoMesmoNome && produtoMesmoNome.length > 0 && 
            produtoMesmoNome[0].id !== parseInt(id, 10)) {
            return message.ERROR_ITEM_EXISTS;
        }

        // Validação adicional para preço e estoque
        if (isNaN(dadosProduto.preco) || parseFloat(dadosProduto.preco) <= 0) {
            return {
                status: false,
                status_code: 400,
                message: 'O preço deve ser um número maior que zero.'
            };
        }

        if (isNaN(dadosProduto.estoque) || parseInt(dadosProduto.estoque, 10) < 0) {
            return {
                status: false,
                status_code: 400,
                message: 'O estoque deve ser um número inteiro maior ou igual a zero.'
            };
        }

        // Atualiza o produto
        const resultDadosProduto = await produtoDAO.updateProduto({
            id: id,
            ...dadosProduto
        });

        if (resultDadosProduto) {
            return message.SUCESS_UPDATE_ITEM;
        } else {
            return message.ERROR_INTERNAL_SERVER_MODEL;
        }
    } catch (error) {
        console.error('Erro no controlador ao atualizar produto:', error);
        return message.ERROR_INTERNAL_SERVER_CONTROLLER;
    }
};

// Deletar produto
const deletarProduto = async function(id) {
    try {
        if (!id || id === '' || id === undefined || isNaN(id)) {
            return message.ERROR_REQUIRED_FIELDS;
        }

        // Verifica se o produto existe
        const produtoExistente = await produtoDAO.selectByIdProduto(id);
        if (!produtoExistente || produtoExistente.length === 0) {
            return message.ERROR_NOT_FOUND;
        }

        // Tenta deletar o produto
        const resultDadosProduto = await produtoDAO.deleteProduto(id);

        if (resultDadosProduto) {
            return message.SUCESS_DELETE_ITEM;
        } else {
            return message.ERROR_INTERNAL_SERVER_MODEL;
        }
    } catch (error) {
        console.error('Erro no controlador ao deletar produto:', error);
        
        // Verifica se o erro é de chave estrangeira (produto em uso)
        if (error.code === 'P2003') {
            return {
                status: false,
                status_code: 400,
                message: 'Não é possível remover o produto pois está sendo utilizado em pedidos.'
            };
        }
        
        return message.ERROR_INTERNAL_SERVER_CONTROLLER;
    }
};

// Atualizar estoque do produto
const atualizarEstoque = async function(id, dadosEstoque, contentType) {
    try {
        if (String(contentType).toLowerCase() !== 'application/json') {
            return message.ERROR_CONTENT_TYPE;
        }

        if (
            !id || id === '' || id === undefined || isNaN(id) ||
            dadosEstoque.quantidade === undefined || dadosEstoque.quantidade === '' ||
            isNaN(dadosEstoque.quantidade)
        ) {
            return message.ERROR_REQUIRED_FIELDS;
        }

        const quantidade = parseInt(dadosEstoque.quantidade, 10);
        const operacao = dadosEstoque.operacao || 'adicionar';

        // Busca o produto atual
        const produto = await produtoDAO.selectByIdProduto(id);
        if (!produto || produto.length === 0) {
            return message.ERROR_NOT_FOUND;
        }

        // Calcula o novo estoque
        let novoEstoque;
        if (operacao === 'definir') {
            novoEstoque = quantidade;
        } else {
            novoEstoque = produto[0].estoque + quantidade;
        }

        // Garante que o estoque não fique negativo
        if (novoEstoque < 0) {
            return {
                status: false,
                status_code: 400,
                message: 'Estoque não pode ficar negativo.',
                estoque_atual: produto[0].estoque
            };
        }

        // Atualiza o estoque
        const result = await produtoDAO.updateEstoqueProduto(id, novoEstoque);

        if (result) {
            return {
                status: true,
                status_code: 200,
                message: operacao === 'definir' ? 'Estoque definido com sucesso.' : 'Estoque atualizado com sucesso.',
                produto: result
            };
        } else {
            return message.ERROR_INTERNAL_SERVER_MODEL;
        }
    } catch (error) {
        console.error('Erro no controlador ao atualizar estoque:', error);
        return message.ERROR_INTERNAL_SERVER_CONTROLLER;
    }
};

// Buscar produtos por categoria
const buscarPorCategoria = async function(categoria) {
    try {
        if (!categoria || categoria === '' || categoria === undefined) {
            return message.ERROR_REQUIRED_FIELDS;
        }

        const dadosProdutos = {};
        const resultDadosProdutos = await produtoDAO.selectByCategoria(categoria);

        if (resultDadosProdutos && resultDadosProdutos.length > 0) {
            dadosProdutos.status = true;
            dadosProdutos.status_code = 200;
            dadosProdutos.quantidade = resultDadosProdutos.length;
            dadosProdutos.produtos = resultDadosProdutos;

            return dadosProdutos;
        } else {
            return message.ERROR_NOT_FOUND;
        }
    } catch (error) {
        console.error('Erro no controlador ao buscar produtos por categoria:', error);
        return message.ERROR_INTERNAL_SERVER_CONTROLLER;
    }
};

// Listar produtos com estoque baixo
const listarEstoqueBaixo = async function(estoqueMinimo) {
    try {
        const minimo = estoqueMinimo || 10; // Valor padrão se não for informado
        
        const dadosProdutos = {};
        const resultDadosProdutos = await produtoDAO.selectByEstoqueMinimo(minimo);

        if (resultDadosProdutos && resultDadosProdutos.length > 0) {
            dadosProdutos.status = true;
            dadosProdutos.status_code = 200;
            dadosProdutos.quantidade = resultDadosProdutos.length;
            dadosProdutos.produtos = resultDadosProdutos;

            return dadosProdutos;
        } else {
            return message.ERROR_NOT_FOUND;
        }
    } catch (error) {
        console.error('Erro no controlador ao listar produtos com estoque baixo:', error);
        return message.ERROR_INTERNAL_SERVER_CONTROLLER;
    }
};

module.exports = {
    inserirEstoque,
    atualizarEstoque,
    buscarPorCategoria,
    listarEstoqueBaixo
};
