window.onload = function() {
nav();
loadProjects();
audio();
}

function init() {
	sections(); // add sections 
	projects(); // add projects lists
}

function nav() {
    $('#works_link').click(function() {
        projects(); // add projects lists
    });
    $('#home_link').click(function() {
        home(); // add projects lists
	});
}

function audio() {
}

function loadProjects() {
    $('.content_projects').empty();
	$('.content_projects').append('<div id="ttl"></div>');
	$('.content_projects').append('<div id="nav"></div>');
	$('.content_projects').append('<div id="web"></div>');
	$('.content_projects').append('<div id="prg"></div>');
	$('.content_projects').append('<div id="vid"></div>');
	$('.content_projects').append('<div id="me"></div>');
	web();
	vid();
	prg();
    me();
    $('.content_projects').css('visibility', 'hidden');
}

function home() {
    $('.content_projects').css('visibility', 'hidden');
    $('.content__text').css('visibility', 'visible');
}


function projects() {
    $('.content__text').css('visibility', 'hidden');
    $('.content_projects').css('visibility', 'visible');
}

function web() {

	var links = ["http://totally-not-last-fm.herokuapp.com", "http://laureissa.fr/2018", "http://laureissa.fr/2017"];
	var id = ["totally-not-last-fm", "2018-portfolio", "online-resume"];
	var desc = ["music statistics", "2018 portfolio", "2017 portfolio"];	
	var names = ["totally not last fm", "minimalistic portfolio", "interactive resume"];
	var tech = ["React.js", "HTML, CSS, JavaScript"]
	var msg = [ "What does your music say about you ? Totally not LastFM - totally inspired by LastFM - analyzes your Spotify data and summarizes everything into minimalistic and colorful graphs.",
				" ", "The first version of my interactive online resume, where you get to know more about me and my projects through a terminal. With some easter-eggs." ]
	var x =  $('content__img-wrap').position.left;
	var y =  $('content__img-wrap').position.top;

	if (! ($('#web').html()).length) {
		$('#web').append('<div class="ttl">web/</div>');
		for (var i = 0; i < links.length; i++) {
			$('#web').append(ctn(id[i], names[i], links[i], desc[i]));
			//more(id[i], names[i], links[i], tech[i], msg[i]);
		}
	}/*
	$('#web').css({
		'left': '10%',
		'top': '20%'
	});*/
	drag("web");
}

function vid() {

	var links = ["https://vimeo.com/285563917", "https://vimeo.com/285572902", "https://www.youtube.com/watch?v=aimmZXoF2Zo", "https://www.youtube.com/watch?v=RlZx1svEQ7g"];
	var id = ["sleep-paralysis", "layal", "nuit-tombe", "joji-jun"];
	var desc = ["short movie", "title sequence", "short movie", "music video"];
	var names = ["sleep paralysis", "layal", "quand la nuit tombe", "joji cover by nuj"];
	var tech = ["Premiere", "Processing / After Effects", "Script Writing / Sound / Editing", "Editing"]
	var msg = ['A very short movie inspired by the Dada art movement. An impressive moment where the brain is lost between sleep and wakefulness, paralyzes everything but your mind and gets you to a motionless trip.',
				'"Layal can\'t be happy. Her memory, incontrollable as the light, prevents her by immediatly erasing every happy moment she lives. How does her forgotten past affect incomplete present ?" This is the title sequence I imagined for the movie I imagined. ',
				'"Strange crimes disturb a group of friends. One by one, they disappear... Will they catch the real murderer ? Unless he is one of them..."<br />A short movie made by IMAC students (Marc Blactot, Olivier Faugère, Laure Issa, Quentin Louis)',
				''];
	
    var x =  $('content__img-wrap').position.left;
    var y =   $('content__img-wrap').position.top + 50;
    console.log(y);
	if (! ($('#vid').html()).length) {
		$('#vid').append('<div class="ttl">videos/</div>');
		for (var i = 0; i < links.length; i++) {
			$('#vid').append(ctn(id[i], names[i], links[i], desc[i]));
		}
	}/*
	$('#vid').css({
		'left': '10%',
		'top': '50%'
	});*/
	drag("vid");
}

