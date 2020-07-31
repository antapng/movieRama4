const API_KEY = 'bc50218d91157b1ba4f142ef7baaa6a0';
const moviedb_url = "https://api.themoviedb.org/3";
let movies,gernes;

export const fetchLatestMovies = async (page) => {
	page = page || 1;
	return movies = await fetch(`${moviedb_url}/movie/now_playing?api_key=${API_KEY}&page=${page}`).then(
		res => res.json()
	);
}

export const fetchGenres = async (page) => {
	page = page || 1;
	return gernes = await fetch(`${moviedb_url}/genre/movie/list?api_key=${API_KEY}&page=${page}`).then(
		res => res.json()
	);
}

export const fetchSearchResults = async (searchText, page) => {
	page = page || 1;
	return movies = await fetch(`${moviedb_url}/search/movie?api_key=${API_KEY}&query=${searchText}&page=${page}`).then(
		res => res.json()
	);
}

export const fetchMovieDetails = async (movieId) => {
	return movies = await fetch(`${moviedb_url}/movie/${movieId}?api_key=${API_KEY}&append_to_response=trailers,reviews,similar`).then(
		res => res.json()
	);
}