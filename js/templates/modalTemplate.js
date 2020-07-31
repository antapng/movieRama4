const modalWrapper = document.getElementById('movieDetails');

// modalTemplate with details of movies - triggers on click of card
export const modalTemplate = (details) => {
	const entryNode = modalWrapper;
	// Initialize modal
	entryNode.textContent = '';
	
	// Prevent body from scrolling when a modal is opened
	document.body.classList.add('modal-open');

	const modalTemplate =
		`<div id="modal" class="modal modal--show">
			<div class="modal__header">
				<h3 class="modal__title">${details.original_title}</h3>
				<a class="modal__close modal__close--x">&#x2715;</a>
			</div>
			<div  class="modal__body">
				<div class="modal__body__trailer">${ details.trailers.youtube.length > 0 ? trailerTemplate(details.trailers.youtube) : '' }</div>
				<div class="modal__body__simiral">${ details.similar.results.length > 0 ? simiralMoviesTemplate(details.similar.results) : '' }</div>
				<div class="modal__body__reviews">${ details.reviews.results.length > 0 ? reviewsTemplate(details.reviews.results) : '' }</div>
			</div>		
		</div>`;

	modalWrapper.classList.add('modal--layer');
	entryNode.insertAdjacentHTML('beforeend', modalTemplate);
}

// Template with the trailer of movie - inside of modal template
const trailerTemplate = (trailerDetails) => {
	let	videoName = '',
		videoSource = '';

	// Get the name and the source of video
	trailerDetails.forEach(video => {
		if (video.type === 'Trailer' ) {
			videoName = video.name;
			videoSource = video.source;
		}
	});

	return `<div class="modal__body__trailer__title modal__body--subtitle">${videoName}</div>
			<iframe class="modal__body__trailer__video" width="560" height="315" src="https://www.youtube.com/embed/${videoSource}"
			frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>`	
}


// Template with reviews - inside of modal template
const reviewsTemplate = (reviewsDetails) => {
	return `<div class="modal__body__reviews__title modal__body--subtitle ">Reviews</div>
			
				${Object.keys(reviewsDetails).map(function (index) {
			        return `<div class="modal__body__reviews__details">
			        			<div class="modal__body__reviews__author">
			        				<span class="modal__body--label">Author: </span> ${reviewsDetails[index].author}
			        			</div>
			        			<div class="modal__body__reviews__content">${reviewsDetails[index].content}</div>
			        		</div>`       
			    }).join("")}`	
}

// Template with simiral movies  - inside of modal template
const simiralMoviesTemplate = (simiralMovies) => {
	return `<div class="modal__body__simiral__title modal__body--subtitle ">Simiral Movies</div>
		${Object.keys(simiralMovies).map(function (index) {
	        return `<div class="modal__body__simiral__title" data-movieTitle="${simiralMovies[index].original_title}">
	        			<span class="modal__body--label">Title: </span> ${simiralMovies[index].original_title}
	        		</div>`   
	    }).join("")}`	
}
