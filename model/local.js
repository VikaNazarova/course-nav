let localCourses;

function loadLocalCourses(){
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'data.json', true);

    xhr.onload = function(){
      if(this.status == 200){
          localCourses = JSON.parse(this.responseText);

      }
    }

    xhr.send();
  }

  loadLocalCourses();