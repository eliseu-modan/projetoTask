-- AlterTable
ALTER TABLE "CreateMessages" ALTER COLUMN "email" DROP NOT NULL,
ALTER COLUMN "dateInitial" DROP NOT NULL,
ALTER COLUMN "dateFinally" DROP NOT NULL;