/*
  Warnings:

  - You are about to drop the `reviews` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "reviews";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Review" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "publisher" TEXT NOT NULL,
    "published" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "read" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "memo" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "Review_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
