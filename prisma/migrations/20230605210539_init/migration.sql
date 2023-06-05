/*
  Warnings:

  - Added the required column `guardId` to the `Board` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Board" ADD COLUMN     "guardId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "_GuardToUser" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_GuardToUser_AB_unique" ON "_GuardToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_GuardToUser_B_index" ON "_GuardToUser"("B");

-- AddForeignKey
ALTER TABLE "Board" ADD CONSTRAINT "Board_guardId_fkey" FOREIGN KEY ("guardId") REFERENCES "Guard"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GuardToUser" ADD CONSTRAINT "_GuardToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Guard"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GuardToUser" ADD CONSTRAINT "_GuardToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
