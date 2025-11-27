const message = require('../../modulo/config.js');
const fabricanteDAO = require('../../model/DAO/fabricante');

// Inserir um novo fabricante
const inserirFabricante = async function(dadosFabricante, contentType) {
    try {
        if (String(contentType).toLowerCase() !== 'application/json') {
            return message.ERROR_CONTENT_TYPE;
        }

        // Validação dos campos obrigatórios
        if (
            !dadosFabricante.nomefabricante || 
            !dadosFabricante.paisorigem
        ) {
            return message.ERROR_REQUIRED_FIELDS;
        }

        // Insere o fabricante
        const resultDadosFabricante = await fabricanteDAO.insertFabricante({
            nome: dadosFabricante.nomefabricante,
            paisorigem: dadosFabricante.paisorigem
        });

        if (resultDadosFabricante.error) {
            return {
                status: false,
                status_code: 400,
                message: resultDadosFabricante.error
            };
        }

        if (resultDadosFabricante) {
            return message.SUCESS_CREATED_ITEM;
        } else {
            return message.ERROR_INTERNAL_SERVER_MODEL;
        }
    } catch (error) {
        console.error('Erro no controlador ao inserir fabricante:', error);
        return message.ERROR_INTERNAL_SERVER_CONTROLLER;
    }
};

// Listar todos os fabricantes
const listarFabricantes = async function() {
    try {
        const dadosFabricantes = {};
        const resultDadosFabricantes = await fabricanteDAO.selectAllFabricantes();

        if (resultDadosFabricantes && resultDadosFabricantes.length > 0) {
            dadosFabricantes.status = true;
            dadosFabricantes.status_code = 200;
            dadosFabricantes.quantidade = resultDadosFabricantes.length;
            dadosFabricantes.fabricantes = resultDadosFabricantes;

            return dadosFabricantes;
        } else {
            return message.ERROR_NOT_FOUND;
        }
    } catch (error) {
        console.error('Erro no controlador ao listar fabricantes:', error);
        return message.ERROR_INTERNAL_SERVER_CONTROLLER;
    }
};

// Buscar fabricante por ID
const buscarFabricante = async function(id) {
    try {
        if (!id || id === '' || id === undefined || isNaN(id)) {
            return message.ERROR_REQUIRED_FIELDS;
        }

        const dadosFabricante = {};
        const resultDadosFabricante = await fabricanteDAO.selectByIdFabricante(id);

        if (resultDadosFabricante && resultDadosFabricante.length > 0) {
            dadosFabricante.status = true;
            dadosFabricante.status_code = 200;
            dadosFabricante.fabricante = resultDadosFabricante[0];

            return dadosFabricante;
        } else {
            return message.ERROR_NOT_FOUND;
        }
    } catch (error) {
        console.error('Erro no controlador ao buscar fabricante por ID:', error);
        return message.ERROR_INTERNAL_SERVER_CONTROLLER;
    }
};

// Atualizar fabricante
const atualizarFabricante = async function(id, dadosFabricante, contentType) {
    try {
        if (String(contentType).toLowerCase() !== 'application/json') {
            return message.ERROR_CONTENT_TYPE;
        }

        if (!id || isNaN(id)) {
            return message.ERROR_INVALID_ID;
        }

        // Validação do CNPJ, se fornecido
        if (dadosFabricante.cnpj) {
            const cnpjRegex = /^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/;
            if (!cnpjRegex.test(dadosFabricante.cnpj)) {
                return {
                    status: false,
                    status_code: 400,
                    message: 'CNPJ inválido. Formato esperado: XX.XXX.XXX/XXXX-XX'
                };
            }
        }

        // Atualiza o fabricante
        const resultDadosFabricante = await fabricanteDAO.updateFabricante(id, dadosFabricante);

        if (resultDadosFabricante && resultDadosFabricante.error) {
            return {
                status: false,
                status_code: 400,
                message: resultDadosFabricante.error
            };
        }

        if (resultDadosFabricante) {
            return message.SUCESS_UPDATED_ITEM;
        } else {
            return message.ERROR_INTERNAL_SERVER_MODEL;
        }
    } catch (error) {
        console.error('Erro no controlador ao atualizar fabricante:', error);
        return message.ERROR_INTERNAL_SERVER_CONTROLLER;
    }
};

// Deletar fabricante
const deletarFabricante = async function(id) {
    try {
        if (!id || isNaN(id)) {
            return message.ERROR_INVALID_ID;
        }

        const resultDadosFabricante = await fabricanteDAO.deleteFabricante(id);

        if (resultDadosFabricante && resultDadosFabricante.error) {
            return {
                status: false,
                status_code: 400,
                message: resultDadosFabricante.error
            };
        }

        if (resultDadosFabricante) {
            return {
                status: true,
                status_code: 200,
                message: 'Fabricante excluído com sucesso.'
            };
        } else {
            return message.ERROR_INTERNAL_SERVER_MODEL;
        }
    } catch (error) {
        console.error('Erro no controlador ao deletar fabricante:', error);
        return message.ERROR_INTERNAL_SERVER_CONTROLLER;
    }
};

module.exports = {
    inserirFabricante,
    listarFabricantes,
    buscarFabricante,
    atualizarFabricante,
    deletarFabricante
};