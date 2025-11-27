const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const fichaTecnicaDAO = {
    // Inserir uma nova ficha técnica
    insertFichaTecnica: async function(dadosFichaTecnica) {
        try {
            const result = await prisma.fichaTecnica.create({
                data: {
                    produtoId: parseInt(dadosFichaTecnica.produtoId, 10),
                    especificacao: dadosFichaTecnica.especificacao,
                    valor: dadosFichaTecnica.valor
                }
            });
            return result;
        } catch (error) {
            console.error('Erro no DAO ao inserir ficha técnica:', error);
            return false;
        }
    },

    // Buscar ficha técnica por ID
    selectByIdFichaTecnica: async function(id) {
        try {
            const result = await prisma.fichaTecnica.findUnique({
                where: {
                    id: parseInt(id, 10)
                },
                include: {
                    produto: true
                }
            });
            return result ? [result] : [];
        } catch (error) {
            console.error('Erro no DAO ao buscar ficha técnica por ID:', error);
            return false;
        }
    },

    // Buscar ficha técnica por ID do produto
    selectByProdutoId: async function(produtoId) {
        try {
            const result = await prisma.fichaTecnica.findMany({
                where: {
                    produtoId: parseInt(produtoId, 10)
                },
                include: {
                    produto: true
                }
            });
            return result;
        } catch (error) {
            console.error('Erro no DAO ao buscar ficha técnica por produto:', error);
            return false;
        }
    },

    // Atualizar ficha técnica
    updateFichaTecnica: async function(id, dadosFichaTecnica) {
        try {
            const fichaExistente = await prisma.fichaTecnica.findUnique({
                where: { id: parseInt(id, 10) }
            });

            if (!fichaExistente) {
                return { error: 'Ficha técnica não encontrada' };
            }

            // Verifica se está tentando alterar o produto para um que já tem ficha técnica
            if (dadosFichaTecnica.produtoId && 
                dadosFichaTecnica.produtoId !== fichaExistente.produtoId) {
                
                const outraFicha = await prisma.fichaTecnica.findFirst({
                    where: {
                        produtoId: parseInt(dadosFichaTecnica.produtoId, 10),
                        NOT: { id: parseInt(id, 10) }
                    }
                });

                if (outraFicha) {
                    return { error: 'Já existe uma ficha técnica para este produto' };
                }
            }

            const result = await prisma.fichaTecnica.update({
                where: { id: parseInt(id, 10) },
                data: {
                    especificacao: dadosFichaTecnica.especificacao || fichaExistente.especificacao,
                    valor: dadosFichaTecnica.valor || fichaExistente.valor,
                    produtoId: dadosFichaTecnica.produtoId ? 
                             parseInt(dadosFichaTecnica.produtoId, 10) : fichaExistente.produtoId
                }
            });

            return { success: true, data: result };
        } catch (error) {
            console.error('Erro no DAO ao atualizar ficha técnica:', error);
            return false;
        }
    },

    // Deletar ficha técnica
    deleteFichaTecnica: async function(id) {
        try {
            const result = await prisma.fichaTecnica.delete({
                where: { id: parseInt(id, 10) }
            });

            return { success: true, message: 'Ficha técnica excluída com sucesso.' };
        } catch (error) {
            console.error('Erro no DAO ao deletar ficha técnica:', error);
            return false;
        }
    }
};

module.exports = fichaTecnicaDAO;