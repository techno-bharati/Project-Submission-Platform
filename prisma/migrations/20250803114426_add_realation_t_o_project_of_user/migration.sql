/*
  Warnings:

  - Added the required column `userId` to the `Projects` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
ALTER TYPE "public"."ProjectVerificationStatus" ADD VALUE 'REJECTED';

-- AlterTable
ALTER TABLE "public"."Projects" ADD COLUMN     "userId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."Projects" ADD CONSTRAINT "Projects_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
