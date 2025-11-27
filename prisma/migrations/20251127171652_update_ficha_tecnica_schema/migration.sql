/*
  Warnings:

  - You are about to drop the column `descricao` on the `fichatecnica` table. All the data in the column will be lost.
  - You are about to drop the column `dimensoes` on the `fichatecnica` table. All the data in the column will be lost.
  - You are about to drop the column `especificacoes` on the `fichatecnica` table. All the data in the column will be lost.
  - You are about to drop the column `garantia` on the `fichatecnica` table. All the data in the column will be lost.
  - You are about to drop the column `informacoesNutricionais` on the `fichatecnica` table. All the data in the column will be lost.
  - You are about to drop the column `instrucoesUso` on the `fichatecnica` table. All the data in the column will be lost.
  - You are about to drop the column `peso` on the `fichatecnica` table. All the data in the column will be lost.
  - Added the required column `especificacao` to the `FichaTecnica` table without a default value. This is not possible if the table is not empty.
  - Added the required column `valor` to the `FichaTecnica` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `fichatecnica` DROP COLUMN `descricao`,
    DROP COLUMN `dimensoes`,
    DROP COLUMN `especificacoes`,
    DROP COLUMN `garantia`,
    DROP COLUMN `informacoesNutricionais`,
    DROP COLUMN `instrucoesUso`,
    DROP COLUMN `peso`,
    ADD COLUMN `especificacao` VARCHAR(191) NOT NULL,
    ADD COLUMN `valor` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE INDEX `FichaTecnica_produtoId_idx` ON `FichaTecnica`(`produtoId`);
