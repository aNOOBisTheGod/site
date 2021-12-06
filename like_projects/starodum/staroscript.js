var a = "";
var removed = false;

function changeBackground(color) {
   document.body.style.background = color;
}
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

var r = 174;
var g = 162;
var b = 173;
var lastScrollTop = 0;

window.addEventListener("scroll",function() { 
	changeBackground('rgba(' + r + ', ' + g + ', ' + b + ')'); 
	var x = getRandomInt(2);
	var y = getRandomInt(2);
	var z = getRandomInt(2);
	var oper1 = getRandomInt(1);
	var oper2 = getRandomInt(1);
	var oper3 = getRandomInt(1);
	if (r + g + b < 400) {
		oper1 = 1;
		oper2 = 1;
		oper3 = 1;
	}
	if ((oper1 == 0 || r >= 255) & r >= 100){
		r -= x;
	} else {
		r += x
	}
	if ((oper2 == 0 || g >= 255) & g >= 100){
		g -= y;
	} else {
		g += y;
	}
	if ((oper3 == 0 || b >= 255) & b >= 100){
		b -= z;
	} else {
		b += z;
	}
}
);


function clicker(x){
	a += x;
	console.log(a);
	if (a.includes('СТАРОДУМ')){
		console.log('Success');
		a = '';
		w = window.open('https://ilibrary.ru/text/1098/p.3/index.html');
		setTimeout(function() { w.scrollTo(0,1000) }, 1000);
	}
}

const faders = document.querySelectorAll(".fade-in");

const appearOptions = {
  threshold: 0,
  rootMargin: "0px 0px -250px 0px"
};

const appearOnScroll = new IntersectionObserver(function(
  entries,
  appearOnScroll
) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) {
    	return
    } else {
      entry.target.classList.add("appear");
    }
  });
},
appearOptions);

faders.forEach(fader => {
  appearOnScroll.observe(fader);
});

function remove() {
	if (!removed) {
   		for(styleSheet of document.styleSheets){ styleSheet.disabled=true;}
   		removed = true;
   }
	else {
		for(styleSheet of document.styleSheets){ styleSheet.disabled=false; }
		removed = false;
	}
}

const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext('2d');
ctx.canvas.width = window.innerWidth;
var body = document.body,
    html = document.documentElement;
var height = Math.max( body.scrollHeight, body.offsetHeight, 
                       html.clientHeight, html.scrollHeight, html.offsetHeight );
ctx.canvas.height = height - innerHeight;


let particlesArray;

let mouse = {
	x: null,
	y: null,
	radius: (canvas.height / 80) * (canvas.width / 80)
}

// window.addEventListener('mousemove',
// 	function(event){
// 		mouse.x = event.x;
// 		mouse.y = event.y * 5.20;
// 	}
// )

// window.addEventListener('click',
// 	function(event){
// 		x = event.x;
// 		y = event.pageY - window.innerHeight;
// 		let directionX = Math.random() * 5 - 2.5;
// 		let directionY = Math.random() * 5 - 2.5;
// 		let color = '#8C5523'
// 		let size = 0.01;
// 		particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
// 		particlesArray.splice(0, 1);
// 	}
// )

class Particle {
	constructor(x, y, directionX, directionY, size, color){
		this.x = x;
		this.y = y;
		this.directionX = directionX;
		this.directionY = directionY;
		this.size = size;
		this.color = color;
		this.position = Math.random() + Math.random();
	}

	draw(){
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
		ctx.fillstyle = '#8C5523';
		ctx.fill();
	}
	update(){
		if (this.x > canvas.width + 200 || this.x < -200){
			// for (let i = 0; i < particlesArray.length; i++){
			// 	if (particlesArray[i].position == this.position){
			// 		particlesArray.splice(i, 1);
			// 	}
			// } if ya wanna delete item
			this.directionX = -this.directionX;

		}
		if (this.y > canvas.height + 200 || this.y < -200){
			// for (let i = 0; i < particlesArray.length; i++){
			// 	if (particlesArray[i].position == this.position){
			// 		particlesArray.splice(i, 1);
			// 	}
			// }
			this.directionY = -this.directionY;
		}
	this.x += this.directionX;
	this.y += this.directionY;
	this.draw();
	}
}

function init(){
	particlesArray = [];
	let numberOfParticles = (canvas.height * canvas.width) / 9000 / 10.20;
	for (let i = 0; i < numberOfParticles; i++){
		let size = 0.01;
		let x = Math.random() * innerWidth - size * 2 - size * 2;
		let y = Math.random() * (height - innerHeight) - size * 2 - size * 2;
		let directionX = Math.random() * 5 - 2.5;
		let directionY = Math.random() * 5 - 2.5;
		let color = '#8C5523'
		particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
	}
}

function animate(){
	requestAnimationFrame(animate);
	ctx.clearRect(0, 0, innerWidth, height);
	for (let i = 0; i < particlesArray.length; i++){
		particlesArray[i].update();
	}
	connect();
}

function connect() {
	for (let a = 0; a < particlesArray.length; a++){
		for (let b = a; b < particlesArray.length; b++){
			let distance = ((particlesArray[a].x - particlesArray[b].x) * (particlesArray[a].x - particlesArray[b].x))
			 + ((particlesArray[a].y - particlesArray[b].y) * (particlesArray[a].y - particlesArray[b].y));
			if (distance < (canvas.width / 7) * (canvas.height / 7)){
				let opacity = 1 - distance / ((canvas.width / 7) * (canvas.height / 7));
				ctx.strokeStyle = 'rgba(140, 85, 31, ' + opacity +')'
				ctx.lineWidth = 5;
				ctx.beginPath();
				ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
				ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
				ctx.stroke();
			}
		}
	}
}

window.addEventListener('resize', 
	function(){
		height = Math.max( body.scrollHeight, body.offsetHeight, 
                       html.clientHeight, html.scrollHeight, html.offsetHeight );
		canvas.width = innerWidth;
		canvas.height= height - innerHeight;
		mouse.radius = (canvas.height / 80) * (canvas.width / 80);
	}
)

// window.addEventListener('mouseout',
// 	function() {
// 		mouse.x = undefined;
// 		mouse.y = undefined;
// 	}
// )

init();
animate();

var coll = document.getElementsByClassName("collapsible");
var i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.display === "block") {
      content.style.display = "none";
    } else {
      content.style.display = "block";
    }
  });
}



