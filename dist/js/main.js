var windowhight=$(window).height();$(function(){$(".js-menu-toggle").on("click",function(){$(this).toggleClass("is-active"),$(".main-header__nav").toggleClass("is-open"),$(".main-header .container").toggleClass("js-bg")})}),$(window).scroll(function(){$(this).scrollTop()>windowhight-600?$("#scrolltotop").fadeIn():$("#scrolltotop").fadeOut()}),$("#scrolltotop").click(function(o){o.preventDefault(),$("html").animate({scrollTop:0},800)});