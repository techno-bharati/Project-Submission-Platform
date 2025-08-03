/*
  Warnings:

  - Changed the type of `domain` on the `Projects` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "public"."ProjectDomains" AS ENUM ('WebDevelopment', 'MobileAppDevelopment', 'MachineLearning', 'ArtificialIntelligence', 'DataScience', 'CyberSecurity', 'InternetOfThings', 'Blockchain', 'Robotics', 'EmbeddedSystems', 'ComputerVision', 'FinTech', 'EdTech', 'HealthTech', 'Others');

-- AlterTable
ALTER TABLE "public"."Projects" DROP COLUMN "domain",
ADD COLUMN     "domain" "public"."ProjectDomains" NOT NULL;
