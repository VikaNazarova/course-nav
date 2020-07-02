// Module of getting courses (local file)

    fetch('data.json')
	  .then(response => response.json())
	  .then(courses => showListOfCourses(courses))
	  .catch(err => ifError(err));

    let outputWrapper = document.getElementById('allCourses');
   
    function showListOfCourses(arr) {
        for (var {name, image, rating, link} of arr) {
            let output = document.createElement('div');
            output.innerHTML = `
            <h3>${name}</h3>
            <img src=".${image}">
            <p>Rating: ${rating}/5</p>
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
        if (result.length !== 0) {
            for (var {name, image, rating, link} of result) {
                searchResults.innerHTML = `
                <h2>Search results: </h2>
                <div>
                    <h3>${name}</h3>
                    <img src=".${image}">
                    <p>Rating: ${rating}/5</p>
                    <a href="${link}">Go to course</a>
                </div>
                <br><hr>`;
            }
        } else {
            searchResults.innerHTML = `
            <h2>Search results: </h2>
            <p>No results</p>`;
        }
    }

    searchField.addEventListener('keyup', function(e){ // here should be probably also an event of actually submitting search query with pushing search button
        let searchQuery = e.target.value;

        fetch('data.json')
        .then(response => response.json())
        .then(courses => 
            outputSearchResult(
                courses.filter(course => course.name.includes(searchQuery))
            ) // it only gets one matching course =(
        ) 
        .catch(err => ifError(err));     
    });

//end of module