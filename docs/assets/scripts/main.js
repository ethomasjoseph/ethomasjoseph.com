"use strict";$("#sidebarToggler").on("click",function(){console.log("opening sidebar"),$("#sidebar").fadeIn(10).css("width","50%")}),$(".btn-sidebar-close").on("click",function(){console.log("closing sidebar"),$("#sidebar").css("width","0").fadeOut()});var tjs=window.tjs||{};tjs.Navigation=function(n,s){var a,o,d;o=function(){s("#navbarBrand").hasClass("hidden-md-up")&&s(document).on("scroll",function(){s(document).scrollTop()>50?(s("#navbarBrand").addClass("mr-auto").removeClass("hidden-md-up"),s("#stickyDesktopNavLinks").removeClass("mx-auto")):(s("#navbarBrand").addClass("hidden-md-up"),s("#stickyDesktopNavLinks").addClass("mx-auto"))})},d=function(){var s=function(){scrollBy(0,-80)};n.addEventListener("hashchange",s),n.location.hash&&s()},(a=function(){o(),d()})()}(window,jQuery);