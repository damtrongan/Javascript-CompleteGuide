const addMovieBtn = document.getElementById("add-movie-btn");
const searchBtn = document.getElementById("search-btn");

const movies = [];

const renderMovies = (filter = "") => {
  const movieList = document.getElementById("movie-list");

  if (movies.length === 0) {
    movieList.classList.remove("visible");
    return;
  } else {
    movieList.classList.add("visible");
  }
  movieList.innerHTML = "";

  const filteredMovies = !filter
    ? movies
    : movies.filter((movie) => movie.info.title.includes(filter));

  filteredMovies.forEach((movie) => {
    const movieEl = document.createElement("li");
    const { info , ...otherProp} = movie;  // Lấy ra từ movie thuộc tính info và các thuộc tính còn lại
    //const {title : movieTitle} = info    // Assign cho title sau khi lấy ra từ info name khác 
    let { getFormattedTitle } = movie;
    //getFormattedTitle = getFormattedTitle.bind(movie)
    let text = getFormattedTitle.call(movie) + " - ";
    for (const key in movie.info) {
      if (key !== "title" && key !== "_title") {
        text = text + `${key}: ${info[key]}`;
      }
    }
    movieEl.textContent = text;
    movieList.append(movieEl);
  });
};

const addMovieHandler = () => { 
  const title = document.getElementById("title").value;
  const extraName = document.getElementById("extra-name").value;
  const extraValue = document.getElementById("extra-value").value;

  if (
    extraName.trim() === "" ||
    extraValue.trim() === ""
  ) {
    return;
  }

  const newMovie = {
    info: {
      set title(val) {
        if(val.trim() === ""){
          this._title = "DEFAULT";
          return;
        }
        this._title = val;
      },
      get title(){
        return this._title.toUpperCase();
      },
      [extraName]: extraValue,
    },
    
    id: Math.random().toString(),
    getFormattedTitle() {
      return (this.info.title.toUpperCase());
    }
  };

  newMovie.info.title = title;
  console.log(title);
  movies.push(newMovie);
  console.log(newMovie);
  renderMovies();
};

const searchMovieHandler = () => {
  const filterItem = document.getElementById("filter-title").value;
  console.log(filterItem);
  renderMovies(filterItem);
};

addMovieBtn.addEventListener("click", addMovieHandler);
searchBtn.addEventListener("click", searchMovieHandler);
