// Create a template of card
export const cardTemplate = (movies, entryNode, gernes) => {
	
	for (let i = 0; i < movies.results.length; i++) {

		const	movie = movies.results[i],
				genresIds = movie.genre_ids,
				movieId = movie.id,
				imgUrl = '',
				sumOfGernes = [];

		if (movie.poster_path)
			imgUrl = 'https://image.tmdb.org/t/p/w220_and_h330_face' + movie.poster_path;

	    // Get the genres of its movie
	    for (let j = 0; j < genresIds.length; j++) {
	        sumOfGernes.push(gernes.genres.filter(item => item.id === genresIds[j] )[0].name);
	    }
	    
	    if (!movie.release_date) return;
	    
		const cardTemplate =
			`<div class="movie-card" id="movieCard" data-movie-id="${movieId}">
				<div class="movie-card__image">
					<img src='${imgUrl}'>
				</div>
				<div class="movie-card__details">
					<div class="movie-card__details__title">${movie.title}</div>
					<div class="movie-card__details__year"><span class="movie-card__details--label">Year: </span> ${movie.release_date.split('-')[0]}</div>
					<div class="movie-card__details__rate"><span class="movie-card__details--label">Rates: </span> ${movie.vote_average}/10</div>
					<div class="movie-card__details__gerne"><span class="movie-card__details--label"> Gerne: </span> ${sumOfGernes.join(' | ')}</div>
					
					<div class="movie-card__details__overview">${movie.overview}</div>
				</div>
			</div>`

		//Render card template
		entryNode.insertAdjacentHTML('beforeend', cardTemplate);
	}
}