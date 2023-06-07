/*
  Warnings:

  - The primary key for the `Bug` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "Bug" DROP CONSTRAINT "Bug_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Bug_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Bug_id_seq";
