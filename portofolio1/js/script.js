window.onload = function() {
	if(isMobile.any()) {
		$('body').html(mobile());
	}
	else {
		init();
		$(window).resize(function() {
			init();
		});
	}
}

function init() {
	if ($(document).width()<900 || $(document).height()<600) small();
	else {
		canvas(); // add backwards cursor
		big(); //add main message
		sections(); // add sections 
		li(); // add name/title
		projects(); // add projects lists
		illustration(); // add random illustration
		nav(); // add navigations conditions/bonus
	}
}

function small() {
	console.log($(document).width() + 'w '+ $(document).height());
	$("#enter").html("it's better fullscreen!");
	$("#big").css({
		'font-size':$("#big").width()/$("#enter").html().length,
		'display':'block'
	});
	$(window).mouseenter(function() {
		$("#big").animate({height:"90vh"},{queue:false, duration:400});
	})
	$(window).mouseleave(function() {
		$("#big").animate({height:"90vh"},{queue:false, duration:400});
	})
}

function nav() {
	leftNav();
	illustrationNav();
}

function big() {
	$("#enter").html("hey hello welcome I'm currently looking for an internship in South Korea");
	$(window).mouseenter(function() {
		$("#big").animate({height:"0"},{queue:false, duration:400});
	})
	$(window).mouseleave(function() {
		$("#big").animate({height:"90vh"},{queue:false, duration:400});
	})
	$("#big").css({'font-size':$("#big").width()/$("#enter").html().length});
}

function sections() {
	$('#ctn').empty();
	$('#ctn').append('<div id="ttl"></div>');
	$('#ctn').append('<div id="nav"></div>');
	$('#ctn').append('<div id="web"></div>');
	$('#ctn').append('<div id="prg"></div>');
	$('#ctn').append('<div id="vid"></div>');
	$('#ctn').append('<div id="me"></div>');
}


function illustration() {
	var ill = ["waves"];
	$("#svg").load("illustrations/"+ill[Math.floor(Math.random()*ill.length)]+".txt");
}

function li() {
	
	var letters = [ ' ', 'l', 'a', 'u', 'r', 'e', '_' , 'i', 's', 's', 'a' ];
	var letterSize = $('#top').height() / letters.length;
	var x = letterSize-30;
	var y = letterSize;
	for (var i = 1; i < letters.length; i++) {
		$newLetter =  $('<div id='+ letters[i]+' class="letter">' + letters[i] + '</div>')
		$newLetter.css({
			'font-size': letterSize+'px',
			'left': x + (i%2? 0:(letterSize/2)) + (i%3? 0:(letterSize)) + 80 + 'px',
			'top': y+'px',
			'color':(i%6? 'black':'white'),
			'visibility':(i%6? 'visible':'hidden'),
		});
		$('#ttl').append($newLetter);
		y += letterSize + 10;
		letterSize -= letterSize/(letterSize*0.5);
	}
}

function projects() {
	web();
	vid();
	prg();
	me();
}

function web() {

	var links = ["http://totally-not-last-fm.herokuapp.com", "http://laureissa.fr/resume"];
	var id = ["totally-not-last-fm", "online-resume"];
	var desc = ["music", "portofolio"];	
	var names = ["totally not last fm", "interactive resume"];
	var tech = ["React.js", "HTML, CSS, JavaScript"]
	var msg = [ "What does your music say about you ? Totally not LastFM - totally inspired by LastFM - analyzes your Spotify data and summarizes everything into minimalistic and colorful graphs.",
				"The first version of my interactive online resume, where you get to know more about me and my projects through a terminal. With some easter-eggs." ]
	var x =  $('#top').height()/2-80;
	var y =  7*($('#top').height()/8);

	if (! ($('#web').html()).length) {
		$('#web').append('<div class="ttl">web/</div>');
		for (var i = 0; i < links.length; i++) {
			$('#web').append(ctn(id[i], names[i], links[i], desc[i]));
			more(id[i], names[i], links[i], tech[i], msg[i]);
		}
	}
	$('#web').css({
		'left': x,
		'top':y+'px'
	});
	drag("web");
}

function vid() {

	var links = ["https://vimeo.com/285563917", "https://vimeo.com/285572902", "https://www.youtube.com/watch?v=aimmZXoF2Zo"];
	var id = ["sleep-paralysis", "layal", "nuit-tombe"];
	var desc = ["short movie", "title sequence", "short movie"];
	var names = ["sleep paralysis", "layal", "quand la nuit tombe"];
	var tech = ["Premiere", "Processing / After Effects", "Script Writing / Sound / Editing"]
	var msg = ['A very short movie inspired by the Dada art movement. An impressive moment where the brain is lost between sleep and wakefulness, paralyzes everything but your mind and gets you to a motionless trip.',
				'"Layal can\'t be happy. Her memory, incontrollable as the light, prevents her by immediatly erasing every happy moment she lives. How does her forgotten past affect incomplete present ?" This is the title sequence I imagined for the movie I imagined. ',
				'"Strange crimes disturb a group of friends. One by one, they disappear... Will they catch the real murderer ? Unless he is one of them..."<br />A short movie made by IMAC students (Marc Blactot, Olivier Faugère, Laure Issa, Quentin Louis)'];
	
	var x =  $('#top').height()/2-60;
	var y =  5*($('#top').height()/8);

	if (! ($('#vid').html()).length) {
		$('#vid').append('<div class="ttl">videos/</div>');
		for (var i = 0; i < links.length; i++) {
			$('#vid').append(ctn(id[i], names[i], links[i], desc[i]));
			more(id[i], names[i], links[i], tech[i], msg[i]);
		}
	}
	$('#vid').css({
		'left': x,
		'top':y+'px'
	});
	drag("vid");
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

	var x =  $('#top').height()/2 - 40;
	var y =  3*($('#top').height()/8);

	if (! ($('#prg').html()).length) {
		$('#prg').append('<div class="ttl">code/</div>');
		for (var i = 0; i < links.length; i++) {
			$('#prg').append(ctn(id[i], names[i], links[i], desc[i]));
			more(id[i], names[i], links[i], tech[i], msg[i]);
		}
	}
	$('#prg').css({
		'left': x,
		'top':y+'px'
	});
	drag("prg");
}

