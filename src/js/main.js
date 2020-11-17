$(function() {
  // menu toggle  
  $('.js-menu-toggle').on('click', function() {
    $(this).toggleClass('is-active');
    $('.main-header__nav').toggleClass('is-open');
    $('.main-header .container').toggleClass('js-bg');
  });
});
  


