$('body').on('click', '.hamburger-toggle', function(e){
    e.preventDefault();
    e.stopPropagation();
    if($('#hamburger-menu').is(":checked"))
    {
        hideMenuIfVisible();
    }else{
        $('#hamburger-menu').prop('checked', true);
        $('html').on('click', hideMenuIfVisible);
        $('nav').on('click', stopPropagation);
    }
})

function hideMenuIfVisible() {
    if($('#hamburger-menu').is(":checked"))
    {
        $('#hamburger-menu, nav input[type="checkbox"]').prop('checked', false);
        $('html').off('click', hideMenuIfVisible);
        $('nav').off('click', stopPropagation);
    }
}
function stopPropagation(e) {
    e.stopPropagation();
}