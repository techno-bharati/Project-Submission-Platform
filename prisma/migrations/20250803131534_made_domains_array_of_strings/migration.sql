/*
  Warnings:

  - The `domain` column on the `Projects` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "public"."Projects" DROP COLUMN "domain",
ADD COLUMN     "domain" TEXT[];
