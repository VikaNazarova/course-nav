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
            <img src="${image}">
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

// Module of search