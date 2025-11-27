const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const fabricanteDAO = {
    // Inserir um novo fabricante
    insertFabricante: async function(dadosFabricante) {
        try {
            // Verifica se já existe um fabricante com o mesmo nome
            const fabricanteExistente = await prisma.fabricante.findFirst({
                where: {
                    nome: dadosFabricante.nome
                }
            });

            if (fabricanteExistente) {
                return { error: 'Já existe um fabricante com este nome' };
            }

            const result = await prisma.fabricante.create({
                data: {
                    nome: dadosFabricante.nome,
                    paisorigem: dadosFabricante.paisorigem
                }
            });
            return result;
        } catch (error) {
            console.error('Erro no DAO ao inserir fabricante:', error);
            return false;
        }
    },

    // Buscar todos os fabricantes
    selectAllFabricantes: async function() {
        try {
            const result = await prisma.fabricante.findMany({
                orderBy: {
                    nome: 'asc'
                }
            });
            return result;
        } catch (error) {
            console.error('Erro no DAO ao buscar todos os fabricantes:', error);
            return false;
        }
    },

    // Buscar fabricante por ID
    selectByIdFabricante: async function(id) {
        try {
            const result = await prisma.fabricante.findUnique({
                where: {
                    id: parseInt(id, 10)
                }
            });
            return result ? [result] : [];
        } catch (error) {
            console.error('Erro no DAO ao buscar fabricante por ID:', error);
            return false;
        }
    },

    // Atualizar fabricante
    updateFabricante: async function(id, dadosFabricante) {
        try {
            // Verifica se o fabricante existe
            const fabricanteExistente = await prisma.fabricante.findUnique({
                where: { id: parseInt(id, 10) }
            });

            if (!fabricanteExistente) {
                return { error: 'Fabricante não encontrado' };
            }

            // Verifica se já existe outro fabricante com o mesmo nome
            if (dadosFabricante.nome) {
                const nomeExistente = await prisma.fabricante.findFirst({
                    where: {
                        nome: dadosFabricante.nome,
                        NOT: {
                            id: parseInt(id, 10)
                        }
                    }
                });

                if (nomeExistente) {
                    return { error: 'Já existe outro fabricante com este nome' };
                }
            }

            const result = await prisma.fabricante.update({
                where: { id: parseInt(id, 10) },
                data: {
                    nome: dadosFabricante.nome || fabricanteExistente.nome,
                    paisorigem: dadosFabricante.paisorigem || fabricanteExistente.paisorigem
                }
            });

            return { success: true, data: result };
        } catch (error) {
            console.error('Erro no DAO ao atualizar fabricante:', error);
            return false;
        }
    },

    // Deletar fabricante
    deleteFabricante: async function(id) {
        try {
            // Verifica se existem produtos associados a este fabricante
            const produtosAssociados = await prisma.produto.findFirst({
                where: { fabricanteId: parseInt(id, 10) }
            });

            if (produtosAssociados) {
                return { error: 'Não é possível excluir o fabricante pois existem produtos associados a ele.' };
            }

            const result = await prisma.fabricante.delete({
                where: { id: parseInt(id, 10) }
            });

            return { success: true, message: 'Fabricante excluído com sucesso.' };
        } catch (error) {
            console.error('Erro no DAO ao deletar fabricante:', error);
            return false;
        }
    }
};

module.exports = fabricanteDAO;