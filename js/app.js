import 'regenerator-runtime/runtime'
import * as dataService from './services';
import { closeModal } from './utils';
import { cardTemplate } from './templates/cardTemplate';
import { modalTemplate } from './templates/modalTemplate';

const searchInput = document.getElementById('search'),
	  searchSection = document.getElementById('searchMovies'),
	  latestMoviesSection =  document.getElementById('latestMovies'),
	  modalTrailer = document.getElementById('trailer'),
	  loading = document.querySelector('.loading');

let gernes = null,
	isSearchMode = false,
	isReady = false,
	page = 1,
	searchPage = 1,
	searchText = '';

// Show Cards of Movies
const showMovies = async (page) => {
	isSearchMode = searchText !== '' ? true : false;

	//Intiate movies
	var movies = null;

	// Getting the data
	// if searchText !== null show cards from search otherwise shows cards from now in Theaters
	if ( isSearchMode ) {
		var entryNode = searchSection;
			movies = await dataService.fetchSearchResults(searchText, page);

		// If there is no results
		if (movies.results.length === 0) {
			return;
		}

		// Initialize sectioNode
		latestMoviesSection.classList.add('section--hide');
		searchSection.classList.remove('section--hide');
	} else {
		var entryNode = latestMoviesSection;
			movies = await dataService.fetchLatestMovies(page);

		// Hide search section
		searchSection.classList.add('section--hide');
		searchSection.classList.remove('section--hide');
	}

	// Only the first time fill the gernes with data
	if (!gernes)
	    gernes = await dataService.fetchGenres();

	cardTemplate(movies, entryNode, gernes);
}

// Get data for modal and call modalTemplate
const openDetail = async (id) => {
	const details = await dataService.fetchMovieDetails(id);
		  
	modalTemplate(details);
}

// Featch new movies after scolling
const fetchNewData = () => {
	// Load more data
	if ( isSearchMode ) {
		searchPage++;
		showMovies(searchPage);
	} else {
		page++;
		showMovies(page);
	}
}

// Event handling on click
window.addEventListener('click', function(e) {
    if (e.srcElement.id === 'search') return;

	// Check when user clicks inside of movieCard
	if ( e.srcElement.id == 'movieCard' ) {

		// Get the id of movie from data attribute
		const movieid = e.srcElement.dataset.movieId;
		openDetail(movieid);
	}

	if ( e.srcElement.classList.contains('modal__close') ) {
		closeModal();
	}

	// On click of simiral movie title search for this movie
	if ( e.srcElement.classList.contains('modal__body__simiral__title')) {
		searchText = e.srcElement.dataset.movietitle;

		searchSection.textContent = '';
		showMovies(searchText);
		closeModal();
	}

	// On click of logo show in theaters section
	if ( e.srcElement.id == 'logo' && latestMoviesSection.classList.contains('section--hide')) {
		latestMoviesSection.classList.remove('section--hide');
		searchSection.classList.add('section--hide');
	}
});

// Search for a movie
searchInput.addEventListener('keyup', (e) => {
	// Global searchText variable change the searchMode to true
	searchText = e.target.value;

	if (searchText === '') {
		latestMoviesSection.classList.remove('section--hide');
		searchSection.classList.add('section--hide');
	} else {

		// Clear previous search results
		searchSection.textContent = '';
		showMovies();
	}	
});

// Infinitive scroll
window.addEventListener('scroll', () => {
	const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
	
	if(isReady + clientHeight + scrollTop >= scrollHeight - 5) {
		fetchNewData();
	}
});

// Initially load the first 20 movies in Theaters
showMovies();
