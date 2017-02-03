$( document ).ready(function() {

  // Open navbarSide when button is clicked
  $('#sidebarToggler').on('click', function() {
  	console.log("opening sidebar");
    $('#sidebar').fadeIn(10).css('width', '50%');
  });

  // Close navbarSide when the outside of menu is clicked
  $('.btn-sidebar-close').on('click', function(){
  	console.log("closing sidebar");
    $('#sidebar').css('width','0').fadeOut();
  });

});