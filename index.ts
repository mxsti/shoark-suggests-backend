import { PrismaClient } from '@prisma/client';
import express from 'express';
import { Request, Response } from 'express';
import { getSerie } from './utils/omdb';

require('dotenv').config();
const app = express();
app.use(express.json());
const prisma = new PrismaClient();

// post new movie/series
app.post('/', async (req: Request, res: Response) => {
    // only need imdb id from request
    const imdbId = req.body.imdbId;
    if (imdbId) {
        // grab movie/series data from omdb api
        const suggestion: Suggestion = await getSerie(imdbId);

        // create database entry
        await prisma.suggestion.create({
            data: {
                imdbId: imdbId,
                name: suggestion.name,
                genre: suggestion.genre,
                rating: suggestion.rating,
                streamingService: suggestion.streamingService,
            }
        });

        res.send(`created ${JSON.stringify(suggestion)}`);

        // TODO error handling I guess
    } else {
        res.send("id not found");
    }
});

app.get('/', async (req: Request, res: Response) => {
    const suggestions: Suggestion[] = await prisma.suggestion.findMany();
    res.send(suggestions);
});

app.listen(3000, () => {
    console.log("listening...");
});

module.exports = app;