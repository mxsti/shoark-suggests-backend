import fetch from 'cross-fetch';

export const getSerie = async (imdbId: String): Promise<Suggestion> => {
    const omdb_key = process.env.OMDB_KEY;
    return fetch(`http://omdbapi.com/?apikey=${omdb_key}&i=${imdbId}`)
        .then((response) => response.json())
        .then((data) => {
            const suggestion: Suggestion = {
                name: data.Title,
                genre: data.Genre,
                rating: data.imdbRating,
                streamingService: "Netflix",
            };
            return suggestion;
        });
};