// Module of getting courses (External API)

fetch('https://gist.githubusercontent.com/VikaNazarova/18108021850f79e70fbdc46a62056293/raw/2f05dceca54ea0332417525fba6a700b49434c27/gistfile1.txt')
.then(response => response.json())
.then(courses => showListOfCourses(courses))
.catch(err => ifError(err));

let outputWrapper = document.getElementById('allCourses');

function showListOfCourses(arr) {

    //limited arr for developmet
    arr.length = 10;
    console.log(arr);

  for (var {course_title, image, description, link, provider, price} of arr) {
      let output = document.createElement('div');
      output.classList.add('card');
      var shortDesc = description.substr(0, 200) + "...";
      output.innerHTML = `
      <a href="${link}">
        <img src="${image}">
      </a>
      <h3>${course_title}</h3>
      <div>
        <small>by ${provider}, </small>
        <small>${price}</small>
      </div>
      <p>${shortDesc}</p>
      <a href="${link}">Go to course</a>`;
      outputWrapper.appendChild(output);
  }
}

function ifError(err) {
  console.log(err);
  let output = document.createElement('div');
  output.innerHTML = `<h2>Sorry, we cant get courses :(</h2>`;
  outputWrapper.appendChild(output);
}

//end of module

// Module of search

let searchResults = document.querySelector('#searchResults');
let searchField = document.querySelector('#searchField');
// let searchButton = document.querySelector('#searchButton');
let searchForm = document.querySelector('#searchForm');

function outputSearchResult(result) {
    searchResults.innerHTML = '';
    searchResults.style.background = '#eee';
    let output = document.createElement('div');
    //output.innerHTML = `<h2>Search results: </h2>`;
    output.classList.add('card-deck');
    if (result.length !== 0) {
        for (var {course_title, image, description, link, provider, price} of result) {
            var shortDesc = description.substr(0, 200) + "...";
            output.innerHTML += `
            <div class="card">
                <img src="${image}">
                <h3>${course_title}</h3>
                <div>
                <small>by ${provider}, </small>
                <small>${price}</small>
                </div>
                <p>${shortDesc}</p>
                <a href="${link}">Go to course</a>
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

//end of module