/*
  Warnings:

  - The primary key for the `Board` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `guardId` on the `Board` table. All the data in the column will be lost.
  - The `id` column on the `Board` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Guard` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `userId` on the `Guard` table. All the data in the column will be lost.
  - The `id` column on the `Guard` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- DropForeignKey
ALTER TABLE "Board" DROP CONSTRAINT "Board_guardId_fkey";

-- DropForeignKey
ALTER TABLE "Guard" DROP CONSTRAINT "Guard_userId_fkey";

-- AlterTable
ALTER TABLE "Board" DROP CONSTRAINT "Board_pkey",
DROP COLUMN "guardId",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Board_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Guard" DROP CONSTRAINT "Guard_pkey",
DROP COLUMN "userId",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Guard_pkey" PRIMARY KEY ("id");
