/*
  Warnings:

  - You are about to drop the column `content` on the `Form` table. All the data in the column will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `name` to the `Form` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Form" DROP CONSTRAINT "Form_userId_fkey";

-- AlterTable
ALTER TABLE "Form" DROP COLUMN "content",
ADD COLUMN     "name" TEXT NOT NULL;

-- DropTable
DROP TABLE "User";
