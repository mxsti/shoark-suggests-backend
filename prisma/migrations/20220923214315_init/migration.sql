-- CreateTable
CREATE TABLE "Suggestion" (
    "imdbId" STRING NOT NULL,
    "name" STRING NOT NULL,
    "genre" STRING NOT NULL,
    "rating" STRING NOT NULL,
    "streamingService" STRING NOT NULL,

    CONSTRAINT "Suggestion_pkey" PRIMARY KEY ("imdbId")
);
