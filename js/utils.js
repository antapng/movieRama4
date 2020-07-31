const modalWrapper = document.getElementById('movieDetails');

export function closeModal() {
	const modal = document.getElementById('modal');
	modal.classList.add('modal--hide');

	// In order to display animation of close use timeout
	setTimeout(function(){
		document.body.classList.remove('modal-open');
		modal.classList.remove('modal--show');
		modalWrapper.classList.remove('modal--layer');
	}, 800);
}