$('.nav, #hamburger-checkbox').click(function(e){
    e.stopPropagation();
});

$('html').click(function() {
    //Hide the menus if visible
    if($('#hamburger-checkbox').is(":checked"))
    {
        $('#hamburger-checkbox, .nav input[type="checkbox"]').prop('checked', false);
    }
});
  
