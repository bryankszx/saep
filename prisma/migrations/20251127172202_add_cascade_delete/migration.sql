-- DropForeignKey
ALTER TABLE `estoque` DROP FOREIGN KEY `Estoque_produtoId_fkey`;

-- DropForeignKey
ALTER TABLE `fichatecnica` DROP FOREIGN KEY `FichaTecnica_produtoId_fkey`;

-- DropForeignKey
ALTER TABLE `produto` DROP FOREIGN KEY `Produto_categoriaId_fkey`;

-- DropForeignKey
ALTER TABLE `produto` DROP FOREIGN KEY `Produto_fabricanteId_fkey`;

-- AddForeignKey
ALTER TABLE `Produto` ADD CONSTRAINT `Produto_fabricanteId_fkey` FOREIGN KEY (`fabricanteId`) REFERENCES `Fabricante`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Produto` ADD CONSTRAINT `Produto_categoriaId_fkey` FOREIGN KEY (`categoriaId`) REFERENCES `Categoria`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FichaTecnica` ADD CONSTRAINT `FichaTecnica_produtoId_fkey` FOREIGN KEY (`produtoId`) REFERENCES `Produto`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Estoque` ADD CONSTRAINT `Estoque_produtoId_fkey` FOREIGN KEY (`produtoId`) REFERENCES `Produto`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
