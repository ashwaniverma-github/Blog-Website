-- Drop the existing tables
DROP TABLE IF EXISTS "Post";
DROP TABLE IF EXISTS "User";

-- Recreate the tables with the new schema
CREATE TABLE "User" (
    "id" SERIAL PRIMARY KEY,
    "email" VARCHAR(255) UNIQUE NOT NULL,
    "name" VARCHAR(255),
    "password" VARCHAR(255) NOT NULL
);

CREATE TABLE "Post" (
    "id" SERIAL PRIMARY KEY,
    "title" VARCHAR(255) NOT NULL,
    "content" TEXT NOT NULL,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "authorId" INTEGER NOT NULL,
    FOREIGN KEY ("authorId") REFERENCES "User"("id")
);
