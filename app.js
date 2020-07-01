// Module of getting courses (local file)
    //MODULE
    let localCourses;
        
    function loadLocalCourses(callback) {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', 'data.json', true);
        xhr.addEventListener('load', () => {
            const response = JSON.parse(xhr.responseText);
            callback(response);
        });
    
        xhr.addEventListener('error', () => {
            console.log('Not connected to resource');
        });
    
        xhr.send();
    }  

    //VIEW
    function showListOfCourses(arr) {
        for (var {name: name, image: image, rating: rating, link: link} of arr) {
            let outputWrapper = document.getElementById('allCourses');
            let output = document.createElement('div');
            output.innerHTML = `
            <h3>${name}</h3>
            <img src=".${image}">
            <p>Rating: ${rating}/5</p>
            <a href="${link}">Go to course</a>`;
            outputWrapper.appendChild(output);
        }
    }

    //CONTROLLER

    // Event of page loading
    document.addEventListener('DOMContentLoaded', e => {
        loadLocalCourses(showListOfCourses);
    });

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
        
        loadLocalCourses(getSearchResult);
        
    });

    // here should be also an event of actually submitting search query with pushing search button
    // and it might or might not lead to another page ??? idk
