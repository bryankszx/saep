const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const categoriaDAO = {
    // Inserir uma nova categoria
    insertCategoria: async function(dadosCategoria) {
        try {
            // Verifica se já existe uma categoria com o mesmo nome
            const categoriaExistente = await prisma.categoria.findFirst({
                where: {
                    nome: dadosCategoria.nome
                }
            });

            if (categoriaExistente) {
                return { error: 'Já existe uma categoria com este nome' };
            }

            const result = await prisma.categoria.create({
                data: {
                    nome: dadosCategoria.nome
                }
            });
            return result;
        } catch (error) {
            console.error('Erro no DAO ao inserir categoria:', error);
            return false;
        }
    },

    // Buscar todas as categorias
    selectAllCategorias: async function() {
        try {
            const result = await prisma.categoria.findMany({
                orderBy: {
                    nome: 'asc'
                }
            });
            return result;
        } catch (error) {
            console.error('Erro no DAO ao buscar todas as categorias:', error);
            return false;
        }
    },

    // Buscar categoria por ID
    selectByIdCategoria: async function(id) {
        try {
            const result = await prisma.categoria.findUnique({
                where: {
                    id: parseInt(id, 10)
                }
            });
            return result ? [result] : [];
        } catch (error) {
            console.error('Erro no DAO ao buscar categoria por ID:', error);
            return false;
        }
    },

    // Atualizar categoria
    updateCategoria: async function(id, dadosCategoria) {
        try {
            // Verifica se a categoria existe
            const categoriaExistente = await prisma.categoria.findUnique({
                where: { id: parseInt(id, 10) }
            });

            if (!categoriaExistente) {
                return { error: 'Categoria não encontrada' };
            }

            // Verifica se já existe outra categoria com o mesmo nome
            if (dadosCategoria.nome) {
                const nomeExistente = await prisma.categoria.findFirst({
                    where: {
                        nome: dadosCategoria.nome,
                        NOT: {
                            id: parseInt(id, 10)
                        }
                    }
                });

                if (nomeExistente) {
                    return { error: 'Já existe outra categoria com este nome' };
                }
            }

            const result = await prisma.categoria.update({
                where: { id: parseInt(id, 10) },
                data: {
                    nome: dadosCategoria.nome || categoriaExistente.nome
                }
            });

            return { success: true, data: result };
        } catch (error) {
            console.error('Erro no DAO ao atualizar categoria:', error);
            return false;
        }
    },

    // Deletar categoria
    deleteCategoria: async function(id) {
        try {
            // Verifica se existem produtos associados a esta categoria
            const produtosAssociados = await prisma.produto.findFirst({
                where: { categoriaId: parseInt(id, 10) }
            });

            if (produtosAssociados) {
                return { 
                    error: 'Não é possível excluir a categoria pois existem produtos associados a ela.' 
                };
            }

            const result = await prisma.categoria.delete({
                where: { id: parseInt(id, 10) }
            });

            return { success: true, message: 'Categoria excluída com sucesso.' };
        } catch (error) {
            console.error('Erro no DAO ao deletar categoria:', error);
            return false;
        }
    }
};

module.exports = categoriaDAO;