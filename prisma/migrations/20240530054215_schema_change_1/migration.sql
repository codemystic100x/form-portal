/*
  Warnings:

  - The primary key for the `Form` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Form` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `contributionReview` to the `Form` table without a default value. This is not possible if the table is not empty.
  - Added the required column `walletAddress` to the `Form` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Form" DROP CONSTRAINT "Form_pkey",
ADD COLUMN     "contributionReview" TEXT NOT NULL,
ADD COLUMN     "walletAddress" TEXT NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Form_pkey" PRIMARY KEY ("id");

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "clerkId" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_clerkId_key" ON "User"("clerkId");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Form" ADD CONSTRAINT "Form_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
