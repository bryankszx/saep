const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const estoqueDAO = {
    // Inserir uma nova movimentação de estoque
    insertMovimentacao: async function(dadosMovimentacao) {
        try {
            const result = await prisma.movimentacaoEstoque.create({
                data: {
                    produtoId: parseInt(dadosMovimentacao.produtoId, 10),
                    quantidade: parseInt(dadosMovimentacao.quantidade, 10),
                    tipo: dadosMovimentacao.tipo,
                    observacao: dadosMovimentacao.observacao || null,
                    data: dadosMovimentacao.data || new Date()
                }
            });
            return result;
        } catch (error) {
            console.error('Erro no DAO ao registrar movimentação:', error);
            return false;
        }
    },

    // Buscar todas as movimentações
    selectAllMovimentacoes: async function() {
        try {
            const result = await prisma.movimentacaoEstoque.findMany({
                include: {
                    produto: true
                },
                orderBy: {
                    data: 'desc'
                }
            });
            return result;
        } catch (error) {
            console.error('Erro no DAO ao buscar todas as movimentações:', error);
            return false;
        }
    },

    // Buscar movimentação por ID
    selectByIdMovimentacao: async function(id) {
        try {
            const result = await prisma.movimentacaoEstoque.findUnique({
                where: {
                    id: parseInt(id, 10)
                },
                include: {
                    produto: true
                }
            });
            return result ? [result] : [];
        } catch (error) {
            console.error('Erro no DAO ao buscar movimentação por ID:', error);
            return false;
        }
    },

    // Buscar movimentações por produto
    selectByProdutoId: async function(produtoId) {
        try {
            const result = await prisma.movimentacaoEstoque.findMany({
                where: {
                    produtoId: parseInt(produtoId, 10)
                },
                include: {
                    produto: true
                },
                orderBy: {
                    data: 'desc'
                }
            });
            return result;
        } catch (error) {
            console.error('Erro no DAO ao buscar movimentações por produto:', error);
            return false;
        }
    },

    // Atualizar saldo do produto
    updateSaldoProduto: async function(produtoId, quantidade, operacao = 'entrada') {
        try {
            const produto = await prisma.produto.findUnique({
                where: { id: parseInt(produtoId, 10) }
            });

            if (!produto) {
                return { error: 'Produto não encontrado' };
            }

            let novoSaldo = produto.estoque;
            if (operacao === 'entrada') {
                novoSaldo += parseInt(quantidade, 10);
            } else if (operacao === 'saida' || operacao === 'ajuste') {
                novoSaldo -= parseInt(quantidade, 10);
                if (novoSaldo < 0) {
                    return { error: 'Saldo insuficiente', saldoAtual: produto.estoque };
                }
            }

            const result = await prisma.produto.update({
                where: { id: parseInt(produtoId, 10) },
                data: { estoque: novoSaldo }
            });

            return { success: true, novoSaldo };
        } catch (error) {
            console.error('Erro no DAO ao atualizar saldo do produto:', error);
            return false;
        }
    },

    // Obter saldo atual do produto
    getSaldoAtual: async function(produtoId) {
        try {
            const produto = await prisma.produto.findUnique({
                where: { id: parseInt(produtoId, 10) },
                select: { estoque: true }
            });
            return produto ? produto.estoque : 0;
        } catch (error) {
            console.error('Erro no DAO ao obter saldo atual:', error);
            return false;
        }
    }
};

module.exports = estoqueDAO;