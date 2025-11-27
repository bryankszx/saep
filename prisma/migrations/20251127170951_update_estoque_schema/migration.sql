/*
  Warnings:

  - You are about to drop the column `descricao` on the `categoria` table. All the data in the column will be lost.
  - You are about to drop the column `data` on the `estoque` table. All the data in the column will be lost.
  - You are about to drop the column `motivo` on the `estoque` table. All the data in the column will be lost.
  - You are about to drop the column `observacao` on the `estoque` table. All the data in the column will be lost.
  - You are about to drop the column `quantidade` on the `estoque` table. All the data in the column will be lost.
  - You are about to drop the column `tipo` on the `estoque` table. All the data in the column will be lost.
  - You are about to drop the column `endereco` on the `fabricante` table. All the data in the column will be lost.
  - You are about to drop the column `telefone` on the `fabricante` table. All the data in the column will be lost.
  - You are about to drop the column `descricao` on the `produto` table. All the data in the column will be lost.
  - Added the required column `estoqueMinimo` to the `Estoque` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quantidadeAtual` to the `Estoque` table without a default value. This is not possible if the table is not empty.
  - Made the column `descricao` on table `fichatecnica` required. This step will fail if there are existing NULL values in that column.
  - Made the column `especificacoes` on table `fichatecnica` required. This step will fail if there are existing NULL values in that column.
  - Made the column `instrucoesUso` on table `fichatecnica` required. This step will fail if there are existing NULL values in that column.
  - Made the column `informacoesNutricionais` on table `fichatecnica` required. This step will fail if there are existing NULL values in that column.
  - Made the column `peso` on table `fichatecnica` required. This step will fail if there are existing NULL values in that column.
  - Made the column `dimensoes` on table `fichatecnica` required. This step will fail if there are existing NULL values in that column.
  - Made the column `garantia` on table `fichatecnica` required. This step will fail if there are existing NULL values in that column.
  - Made the column `fabricanteId` on table `produto` required. This step will fail if there are existing NULL values in that column.
  - Made the column `categoriaId` on table `produto` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `produto` DROP FOREIGN KEY `Produto_categoriaId_fkey`;

-- DropForeignKey
ALTER TABLE `produto` DROP FOREIGN KEY `Produto_fabricanteId_fkey`;

-- AlterTable
ALTER TABLE `categoria` DROP COLUMN `descricao`;

-- AlterTable
ALTER TABLE `estoque` DROP COLUMN `data`,
    DROP COLUMN `motivo`,
    DROP COLUMN `observacao`,
    DROP COLUMN `quantidade`,
    DROP COLUMN `tipo`,
    ADD COLUMN `estoqueMinimo` INTEGER NOT NULL,
    ADD COLUMN `quantidadeAtual` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `fabricante` DROP COLUMN `endereco`,
    DROP COLUMN `telefone`;

-- AlterTable
ALTER TABLE `fichatecnica` MODIFY `descricao` VARCHAR(191) NOT NULL,
    MODIFY `especificacoes` VARCHAR(191) NOT NULL,
    MODIFY `instrucoesUso` VARCHAR(191) NOT NULL,
    MODIFY `informacoesNutricionais` VARCHAR(191) NOT NULL,
    MODIFY `peso` VARCHAR(191) NOT NULL,
    MODIFY `dimensoes` VARCHAR(191) NOT NULL,
    MODIFY `garantia` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `produto` DROP COLUMN `descricao`,
    MODIFY `fabricanteId` INTEGER NOT NULL,
    MODIFY `categoriaId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Produto` ADD CONSTRAINT `Produto_fabricanteId_fkey` FOREIGN KEY (`fabricanteId`) REFERENCES `Fabricante`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Produto` ADD CONSTRAINT `Produto_categoriaId_fkey` FOREIGN KEY (`categoriaId`) REFERENCES `Categoria`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
