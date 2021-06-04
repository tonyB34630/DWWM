

/*$(function(){
    $("#home").load("index.html");
    $("#container-presentation").load("presentation.html"); 
    $("#container-galerie").load("galerie.html");
    $("#container-contact").load("parcours_Pro.html");
    
});*/

// Barre de navigation

$("#main-content").load("accueil.html");
$("#page-presentation").click(function(){
	$("#main-content").load("presentation.html");
});
$("#page-galerie").click(function(){
	$("#main-content").load("galerie.html");
});
$("#page-contact").click(function(){
	$("#main-content").load("contact.html");
});
$("#page-accueil").click(function(){
	$("#main-content").load("accueil.html");
});



