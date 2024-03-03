-- CreateTable
CREATE TABLE "CreateMessages" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL DEFAULT '',
    "email" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "userId" INTEGER,
    "dateInitial" TIMESTAMP(3) NOT NULL,
    "dateFinally" TIMESTAMP(3) NOT NULL,
    "taskConcluided" BOOLEAN NOT NULL,

    CONSTRAINT "CreateMessages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CreateUser" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "admin" BOOLEAN NOT NULL,

    CONSTRAINT "CreateUser_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CreateUser_email_key" ON "CreateUser"("email");

-- AddForeignKey
ALTER TABLE "CreateMessages" ADD CONSTRAINT "CreateMessages_userId_fkey" FOREIGN KEY ("userId") REFERENCES "CreateUser"("id") ON DELETE SET NULL ON UPDATE CASCADE;