function ctn (id, name, link, desc){
	return '<div class="folio_ctn"><span class="name '+id+'"><a href="'+link+'" target="_blank">'+name+'</a></span>' + '<span class="desc"> '+desc+' </span></div>';
}


function prg() {

	var links = ["http://www.thetheatreofoperations.com/","https://www.youtube.com/watch?v=dxCK7rNngLM", "https://github.com/laureis/beepiano"];
	var id = ["décalage","pacman","beepiano"];
	var desc = ["virtual reality experience",  "game", "console game"];
	var names = ["décalage", "pacman", "beepiano"];
	var tech = ["Unity / HTC Vive", "C++ / OpenGL3", "C++"]
	var msg = [ "Décalage is an artistic immersive/interactive 3D project conceived by the artist Stéphane Trois Carrés. A virtual reality installation sending you in a dream where voices and sounds guide you to a world you never imagined its existence before, where even gravity can trick you...",
				"Can anything stop Pacman ? This timeless guy is still trying to catch some pacgums even in the hottest spot of Earth. Help him avoid the ghosts in a volcano... ",
				"Beepiano is a Piano Tiles-wanabe. You can either freely play  with the soft sound of the Windows' beep or learn how to play some good tunes."];

    var x =  $('content__img-wrap').position.left;
    var y =   $('content__img-wrap').position.top;

	if (! ($('#prg').html()).length) {
		$('#prg').append('<div class="ttl">code/</div>');
		for (var i = 0; i < links.length; i++) {
			$('#prg').append(ctn(id[i], names[i], links[i], desc[i]));
			// more(id[i], names[i], links[i], tech[i], msg[i]);
		}
	}/*
	$('#prg').css({
		'left': '50%',
		'top': '20%'
	});*/
	drag("prg");
}

function me() {

	var links = ["https://www.ingenieur-imac.fr/", "mailto:issalaure@gmail.com"];
	var names = ["IMAC", "contact"];
	var id = ["IMAC-student", "e-mail"];
	var desc = ["multimedia engineering student", "issalaure(at)gmail.com"];
	var x =  $('body').height()/2 - 20;
	var y =  $('body').height()/8;

	if (! ($('#me').html()).length) {
		$('#me').append('<div class="ttl">about/</div>');
		for (var i = 0; i < links.length; i++) {
			$('#me').append('<div class="folio_ctn"><span class="name '+id[i]+'"><a href="'+links[i]+'" target="_blank">'+names[i]+'</a></span>' + '<span class="desc"> '+desc[i]+' </span></div>');
		}
	}
	/*
	$('#me').css({
		'left': '50%',
		'top': '50%'
	});*/
	drag("me");
}

function drag(id) {

	var elt = document.getElementById(id);
	var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

	if (elt) 
		elt.onmousedown = dragMouseDown;
	else 
		elt.onmousedown = dragMouseDown;
  
	function dragMouseDown(e) {
	  e = e || window.event;
	  pos3 = e.clientX;
	  pos4 = e.clientY;
	  document.onmouseup = closeDragElement;
	  document.onmousemove = elementDrag;
	}
  
	function elementDrag(e) {
	  e = e || window.event;
	  pos1 = pos3 - e.clientX;
	  pos2 = pos4 - e.clientY;
	  pos3 = e.clientX;
	  pos4 = e.clientY;
	  elt.style.top = (elt.offsetTop - pos2) + "px";
	  elt.style.left = (elt.offsetLeft - pos1) + "px";
	}
  
	function closeDragElement() {
	  document.onmouseup = null;
	  document.onmousemove = null;
	}
}
