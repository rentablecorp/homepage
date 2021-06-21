
/* SLIDERS SETTINGS */

// Initiate Deposits slider

var sliderDepositsSettings = {
  slidesToShow: 1,
  slidesToScroll: 1,
  mobileFirst: true,
  infinite: true,
  variableWidth: true,
  arrows: false,
}

var sliderDeposits = $('.js-slider-deposits');
if ($(this).width() < 768 && !sliderDeposits.hasClass('slick-initialized')) {
  sliderDeposits.slick(sliderDepositsSettings);
}

$(window).resize(function () {
  if ($(this).width() < 768 && !sliderDeposits.hasClass('slick-initialized')) {
    sliderDeposits.slick(sliderDepositsSettings);
  } else if ($(this).width() >= 768 && sliderDeposits.hasClass('slick-initialized')) {
    sliderDeposits.slick('unslick');
  }
});

// Initiate Testimonials sliders

var $slickSliderNav = $('.js-slider-nav');
var $pagination = $('.js-pagination');

$slickSliderNav.on('init reInit afterChange', function (event, slick, currentSlide, nextSlide) {
  //currentSlide is undefined on init -- set it to 0 in this case (currentSlide is 0 based)
  var currentSlideNumber = (currentSlide ? currentSlide : 0) + 1;
  var formattedCurrentSlideNumber = currentSlideNumber.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false});
  var slideCountNumber = slick.slideCount;
  var formattedSlideCountNumber = slideCountNumber.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false});
  $pagination.html('<span class="current-slide">' + formattedCurrentSlideNumber + '</span><span class="dash"></span>' + formattedSlideCountNumber);
});

$('.js-slider-for').slick({
  slidesToShow: 1,
  slidesToScroll: 1,
  asNavFor: '.js-slider-nav',
  fade: true,
  arrows: false,
});

$('.js-slider-nav').slick({
  slidesToShow: 3,
  slidesToScroll: 1,
  asNavFor: '.js-slider-for',
  arrows: true,
  prevArrow: $('.js-arrows-slider-for .prev'),
  nextArrow: $('.js-arrows-slider-for .next'),
  focusOnSelect: true,
  variableWidth: true,
  rtl: true,
});

// Initiate Pricing slider

var sliderPricingSettings = {
  initialSlide: 1,
  slidesToShow: 1,
  slidesToScroll: 1,
  infinite: true,
  centerMode: true,
  variableWidth: true,
  arrows: false,
}

var sliderPricingMonthly = $('.js-slider-pricing-monthly');
var sliderPricingAnnual = $('.js-slider-pricing-annual');


function initiateSlider(slider) {
  if ($(this).width() < 1200 && !slider.hasClass('slick-initialized')) {
    slider.slick(sliderPricingSettings);
  }
};

initiateSlider(sliderPricingMonthly);
initiateSlider(sliderPricingAnnual);

function unslickSlider(slider) {
  if ($(this).width() < 1200 && !slider.hasClass('slick-initialized')) {
    slider.slick(sliderPricingSettings);
  } else if ($(this).width() >= 1200 && slider.hasClass('slick-initialized')) {
    slider.slick('unslick');
  }
};

$(window).resize(function () {
  unslickSlider(sliderPricingMonthly);
  unslickSlider(sliderPricingAnnual);
});