// Module of getting courses (External API)
fetch('https://gist.githubusercontent.com/VikaNazarova/18108021850f79e70fbdc46a62056293/raw/2f05dceca54ea0332417525fba6a700b49434c27/gistfile1.txt')
.then(response => response.json())
.then(courses => showListOfCourses(courses))
.catch(err => ifError(err));

let outputWrapper = document.getElementById('allCourses');
let loadMore = document.getElementById('loadMore');

function showListOfCourses(arr) {
    slicedArr = arr.splice(0, 12);
    function itemShow(slicedArr) {
        for (var i = 0; i < slicedArr.length; i++) {
            //var {course_title, image, description, link, provider, price} of arr
            let {course_title, image, description, link, provider, price} = slicedArr[i];
            let output = document.createElement('div');
            output.classList.add('card');
            var shortDesc = description.substr(0, 200) + "...";
            output.innerHTML = `
            <a href="${link}" target="_blank">
                <img src="${image}">
            </a>
            <h3>${course_title}</h3>
            <div>
                <small>by ${provider}</small>
                <small>${(price == undefined) ? '' : '- '+price }</small>
            </div>
            <p>${shortDesc}</p>
            <a href="${link}" target="_blank">Go to course</a>`;
            outputWrapper.appendChild(output);
        }
    }
    itemShow(slicedArr);
    loadMore.addEventListener('click', function(e){
        slicedArr1 = arr.splice(0, 12);
        itemShow(slicedArr1);
    });
}

function ifError(err) {
    console.log(err);
    let output = document.createElement('div');
    output.innerHTML = `<h2>Sorry, we couldn't get courses :(</h2>`;
    outputWrapper.appendChild(output);
}

// Module of search
let searchResults = document.querySelector('#searchResults');
let searchField = document.querySelector('#searchField');
let searchForm = document.querySelector('#searchForm');

function outputSearchResult(result) {
    searchResults.innerHTML = '';
    searchResults.style.background = '#eee';
    let output = document.createElement('div');
    output.classList.add('card-deck');
    if (result.length !== 0) {
        for (var {course_title, image, description, link, provider, price} of result) {
            var shortDesc = description.substr(0, 200) + "...";
            output.innerHTML += `
            <div class="card">
                <a href="${link}" target="_blank">
                    <img src="${image}">
                </a>
                <h3>${course_title}</h3>
                <div>
                    <small>by ${provider}, </small>
                    <small>${price}</small>
                </div>
                <p>${shortDesc}</p>
                <a href="${link}" target="_blank">Go to course</a>
            <div>`;
        }
    } else {
        output.innerHTML += `<p>No results, try something different</p>`;
    }
    output.innerHTML += `<br>`;
    searchResults.innerHTML = '<h2>Search results: </h2>';
    searchResults.appendChild(output);
}

searchForm.addEventListener('submit', function(e){
        e.preventDefault();
        let searchQuery = searchField.value;

        fetch('https://gist.githubusercontent.com/VikaNazarova/18108021850f79e70fbdc46a62056293/raw/2f05dceca54ea0332417525fba6a700b49434c27/gistfile1.txt')
        .then(response => response.json())
        .then(courses => 
            outputSearchResult(
                courses.filter(course => course.course_title.toLowerCase().includes(searchQuery.toLowerCase()))
            )
        ) 
        .catch(err => ifError(err));
});

// searchField.addEventListener('keyup', function(e){
//     let searchQuery = e.target.value;

//     fetch('https://gist.githubusercontent.com/VikaNazarova/18108021850f79e70fbdc46a62056293/raw/45bb37abc84868f2c78bc83de541438700cdcbc9/gistfile1.txt')
//     .then(response => response.json())
//     .then(courses => 
//         outputSearchResult(
//             courses.filter(course => course.course_title.toLowerCase().includes(searchQuery.toLowerCase()))
//         )
//     ) 
//     .catch(err => ifError(err));
// });