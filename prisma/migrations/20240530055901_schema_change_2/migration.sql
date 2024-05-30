/*
  Warnings:

  - The primary key for the `Form` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "Form" DROP CONSTRAINT "Form_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Form_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Form_id_seq";
