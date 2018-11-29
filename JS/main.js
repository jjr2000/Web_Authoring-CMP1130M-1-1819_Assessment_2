$(".nav").click(function(e){
    e.stopPropagation(); //do nothing
});
$("*").click(function(){
    console.log("outside");
});