function me() {

	var links = ["https://www.ingenieur-imac.fr/", "mailto:issalaure@gmail.com"];
	var names = ["IMAC", "contact"];
	var id = ["IMAC-student", "e-mail"];
	var desc = ["multimedia engineering student", "issalaure(at)gmail.com"];
	var x =  $('#top').height()/2 - 20;
	var y =  $('#top').height()/8;

	if (! ($('#me').html()).length) {
		$('#me').append('<div class="ttl">about/</div>');
		for (var i = 0; i < links.length; i++) {
			$('#me').append('<div class="folio_ctn"><span class="name '+id[i]+'"><a href="'+links[i]+'" target="_blank">'+names[i]+'</a></span>' + '<span class="desc"> '+desc[i]+' </span></div>');
		}
	}

	$('#me').css({
		'left': x,
		'top':y+'px'
	});
	drag("me");
}

function ctn (id, name, link, desc){
	return '<div class="folio_ctn"><span class="name '+id+'">'+name+'</span>' + '<span class="desc"> '+desc+' </span></div>';
}

var first_more = true;
function more(id, name, link, tech, msg) {

	$('.'+id).click(function() {
		
		if (first_more) {
			$("#svg").animate({width:"0"},{queue:false, duration:400});
			$(".path").css({'display':'none'});
			$("#right").animate({width:"50%"},{queue:false, duration:400});
		}		
		hideShow("#title", name);
		hideShow("#tech", tech);
		hideShow("#more", msg);
		hideShow("#link", "<a href="+link+" target=\"_blank\">view project</a>");
	});
}

function hideShow(el, content) {
	$(el).fadeOut(100, function() {
		$(this).html(content);
	})
	$(el).fadeIn(100);
}

var firstLeft = false;
function leftNav() {
	if (!firstLeft) {
		$("#left").mouseenter(function() {
			$("#left").animate({width:"50%"},{queue:false, duration:400});
			$("#bottom").html('<a href="cv_laure_issa.pdf" target="_blank">download my resume</a>');
			firstLeft = true;
		});
	}
}

function illustrationNav() {
	$("#svg").click(function() {
		$("#svg").animate({width:"50%"},{queue:false, duration:400});
		$(".path").css({"display":"block"});
		$("#right").animate({width:"0"},{queue:false, duration:400});
	});
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

function canvas() {
	
	var canvas = document.querySelector("#canvas");
	var context = canvas.getContext("2d");
 
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	var canvasPos = getPosition(canvas);
	var mouseX = 0;
	var mouseY = 0;
	var sqSize = 1000;
	var xPos = 0;
	var yPos = 0;
	var dX = 0;
	var dY = 0;
	
	canvas.addEventListener("mousemove", setMousePosition, false);
	
	function setMousePosition(e) {
		mouseX = e.clientX - canvasPos.x;
		mouseY = e.clientY - canvasPos.y;
	}
	
	function animate() {
		dX = mouseX - xPos;
		dY = mouseY - yPos;
		
		xPos += (dX / 10);
		yPos += (dY / 10);
		
		context.clearRect(0, 0, canvas.width, canvas.height);
		context.fillStyle ="rgba(0, 0, 0, 0.05)";
		context.beginPath();
		context.arc(xPos - sqSize / 2, yPos - sqSize / 2,1000,0,2*Math.PI);
		context.fill();
		
		requestAnimationFrame(animate);
	}
	animate();
	
	window.addEventListener("resize", updatePosition, false);
	
	function updatePosition() {
		canvasPos = getPosition(canvas);
	}
	
	function getPosition(el) {
		var xPos = 0;
		var yPos = 0;
		
		while (el) {
			if (el.tagName == "BODY") {
				var xScroll = el.scrollLeft || document.documentElement.scrollLeft;
				var yScroll = el.scrollTop || document.documentElement.scrollTop;
				xPos += (el.offsetLeft - xScroll + el.clientLeft);
				yPos += (el.offsetTop - yScroll + el.clientTop);
			} 
			else {
				xPos += (el.offsetLeft - el.scrollLeft + el.clientLeft);
				yPos += (el.offsetTop - el.scrollTop + el.clientTop);	
			}
			el = el.offsetParent;
		}
		
		return {
			x: xPos,
			y: yPos
		};
	}
}

var isMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
};

function mobile() {
	$('#mobile').css({'font-size':window.height});
	return "<div id='mobile'>holà, here is my <a href='cv_laure_issa.pdf'>resume</a><span><br /><br />ps: check my complete website on computer</span></div>"
}