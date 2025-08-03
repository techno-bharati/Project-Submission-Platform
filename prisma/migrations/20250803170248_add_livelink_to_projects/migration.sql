/*
  Warnings:

  - Added the required column `liveLink` to the `Projects` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Projects" ADD COLUMN     "liveLink" TEXT NOT NULL;
