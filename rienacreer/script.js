window.onload = function() {
    go('main');
    canvas();
}

function go(section) {
    $('html, body').animate({scrollTop:$('#'+section).position().top}, 'slow');
}

function canvas() {
    
    var body = document.querySelector("body");
	var canvas = document.querySelector(".canvas");
	var context = canvas.getContext("2d");
 
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	var canvasPos = getPosition(canvas);
	var mouseX = 0;
	var mouseY = 0;
	var sqSize = 500;
	var xPos = 0;
	var yPos = 0;
	var dX = 0;
	var dY = 0;
	
    body.addEventListener("mousemove", setMousePosition, false);
    
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
		context.fillStyle ="#fff";
		context.beginPath();
		context.arc(xPos - sqSize / 2, yPos - sqSize / 2,1000,0,2*Math.PI);
		context.fill();
		context.stroke(); 
		
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
			xPos += (el.offsetLeft - el.scrollLeft + el.clientLeft);
		    yPos += (el.offsetTop - el.scrollTop + el.clientTop);	
			el = el.offsetParent;
		}
		
		return {
			x: xPos,
			y: yPos
		};
	}
}
