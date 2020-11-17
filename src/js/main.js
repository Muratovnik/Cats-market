var windowhight = $(window).height();

$(function() {
  // menu toggle  
  $('.js-menu-toggle').on('click', function() {
    $(this).toggleClass('is-active');
    $('.main-header__nav').toggleClass('is-open');
    $('.main-header .container').toggleClass('js-bg');
  });
});


$(window).scroll(function(){

    if ($(this).scrollTop() > (windowhight - 600)) {
        $('#scrolltotop').fadeIn();
    } else {
        $('#scrolltotop').fadeOut();
    }

});

$('#scrolltotop').click(function(event){
    event.preventDefault();
    $('html').animate({scrollTop: 0}, 800)
});


