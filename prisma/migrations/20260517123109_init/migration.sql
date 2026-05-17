-- CreateTable
CREATE TABLE "Palette" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT,
    "notes" TEXT,
    "tags" TEXT,
    "colors" TEXT NOT NULL,
    "harmonyType" TEXT NOT NULL,
    "seedColor" TEXT,
    "isFavorite" BOOLEAN NOT NULL DEFAULT false,
    "isSaved" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "collectionId" TEXT,
    CONSTRAINT "Palette_collectionId_fkey" FOREIGN KEY ("collectionId") REFERENCES "Collection" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "PaletteHistory" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "paletteId" TEXT,
    "action" TEXT NOT NULL,
    "colors" TEXT NOT NULL,
    "metadata" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "PaletteHistory_paletteId_fkey" FOREIGN KEY ("paletteId") REFERENCES "Palette" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Collection" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "AccessibilityResult" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "paletteId" TEXT NOT NULL,
    "results" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "AccessibilityResult_paletteId_fkey" FOREIGN KEY ("paletteId") REFERENCES "Palette" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ExportRecord" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "paletteId" TEXT NOT NULL,
    "format" TEXT NOT NULL,
    "metadata" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "ExportRecord_paletteId_fkey" FOREIGN KEY ("paletteId") REFERENCES "Palette" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "UserSetting" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "key" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "UserSetting_key_key" ON "UserSetting"("key");
