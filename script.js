import { movieList } from "./list.js";
import { sort2dArray } from "./helperFunctions.js";
import { sumAllRating } from "./helperFunctions.js";

import { movieBanner, pagination } from "./htmlBuilder.js";
import { getSimilarMovies, getMovies } from "./recommendationEngine.js";

let moviePerPage = 25;
let ratedMovies = {};
let currentPage = 0;

movieBanner(moviePerPage, 0, ratedMovies, movieList);
pagination(currentPage, moviePerPage, ratedMovies);

let recomendMe = document.getElementById("recommendMe");

recomendMe.addEventListener("click", function () {
    let watchedMovies = [];
    for (let movie in ratedMovies) {
        watchedMovies.push([movieList[movie].Series_Title, ratedMovies[movie]]);
    }
    let similarMovies = getMovies(watchedMovies);
    similarMovies = sumAllRating(similarMovies);

    similarMovies = sort2dArray(similarMovies);

    let recommendedMovies = [];
    let offset = 0;
    for (let i = 0; i < moviePerPage + offset; i++) {
        let index = movieList.findIndex(
            (j) => j.Series_Title === similarMovies[i][0]
        );

        if (
            watchedMovies.findIndex(
                (k) => k[0] === movieList[index].Series_Title
            ) === -1
        ) {
            recommendedMovies.push(movieList[index]);
        } else {
            offset++;
        }
    }
    movieBanner(moviePerPage, 0, ratedMovies, recommendedMovies);
});

let searchButton = document.getElementById("searchButton");
// Recommendation engine

searchButton.addEventListener("click", function () {
    let searchQuery = document.getElementById("searchQuery");
    let query = searchQuery.value;
    query = query.replace(/[^\w\s]/g, "").toLowerCase();
    console.log(query);

    let result = [];
    for (let i = 0; i < movieList.length; i++) {
        if (
            movieList[i].Series_Title.replace(/[^\w\s]/g, "")
                .toLowerCase()
                .includes(query)
        ) {
            result.push(movieList[i]);
        }
    }
    movieBanner(moviePerPage, 0, ratedMovies, result);
});
