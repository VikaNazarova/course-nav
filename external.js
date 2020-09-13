// Module of getting courses (>External API)

fetch('https://gist.githubusercontent.com/VikaNazarova/18108021850f79e70fbdc46a62056293/raw/45bb37abc84868f2c78bc83de541438700cdcbc9/gistfile1.txt')
.then(response => response.json())
.then(courses => showListOfCourses(courses))
.catch(err => ifError(err));

let outputWrapper = document.getElementById('allCourses');

function showListOfCourses(arr) {
  for (var {course_title, image, description, link} of arr) {
      let output = document.createElement('div');
      output.innerHTML = `
      <h3>${course_title}</h3>
      <img src="${image}">
      <p>${description}</p>
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

function outputSearchResult(result) {
    searchResults.innerHTML = '';
    let output = document.createElement('div');
    output.innerHTML = `<h2>Search results: </h2>`;

    if (result.length !== 0) {
        for (var {course_title, image, description, link} of result) {
            output.innerHTML += `
            <div>
                <h3>${course_title}</h3>
                <img src="${image}">
                <p>${description}</p>
                <a href="${link}">Go to course</a>
            <div>`;
        }

    } else {
        output.innerHTML += `<p>No results</p>`;
    }

    output.innerHTML += `<br><hr>`;
    searchResults.appendChild(output);
}

searchField.addEventListener('keyup', function(e){ // here should be probably also an event of actually submitting search query with pushing search button
    let searchQuery = e.target.value;

    fetch('https://gist.githubusercontent.com/VikaNazarova/18108021850f79e70fbdc46a62056293/raw/45bb37abc84868f2c78bc83de541438700cdcbc9/gistfile1.txt')
    .then(response => response.json())
    .then(courses => 
        outputSearchResult(
            courses.filter(course => course.course_title.toLowerCase().includes(searchQuery.toLowerCase()))
        )
    ) 
    .catch(err => ifError(err));
});

//end of module