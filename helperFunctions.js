export function sort2dArray(arr) {
    for (let i = 0; i < arr.length; i++) {
        for (let j = i + 1; j < arr.length - 1; j++) {
            if (arr[i][1] < arr[j][1]) {
                let tempRating = arr[i][1];
                let tempTitle = arr[i][0];
                arr[i][1] = arr[j][1];
                arr[i][0] = arr[j][0];
                arr[j][1] = tempRating;
                arr[j][0] = tempTitle;
            }
        }
    }
    return arr;
}

export function sumAllRating(arr) {
    let result = [];
    for (let i = 0; i < arr[0].length; i++) {
        let sum = 0;
        for (let j = 0; j < arr.length; j++) {
            sum += arr[j][i][1];
        }
        result.push([arr[0][i][0], sum]);
    }
    return result;
}
// let niceList = {};
// for (let i = 0; i < movieList.length; i++) {
//     for (let j = 0; j < goodList.length; j++) {
//         if (
//             movieList[i].title
//                 .toLowerCase()
//                 .includes(goodList[j].Series_Title.toLowerCase())
//         ) {
//             let kekw = goodList[j].Poster_Link.substring(
//                 0,
//                 goodList[j].Poster_Link.lastIndexOf("@") + 1
//             );
//             kekw = kekw + ".jpg";
//             niceList[movieList[i].title] = kekw;
//         }
//     }
// }

// document.getElementById("movie-list").innerHTML = JSON.stringify(niceList);

// console.log(niceList);
