-- CreateTable
CREATE TABLE "Pokemon" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "types" TEXT[],
    "abilities" TEXT[],

    CONSTRAINT "Pokemon_pkey" PRIMARY KEY ("id")
);
