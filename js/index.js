var key = '7039b220',
    baseurl = 'https://www.omdbapi.com/?apikey=' + key;

var app = new Vue({
  el: '#movies-container',
  data: {
    movies: []
  },
  components: {
    'movies': {
      props: ['movieresult'],
      template: '<div class="img" :data-id="movieresult.imdbID" @click="loadDetails(movieresult.imdbID)"><img :src="movieresult.Poster"></div>',
      methods: {
        loadDetails: function(id) {
          loadMovie(id);
        }
      }
    }
  }
});

var modalApp = new Vue({
  el: '#movie-modal',
  data: {
    Title: '',
    Year: '',
    Plot: ''
  }
});

function searchMovies(keyword) {
  $.ajax({
    url: baseurl + '&s=' + encodeURIComponent(keyword)
  }).then(function(data) {
    console.log(data.Search);
    var movieArray = [];
    for (var i = 0; i < data.Search.length; i++) {
      if (data.Search[i].Poster != "N/A") {
        movieArray.push(data.Search[i]);
      }
    }
    app.movies = movieArray;
  });
}

function loadMovie(id) {
  $.ajax({
    url: baseurl + '&i=' + id
  }).then(function(data) {
    modalApp.Title = data.Title;
    modalApp.Year = data.Year;
    modalApp.Plot = data.Plot;
    $('#movie-modal').modal('show');
  });
}

searchMovies('beirut');

$('#btnMovieSearch').on('click', function() {
  var $txt = $('#txtMovieSearch');
  
  if ($txt.val() != '') {
    searchMovies($txt.val());
  }
});