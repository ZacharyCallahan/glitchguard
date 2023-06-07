/*
  Warnings:

  - The primary key for the `Bug` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `boardId` on the `Bug` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Bug` table. All the data in the column will be lost.
  - The `id` column on the `Bug` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `listId` to the `Bug` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Bug` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Bug" DROP CONSTRAINT "Bug_boardId_fkey";

-- AlterTable
ALTER TABLE "Bug" DROP CONSTRAINT "Bug_pkey",
DROP COLUMN "boardId",
DROP COLUMN "title",
ADD COLUMN     "listId" INTEGER NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Bug_pkey" PRIMARY KEY ("id");

-- CreateTable
CREATE TABLE "List" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "boardId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "List_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "List" ADD CONSTRAINT "List_boardId_fkey" FOREIGN KEY ("boardId") REFERENCES "Board"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bug" ADD CONSTRAINT "Bug_listId_fkey" FOREIGN KEY ("listId") REFERENCES "List"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
