window.onload = function() {
	
	window.addEventListener("scroll", parallax, false);
	myMenu.start();
	myCarroussel.start();

	/* AJAX VERS L'API SOUNDCLOUD + GET FICHIER JSON*/
	var track_id = '274239521';
    $.ajax({
        url: 'https://api.soundcloud.com/tracks/'+track_id+'.json',
		data : {
			client_id :'386b66fb8e6e68704b52ab59edcdccc6'
		},
        dataType: 'json',
        success: function(result) {
           console.log(result.title);
		   var single = document.getElementById("new_single");
		   single.innerHTML += "<img src='"+result.artwork_url+"' /><br />";
		   single.innerHTML += result.title+"<br />";
		   single.innerHTML += "genre : "+result.genre+"<br />";
		   single.innerHTML += "<a href='"+result.permalink_url+"' target='_blank'>LISTEN ON SOUNDCLOUD</a>";
        }
    });


	var text = '[{"lieu": "Auster Club, Berlin","date": "07/03/15","tickets": "auster-clubc.com"},{"lieu": "Monseigneur, Paris","date": "10/03/15","tickets": "monseigneurparis.com"},{"lieu": "The Stillery, London","date": "12/03/15","tickets": "thestillery.co.uk"},{"lieu": "Sugar Factory, Amsterdam","date": "15/03/15","tickets": "sugarfactory.nl"},{"lieu": "Ideal Bar, Kopenhagen","date": "17/03/15","tickets": "idealbar.vega.dk"},{"lieu": "Obaren, Stockholm","date": "18/03/15","tickets": "obaren.se"}]';
	// contenu du fichier tour_dates.json
	
	var obj = JSON.parse(text);
	var tour = document.getElementById("tour_dates");
	var taille = obj.length;
	for (var i= 0; i<taille; i++) {
		tour.innerHTML += '<a target="_blank" href="http://'+obj[i].tickets+ '"><li> <span class="date">'+obj[i].date + '</span><span class="lieu"> ' + 
			obj[i].lieu + '</span><span>TICKETS</span></li></a>';
	}
}

/* MENU */

function menu() {

	var me = this;
	var menus = document.getElementsByTagName("li");
	var previous = document.getElementById("home");
	var bool = true;
	
	me.start = function() {
	
	
		document.addEventListener("keyup", function(e) {
			if (e.which == 40) {
				 $("html , body").animate({
					scrollTop : $("nav").offset().top
				},400); }
			if (e.which == 38) {
				$("html , body").animate({
					scrollTop : $("#main_page").offset().top
				},400); }
			}, false);
		
		document.getElementById("main_title").addEventListener("click", function() {
			 $("html , body").animate({
				scrollTop : $("nav").offset().top
				},1000);
		 }, false);
		previous.style = "display:block";
		
		
		for (var i = 0; i<menus.length; i++) {
			menus[i].addEventListener("click", function() {

				if (bool == true) { 
					me.firstClick();
					bool = false;
				}
				
				$("html , body").animate({
						scrollTop : $("nav").offset().top
				},600);
				previous.style = "display:none";
				$("li.active").removeClass('active');
				$(this).addClass('active');
				var rel = $(this).attr('rel');
				var goTo = document.getElementById(rel);
				goTo.style = "display:block";
				previous = goTo;
			}, false);

		}
	}
	
	me.firstClick = function() {
		
		var page = document.getElementById("page");
		var title = document.getElementById("main_title");
		var logo = document.getElementById("logo");
		var vid = document.getElementById("video_tula");
		var intro = document.getElementById("intro");
		intro.style = "visibility:visible";
		page.style = "height:100vh";
		logo.style = "visibility:visible";
		title.style = "position:absolute";
	}
}
var myMenu = new menu();

/* CARROUSEL */

function carrousel(){
    var me = this;
    me.nbSlide = 0;
    me.currentSlide = 0;
    me.slides = [];

    me.start = function(){
        me.slides = document.getElementsByClassName("slide");
        me.nbSlide = me.slides.length;
		document.getElementById("back").style = "opacity:0.2";
        document.getElementById("back").addEventListener("click",function(){me.goBack()});
        document.getElementById("next").addEventListener("click",function(){me.goNext()});
        for(var i = 1; i <  me.nbSlide; i++){
            me.slides[i].style.display = "none";
        }
    }

    me.goBack = function(){
		
        if(me.currentSlide > 0){
			document.getElementById("back").style = "opacity:1";
			document.getElementById("next").style = "opacity:1";
            me.slides[me.currentSlide].style.display = "none";
            me.currentSlide --;
            me.slides[me.currentSlide].style.display = "block";
        }
		if (me.currentSlide == 0) {
			document.getElementById("back").style = "opacity:0.2";
		}
    }

    me.goNext = function(){
        if(me.currentSlide < me.nbSlide - 1){
			document.getElementById("next").style = "opacity:1";	
			document.getElementById("back").style = "opacity:1";			
            me.slides[me.currentSlide].style.display = "none";
            me.currentSlide ++;
            me.slides[me.currentSlide].style.display = "block";
        }
		if (me.currentSlide == me.nbSlide-1) {
			document.getElementById("next").style = "opacity:0.2;";
		}
    }
}

var myCarroussel = new carrousel();



/* PARALLAX */
function parallax() {
	
	var result = $("#video_tula").height();
	result = result/3.3;
	var offsetX = document.body.scrollTop;
	// $("#video_tula").css("top", (offsetX+result) / 2); //compatible Chrome seulement
	document.getElementById("video_tula").style.top = ((window.pageYOffset + result)/2)+'px'; //compatible Firefox & Chrome
}

