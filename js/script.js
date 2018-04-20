const slider = document.querySelector('.slider');
const previous = document.querySelector('.previous');
const next = document.querySelector('.next');

const imgArr = ['1', '2', '3'];

let imgs = [];
let numberOfImgs = 3;
let widthSlide = 190;
let animation = false;
let currentSlide = 0;

var getRandomNumber = function (minNumber, maxNumber) {
	return Math.floor(Math.random() * (maxNumber - minNumber + 1) + minNumber);
};

var getWithoutRepeat = function (array) {
	var index = getRandomNumber(0, array.length - 1);
	var randomResult = array[index];
	array.splice(index, 1);
	return randomResult;
};

var createImg = function () {
	var img = 'img/fans_' + getWithoutRepeat(imgArr) + '.png';
	return img;
}

var createAllImg = function (count) {
	for (var i = 0; i < count; i++) {
		imgs[i] = createImg();
	}
}

createAllImg(numberOfImgs);

var createSlide = function (array) {
	var slide = document.createElement('div');
	var wrapCircle = document.createElement('div');
	var fans = document.createElement('img');

	slide.classList.add('slide');
	wrapCircle.classList.add('wrap-circle');
	fans.classList.add('fans');
	fans.setAttribute('src', array);
	wrapCircle.appendChild(fans);
	slide.appendChild(wrapCircle);

	return slide;
}

var createAllSlides = function (count) {
	var fragment = document.createDocumentFragment();
	for (var i = 0; i < count.length; i++) {
		fragment.appendChild(createSlide(imgs[i]));
	}
	slider.appendChild(fragment);
}

createAllSlides(imgs);

let slides = document.querySelectorAll('.slide');
slides.forEach(function (slide) {
	slide.addEventListener('animationend', function (ev) {
		slide.style.transition = 'inherit';

		if (ev.animationName === 'right') {
			slide.style.left = '0';
			slide.classList.remove('right');

			setTimeout(function () {
				goToCenter('right');
			}, 10);
		} else if (ev.animationName === 'left') {
			slide.style.left = '760px';
			slide.classList.remove('left');

			setTimeout(function () {
				goToCenter('left');
			}, 10);
		}
	});
});

previous.addEventListener('click', function () {
	if (animation) return;
	goToRight();
});

var goToRight = function () {
	animation = true;
	let maxLeftValue = 0;

	slides.forEach(function (slide, index) {
		let style = getComputedStyle(slide);
		let leftValue = parseInt(style.getPropertyValue('left'));
		if (leftValue > maxLeftValue) {
			maxLeftValue = leftValue;
			currentSlide = index;
		}
	});
	slides[currentSlide].classList.add('right');
}

next.addEventListener('click', function () {
	if (animation) return;
	goToLeft();
});

var goToLeft = function () {
	animation = true;
	let minLeftValue = document.querySelector('.slider').offsetWidth;

	slides.forEach(function (slide, index) {
		let style = getComputedStyle(slide);
		let leftValue = parseInt(style.getPropertyValue('left'));

		if (leftValue < minLeftValue) {
			minLeftValue = leftValue;
			currentSlide = index;
		}
	});
	slides[currentSlide].classList.add('left');
}

var goToCenter = function (side) {
	let step = (side === 'right') ? widthSlide : -widthSlide;

	slides.forEach(function (slide, index) {
		slide.style.transition = '1s';
		let style = getComputedStyle(slide);
		let leftValue = parseInt(style.getPropertyValue('left'));
		slide.style.left = leftValue + step + 'px';
	});

	setTimeout(function () {
		animation = false;
	}, 1000);
}