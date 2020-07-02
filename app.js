// Module of getting courses (local file)
    //MODULE

    fetch('data.json')
	  .then(response => response.json())
	  .then(courses => showListOfCourses(courses))
	  .catch(err => ifError(err));

    //VIEW
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
    //MODULE
    function getSearchResult(arr){
        
        let result = arr.find(course => course.name === arr).name

        return result;
    }

    //VIEW
    let searchResults = document.querySelector('#searchResults');

    function outputSearchResult (result) {
        
        // actual result is probably gonna be deconstructed and showed in a better way lol
        searchResults.innerHTML = `<p>${result}</p>`;
    }

    //CONTROLLER
    // Event of inputting search
    let searchField = document.querySelector('#searchField');

    searchField.addEventListener('keyup', function(e){
        let searchQuery = e.target.value;
        
        //loadLocalCourses(getSearchResult);
        
    });

    // here should be also an event of actually submitting search query with pushing search button
    // and it might or might not lead to another page ??? idk
