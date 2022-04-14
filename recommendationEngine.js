import { curatedList } from "./list.js";

/*
watchedMovie input examples : 
watchedMovie  = ["Aliens (1986)",1]
*/
export function getSimilarMovies(watchedMovie) {
    let movies = curatedList[watchedMovie[0]];
    let rating = watchedMovie[1];
    let result = [];
    for (const title in movies) {
        let standardizeRating = movies[title] * (rating - 2.5);
        let temp = [title, standardizeRating];
        result.push(temp);
    }
    return result;
}

/*
watchedMovies input examples : 
watchedMovies  = [   
                    ["Aliens (1986)",1],
                    ["2001: A Space Odyssey (1968)",2]
                ]
*/
export function getMovies(watchedMovies) {
    let result = [];
    for (let i = 0; i < watchedMovies.length; i++) {
        result.push(getSimilarMovies(watchedMovies[i]));
    }
    return result;
}

// let similarMovies = getMovies([
//     ["Interstellar", 5],
//     ["Star Wars: Episode V - The Empire Strikes Back", 4],
// ]);
