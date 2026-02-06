-- CreateEnum
CREATE TYPE "ListType" AS ENUM ('inbox', 'today', 'upcoming', 'anytime', 'someday');

-- CreateEnum
CREATE TYPE "TaskStatus" AS ENUM ('pending', 'completed', 'deleted');

-- CreateTable
CREATE TABLE "Task" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "notes" TEXT,
    "listType" "ListType" NOT NULL DEFAULT 'inbox',
    "status" "TaskStatus" NOT NULL DEFAULT 'pending',
    "scheduledDate" DATE,
    "scheduledTime" TIME,
    "isOverdue" BOOLEAN NOT NULL DEFAULT false,
    "originalScheduledDate" DATE,
    "originalScheduledTime" TIME,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "completedAt" TIMESTAMP(3),
    "position" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Task_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Task_listType_idx" ON "Task"("listType");

-- CreateIndex
CREATE INDEX "Task_status_idx" ON "Task"("status");

-- CreateIndex
CREATE INDEX "Task_scheduledDate_idx" ON "Task"("scheduledDate");

-- CreateIndex
CREATE INDEX "Task_listType_status_idx" ON "Task"("listType", "status");
