const message = require('../../modulo/config.js');
const categoriaDAO = require('../../model/DAO/categoria');

// Inserir uma nova categoria
const inserirCategoria = async function(dadosCategoria, contentType) {
    try {
        if (String(contentType).toLowerCase() !== 'application/json') {
            return message.ERROR_CONTENT_TYPE;
        }

        // Validação dos campos obrigatórios
        if (!dadosCategoria.nomecategoria) {
            return message.ERROR_REQUIRED_FIELDS;
        }

        // Insere a categoria
        const resultDadosCategoria = await categoriaDAO.insertCategoria({
            nome: dadosCategoria.nomecategoria
        });

        if (resultDadosCategoria && resultDadosCategoria.error) {
            return {
                status: false,
                status_code: 400,
                message: resultDadosCategoria.error
            };
        }

        if (resultDadosCategoria) {
            return message.SUCESS_CREATED_ITEM;
        } else {
            return message.ERROR_INTERNAL_SERVER_MODEL;
        }
    } catch (error) {
        console.error('Erro no controlador ao inserir categoria:', error);
        return message.ERROR_INTERNAL_SERVER_CONTROLLER;
    }
};

// Listar todas as categorias
const listarCategorias = async function() {
    try {
        const dadosCategorias = {};
        const resultDadosCategorias = await categoriaDAO.selectAllCategorias();

        if (resultDadosCategorias && resultDadosCategorias.length > 0) {
            dadosCategorias.status = true;
            dadosCategorias.status_code = 200;
            dadosCategorias.quantidade = resultDadosCategorias.length;
            dadosCategorias.categorias = resultDadosCategorias;

            return dadosCategorias;
        } else {
            return message.ERROR_NOT_FOUND;
        }
    } catch (error) {
        console.error('Erro no controlador ao listar categorias:', error);
        return message.ERROR_INTERNAL_SERVER_CONTROLLER;
    }
};

// Buscar categoria por ID
const buscarCategoria = async function(id) {
    try {
        if (!id || isNaN(id)) {
            return message.ERROR_INVALID_ID;
        }

        const dadosCategoria = {};
        const resultDadosCategoria = await categoriaDAO.selectByIdCategoria(id);

        if (resultDadosCategoria && resultDadosCategoria.length > 0) {
            dadosCategoria.status = true;
            dadosCategoria.status_code = 200;
            dadosCategoria.categoria = resultDadosCategoria[0];

            return dadosCategoria;
        } else {
            return message.ERROR_NOT_FOUND;
        }
    } catch (error) {
        console.error('Erro no controlador ao buscar categoria por ID:', error);
        return message.ERROR_INTERNAL_SERVER_CONTROLLER;
    }
};

// Atualizar categoria
const atualizarCategoria = async function(id, dadosCategoria, contentType) {
    try {
        if (String(contentType).toLowerCase() !== 'application/json') {
            return message.ERROR_CONTENT_TYPE;
        }

        if (!id || isNaN(id)) {
            return message.ERROR_INVALID_ID;
        }

        // Atualiza a categoria
        const resultDadosCategoria = await categoriaDAO.updateCategoria(id, dadosCategoria);

        if (resultDadosCategoria && resultDadosCategoria.error) {
            return {
                status: false,
                status_code: 400,
                message: resultDadosCategoria.error
            };
        }

        if (resultDadosCategoria) {
            return message.SUCESS_UPDATED_ITEM;
        } else {
            return message.ERROR_INTERNAL_SERVER_MODEL;
        }
    } catch (error) {
        console.error('Erro no controlador ao atualizar categoria:', error);
        return message.ERROR_INTERNAL_SERVER_CONTROLLER;
    }
};

// Deletar categoria
const deletarCategoria = async function(id) {
    try {
        if (!id || isNaN(id)) {
            return message.ERROR_INVALID_ID;
        }

        const resultDadosCategoria = await categoriaDAO.deleteCategoria(id);

        if (resultDadosCategoria && resultDadosCategoria.error) {
            return {
                status: false,
                status_code: 400,
                message: resultDadosCategoria.error
            };
        }

        if (resultDadosCategoria) {
            return {
                status: true,
                status_code: 200,
                message: 'Categoria excluída com sucesso.'
            };
        } else {
            return message.ERROR_INTERNAL_SERVER_MODEL;
        }
    } catch (error) {
        console.error('Erro no controlador ao deletar categoria:', error);
        return message.ERROR_INTERNAL_SERVER_CONTROLLER;
    }
};

module.exports = {
    inserirCategoria,
    listarCategorias,
    buscarCategoria,
    atualizarCategoria,
    deletarCategoria
};