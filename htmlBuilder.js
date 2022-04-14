import { movieList } from "./list.js";

export function movieBanner(moviePerPage, page, ratedMovies, arrMovies) {
    let movieBoxList = document.getElementById("movie-list");
    movieBoxList.innerHTML = "";
    let startIndex = page * moviePerPage;
    console.log(startIndex);
    for (
        let i = startIndex;
        i < moviePerPage + startIndex && i < arrMovies.length;
        i++
    ) {
        let movieBox = document.createElement("div");
        let imageContainer = document.createElement("div");
        let ratingContainer = document.createElement("div");
        let titleContainer = document.createElement("div");

        movieBox.classList.add("movie-box");
        imageContainer.classList.add("image-container");
        ratingContainer.classList.add("rating-container");
        titleContainer.classList.add("title-container");

        let img = document.createElement("img");
        img.src = arrMovies[i].Poster_Link;
        img.alt = arrMovies[i].Series_Title;

        imageContainer.appendChild(img);

        for (let i = 0; i < 5; i++) {
            let ratingStar = document.createElement("i");
            ratingStar.classList.add("fa");
            ratingStar.classList.add("fa-star");
            ratingContainer.appendChild(ratingStar);
        }

        let title = document.createElement("p");
        title.innerHTML = arrMovies[i].Series_Title;

        titleContainer.appendChild(title);

        movieBox.appendChild(imageContainer);
        movieBox.appendChild(ratingContainer);
        movieBox.appendChild(titleContainer);

        movieBoxList.appendChild(movieBox);
    }
    movieRating(ratedMovies);
}

function movieRating(ratedMovies) {
    let ratingContainer = document.getElementsByClassName("rating-container");
    let title = document.getElementsByClassName("title-container");
    for (let i = 0; i < ratingContainer.length; i++) {
        let element = ratingContainer[i].children;
        // console.log(element);
        let index = title[i].children[0].innerHTML.toString();
        index = movieList.findIndex((i) => i.Series_Title === index);

        for (let j = 0; j < element.length; j++) {
            if (ratedMovies[index] != null) {
                giveStars(element, ratedMovies[index]);
            }
            element[j].addEventListener("mouseover", function () {
                removeStars(element);

                giveStars(element, j);
            });

            element[j].addEventListener("mouseout", function () {
                removeStars(element);
                if (ratedMovies[index] != null) {
                    giveStars(element, ratedMovies[index]);
                }
            });
            element[j].addEventListener("click", function () {
                ratedMovies[index] = j;
                console.log(ratedMovies);
                console.log("you clicked star " + (j + 1));
            });
        }
    }
}

function giveStars(element, count) {
    for (let i = 0; i <= count; i++) {
        element[i].classList.add("checked");
    }
}
function removeStars(element) {
    for (let i = 0; i < element.length; i++) {
        element[i].classList.remove("checked");
    }
}

export function pagination(currentPage, moviePerPage, ratedMovies) {
    let paginationContainer = document.getElementById("pagination");
    paginationContainer.innerHTML = "";
    let totalPages = Math.ceil(movieList.length / moviePerPage);

    let prev = document.createElement("span");
    prev.innerHTML = "&laquo;";
    prev.addEventListener("click", function () {
        if (currentPage > 0) {
            currentPage -= 1;
            movieBanner(moviePerPage, currentPage, ratedMovies, movieList);
            pagination(currentPage, moviePerPage, ratedMovies);
        }
    });
    paginationContainer.appendChild(prev);

    let startIndex = Math.floor((currentPage + 1) / 6) * 6;
    startIndex = startIndex == 0 ? startIndex : startIndex - 1;
    for (let i = startIndex; i < startIndex + 7 && i < totalPages; i++) {
        let page = document.createElement("span");
        page.innerHTML = i + 1;
        if (i === currentPage) {
            page.classList.add("active");
        }
        page.addEventListener("click", function () {
            currentPage = Number(page.innerHTML) - 1;
            movieBanner(moviePerPage, currentPage, ratedMovies, movieList);
            pagination(currentPage, moviePerPage, ratedMovies);
        });

        paginationContainer.appendChild(page);
    }

    let next = document.createElement("span");
    next.innerHTML = "&raquo;";
    next.addEventListener("click", function () {
        if (currentPage < totalPages) {
            currentPage += 1;
            movieBanner(moviePerPage, currentPage, ratedMovies, movieList);
            pagination(currentPage, moviePerPage, ratedMovies);
        }
    });
    paginationContainer.appendChild(next);
}
