const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const produtoDAO = {
    // Inserir um novo produto
insertProduto: async function(produto) {
    try {
        // Cria o objeto de dados básicos
        const data = {
            nome: produto.nome,
            preco: parseFloat(produto.preco),
            estoque: parseInt(produto.estoque, 10),
            categoria: {
                connect: { id: parseInt(produto.idcategoria, 10) }
            },
            fabricante: {
                connect: { id: parseInt(produto.idfabricante, 10) }
            }
        };

        const result = await prisma.produto.create({
            data: data
        });
        return result;
    } catch (error) {
        console.error('Erro no DAO ao inserir produto:', error);
        return false;
    }
},

    // Buscar todos os produtos
    selectAllProdutos: async function() {
        try {
            const result = await prisma.produto.findMany({
                orderBy: {
                    nome: 'asc'
                }
            });
            return result;
        } catch (error) {
            console.error('Erro no DAO ao buscar todos os produtos:', error);
            return false;
        }
    },

    // Buscar produto por ID
    selectByIdProduto: async function(id) {
        try {
            const result = await prisma.produto.findUnique({
                where: {
                    id: parseInt(id, 10)
                }
            });
            return result ? [result] : [];
        } catch (error) {
            console.error('Erro no DAO ao buscar produto por ID:', error);
            return false;
        }
    },

    // Atualizar produto
    updateProduto: async function(dadosProduto) {
        try {
            // Cria o objeto de dados básicos
            const data = {
                nome: dadosProduto.nome,
                preco: parseFloat(dadosProduto.preco),
                estoque: parseInt(dadosProduto.estoque, 10)
            };

            // Atualiza a categoria apenas se fornecida
            if (dadosProduto.idcategoria !== undefined) {
                data.categoria = dadosProduto.idcategoria 
                    ? { connect: { id: parseInt(dadosProduto.idcategoria, 10) } }
                    : { disconnect: true };
            }

            // Atualiza o fabricante apenas se fornecido
            if (dadosProduto.idfabricante !== undefined) {
                data.fabricante = dadosProduto.idfabricante
                    ? { connect: { id: parseInt(dadosProduto.idfabricante, 10) } }
                    : { disconnect: true };
            }

            const result = await prisma.produto.update({
                where: { id: parseInt(dadosProduto.id, 10) },
                data: data
            });
            return result;
        } catch (error) {
            console.error('Erro no DAO ao atualizar produto:', error);
            return false;
        }
    },

    // Deletar produto
    deleteProduto: async function(id) {
        try {
            await prisma.produto.delete({
                where: {
                    id: parseInt(id, 10)
                }
            });
            return true;
        } catch (error) {
            console.error('Erro no DAO ao deletar produto:', error);
            return false;
        }
    },

    // Atualizar estoque do produto
    updateEstoqueProduto: async function(id, novoEstoque) {
        try {
            const result = await prisma.produto.update({
                where: {
                    id: parseInt(id, 10)
                },
                data: {
                    estoque: parseInt(novoEstoque, 10)
                }
            });
            return result;
        } catch (error) {
            console.error('Erro no DAO ao atualizar estoque:', error);
            return false;
        }
    },

    // Buscar produtos por categoria
    selectByCategoria: async function(categoria) {
        try {
            const result = await prisma.produto.findMany({
                where: {
                    categoria: categoria
                },
                orderBy: {
                    nome: 'asc'
                }
            });
            return result;
        } catch (error) {
            console.error('Erro no DAO ao buscar produtos por categoria:', error);
            return false;
        }
    },

    // Buscar produtos com estoque mínimo
    selectByEstoqueMinimo: async function(estoqueMinimo) {
        try {
            const result = await prisma.produto.findMany({
                where: {
                    estoque: {
                        lte: parseInt(estoqueMinimo, 10)
                    }
                },
                orderBy: {
                    nome: 'asc'
                }
            });
            return result;
        } catch (error) {
            console.error('Erro no DAO ao buscar produtos com estoque mínimo:', error);
            return false;
        }
    },
    
    selectByNome: async function(nome) {
        try {
            const result = await prisma.produto.findMany({
                where: {
                    nome: {
                        contains: nome
                    }
                }
            });
            return result;
        } catch (error) {
            console.error('Erro no DAO ao buscar produto por nome:', error);
            return false;
        }
    }
};

module.exports = produtoDAO;
