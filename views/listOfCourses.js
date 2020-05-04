function showListOfCourses(arrOfCourses) {
    for (var i = arrOfCourses.length - 1; i >= 0; i--) {
        var output = document.getElementById('allCourses');
        output.innerHTML += `<div>
        <h3>${arrOfCourses[i].name}</h3>
        <img src="${arrOfCourses[i].image}">
        <p>Rating: ${arrOfCourses[i].rating}/5</p>
        <a href="${arrOfCourses[i].link}">Go to course</a>
        </div>`;
    }
}

showListOfCourses(localCourses);