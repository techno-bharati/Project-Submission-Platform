/*
  Warnings:

  - You are about to drop the column `pptUrl` on the `Projects` table. All the data in the column will be lost.
  - You are about to drop the column `synopsis` on the `Projects` table. All the data in the column will be lost.
  - You are about to drop the column `teamMembers` on the `Projects` table. All the data in the column will be lost.
  - Added the required column `zip` to the `Projects` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Projects" DROP COLUMN "pptUrl",
DROP COLUMN "synopsis",
DROP COLUMN "teamMembers",
ADD COLUMN     "zip" TEXT NOT NULL;
