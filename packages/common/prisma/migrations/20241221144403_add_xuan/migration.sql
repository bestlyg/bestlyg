-- CreateTable
CREATE TABLE "xuan" (
    "id" TEXT NOT NULL,
    "create_time" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_time" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "date" TIMESTAMP(3) NOT NULL,
    "weight" INTEGER,
    "danceTimes" INTEGER,

    CONSTRAINT "xuan_pkey" PRIMARY KEY ("id")
);
