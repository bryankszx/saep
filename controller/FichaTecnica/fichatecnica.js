const message = require('../../modulo/config.js');
const fichaTecnicaDAO = require('../../model/DAO/fichatecnica');
const produtoDAO = require('../../model/DAO/produto');

// Inserir uma nova ficha técnica
const inserirFichaTecnica = async function(dadosFichaTecnica, contentType) {
    try {
        if (String(contentType).toLowerCase() !== 'application/json') {
            return message.ERROR_CONTENT_TYPE;
        }

        // Validação dos campos obrigatórios
        if (!dadosFichaTecnica.produtoId) {
            return message.ERROR_REQUIRED_FIELDS;
        }

        // Verifica se o produto existe
        const produto = await produtoDAO.selectByIdProduto(dadosFichaTecnica.produtoId);
        if (!produto || produto.length === 0) {
            return {
                status: false,
                status_code: 404,
                message: 'Produto não encontrado'
            };
        }

        // Insere a ficha técnica
        const resultDadosFicha = await fichaTecnicaDAO.insertFichaTecnica(dadosFichaTecnica);

        if (resultDadosFicha && resultDadosFicha.error) {
            return {
                status: false,
                status_code: 400,
                message: resultDadosFicha.error
            };
        }

        if (resultDadosFicha) {
            return {
                ...message.SUCESS_CREATED_ITEM,
                data: resultDadosFicha
            };
        } else {
            return message.ERROR_INTERNAL_SERVER_MODEL;
        }
    } catch (error) {
        console.error('Erro no controlador ao inserir ficha técnica:', error);
        return message.ERROR_INTERNAL_SERVER_CONTROLLER;
    }
};

// Buscar ficha técnica por ID
const buscarFichaTecnicaPorId = async function(id) {
    try {
        if (!id || isNaN(id)) {
            return message.ERROR_INVALID_ID;
        }

        const resultDadosFicha = await fichaTecnicaDAO.selectByIdFichaTecnica(id);

        if (resultDadosFicha && resultDadosFicha.length > 0) {
            return {
                status: true,
                status_code: 200,
                fichaTecnica: resultDadosFicha[0]
            };
        } else {
            return message.ERROR_NOT_FOUND;
        }
    } catch (error) {
        console.error('Erro no controlador ao buscar ficha técnica por ID:', error);
        return message.ERROR_INTERNAL_SERVER_CONTROLLER;
    }
};

// Buscar ficha técnica por ID do produto
const buscarFichaTecnicaPorProduto = async function(produtoId) {
    try {
        if (!produtoId || isNaN(produtoId)) {
            return message.ERROR_INVALID_ID;
        }

        const resultDadosFicha = await fichaTecnicaDAO.selectByProdutoId(produtoId);

        if (resultDadosFicha && resultDadosFicha.length > 0) {
            return {
                status: true,
                status_code: 200,
                fichaTecnica: resultDadosFicha[0]
            };
        } else {
            return message.ERROR_NOT_FOUND;
        }
    } catch (error) {
        console.error('Erro no controlador ao buscar ficha técnica por produto:', error);
        return message.ERROR_INTERNAL_SERVER_CONTROLLER;
    }
};

// Atualizar ficha técnica
const atualizarFichaTecnica = async function(id, dadosFichaTecnica, contentType) {
    try {
        if (String(contentType).toLowerCase() !== 'application/json') {
            return message.ERROR_CONTENT_TYPE;
        }

        if (!id || isNaN(id)) {
            return message.ERROR_INVALID_ID;
        }

        // Se estiver tentando atualizar o produto, verifica se o novo produto existe
        if (dadosFichaTecnica.produtoId) {
            const produto = await produtoDAO.selectByIdProduto(dadosFichaTecnica.produtoId);
            if (!produto || produto.length === 0) {
                return {
                    status: false,
                    status_code: 404,
                    message: 'Produto não encontrado'
                };
            }
        }

        // Atualiza a ficha técnica
        const resultDadosFicha = await fichaTecnicaDAO.updateFichaTecnica(id, dadosFichaTecnica);

        if (resultDadosFicha && resultDadosFicha.error) {
            return {
                status: false,
                status_code: 400,
                message: resultDadosFicha.error
            };
        }

        if (resultDadosFicha) {
            return {
                ...message.SUCESS_UPDATED_ITEM,
                data: resultDadosFicha.data
            };
        } else {
            return message.ERROR_INTERNAL_SERVER_MODEL;
        }
    } catch (error) {
        console.error('Erro no controlador ao atualizar ficha técnica:', error);
        return message.ERROR_INTERNAL_SERVER_CONTROLLER;
    }
};

// Deletar ficha técnica
const deletarFichaTecnica = async function(id) {
    try {
        if (!id || isNaN(id)) {
            return message.ERROR_INVALID_ID;
        }

        const resultDadosFicha = await fichaTecnicaDAO.deleteFichaTecnica(id);

        if (resultDadosFicha) {
            return {
                status: true,
                status_code: 200,
                message: 'Ficha técnica excluída com sucesso.'
            };
        } else {
            return message.ERROR_INTERNAL_SERVER_MODEL;
        }
    } catch (error) {
        console.error('Erro no controlador ao deletar ficha técnica:', error);
        return message.ERROR_INTERNAL_SERVER_CONTROLLER;
    }
};

module.exports = {
    inserirFichaTecnica,
    buscarFichaTecnicaPorId,
    buscarFichaTecnicaPorProduto,
    atualizarFichaTecnica,
    deletarFichaTecnica
};