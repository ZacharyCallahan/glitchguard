/*
  Warnings:

  - Added the required column `color` to the `Bug` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Bug" ADD COLUMN     "color" TEXT NOT NULL;
