const data = {
  type: 'pop', // pop, rock, other
  artists: null,
  loading: true,
};

const appElement = document.querySelector('.App');
const uniqueGenre = [ ];
let filter= null;
// `` -> template stringovi
// const / let

//function handleArtistClick(language) {
  //alert('yay ' + language)
//}

function renderArtist(artist) {
  return `
  <div class="content">
  <div class="name">${ artist.name }</div>
  <div class="genre">${ artist.genre }</div>
  </div>
  `;
}

function renderGenre(genre) {
  return `
  <button id="${genre}" onclick="filterGenre(this.id)"/>${genre}</button>
  `;
}

function filterGenre(clicked_id) {
   for (i=0; i < data.artists.length; i++) {
     if (data.artists[i].genre===clicked_id) {
     document.getElementsByClassName('content')[i].style.display="";
      } else {
      document.getElementsByClassName('content')[i].style.display="none";
      }
   }

   // content = data.artists.filter(function(artist) {
     //  return artist.genre===clicked_id;
     //}).map(function(artist) {
       //return renderArtist(artist);
     //});

       //content = content.join('');
       //console.log (content);
}

function Search(){
   filter=document.getElementById('myInput').value.toUpperCase();
  for (i=0; i < data.artists.length; i++) {
    if (document.getElementsByClassName('name')[i].innerHTML.toUpperCase().indexOf(filter)>-1) {
    document.getElementsByClassName('content')[i].style.display="";
     } else {
     document.getElementsByClassName('content')[i].style.display="none";
     }
  }
}

function render() {
  appElement.innerHTML = '';

  let content = null;

  if (data.loading) {
    content = 'Loading...';
  } else {
    // mapiramo niz projekata, na niz divova
    content = data.artists.map(function(artist) {
      return renderArtist(artist);
    });
    // spojimo niz u jedan string
    content = content.join('');
  }

  let genre = null;

  for (i=0; i < uniqueGenre.length; i++)  {
    // mapiramo niz žanrova, na niz divova
    genre = uniqueGenre.map(function(genre) {
    return renderGenre(genre);
  });
  // spojimo niz u jedan string
 genre = genre.join('');
 }

  appElement.innerHTML = `
    <div class="title">${ data.type }</div>
    <input type="text" id="myInput" onkeyup="Search()" placeholder="Search for names...">
    <div class="buttons">
      ${ genre }
    </div>
    <div class="container">
      ${ content }
    </div>
  `;
}

function getData() {
  data.loading = true;
//  let uniqueGenre = [ ];

  render();

  fetch('http://rocketlaunch.me/tmp/kara-api/' + data.type + '.json')
  // `http://rocketlaunch.me/tmp/kara-api/${ data.type }.json`
    .then(function(response) {
      return response.json();
    })
    .then(function(json) {
      // ovaj json je u stvari onaj "return response.json();" odozgo
      data.artists = json;
      data.loading = false;
      // izdvoji zanrove za filtere
    for (i=0; i < data.artists.length; i++) {
    if (uniqueGenre.indexOf(data.artists[i].genre)===-1) { ///indexOF==-1 ako element ne postoji u nizu
        uniqueGenre.push(data.artists[i].genre); //dodaj ga na listu jedinstvenih
        }
      }
    //  console.log(uniqueGenre);
      render();
    });
}


getData();
