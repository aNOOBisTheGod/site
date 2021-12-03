const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext('2d');
ctx.canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var particlesArray = [];
var effectparticles = [];
var mouseposx = 100;
var mouseposy = 100;

let mouse = {
	x: null,
	y: null,
	radius: (canvas.height / 80) * (canvas.width / 80)
}


function clearParticles(a){
	for (let i = 0; i < a; i++){
			particlesArray.splice(0, 1);
		}
}

// window.addEventListener('mousemove',
// 	function(event){
// 		x = event.x;
// 		y = event.y;
// 		let num = 2;

// 		init(x, y, num);
		
// 		setTimeout(() => clearParticles(num), 1000);
// 	} beauty but not for phones
// )

function mousesim(){
	if ((Math.random() < 0.5 && mouseposy - Math.random() * 100 > 0) || mouseposy + Math.random() * 100 > innerHeight){
		mouseposy -= Math.random() * 100;
	} else {
		mouseposy += Math.random() * 100;
	}
	if ((Math.random() < 0.5 && mouseposx - Math.random() * 100 > 0) || mouseposx + Math.random() * 100 > innerWidth){
		mouseposx -= Math.random() * 100;
	} else {
		mouseposx += Math.random() * 100;
	}
	let num = 2;

	init(mouseposx, mouseposy, num);
	setTimeout(() => mousesim(), 10);
	setTimeout(() => clearParticles(num), 1000);
}


class Particle {
	constructor(x, y, directionX, directionY, size, color){
		this.x = x;
		this.y = y;
		this.directionX = directionX;
		this.directionY = directionY;
		this.size = size;
		this.color = color;
		this.index = Math.random() + Math.random()
	}

	draw(){
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
		ctx.fillstyle = '#8C5523';
		ctx.fill();
	}
	update(){
		if (this.x > canvas.width || this.x < 0){
			this.directionX = -this.directionX;
		}
		if (this.y > canvas.height || this.y < 0){
			this.directionY = -this.directionY;
		}
		
	this.x += this.directionX;
	this.y += this.directionY;
	this.draw();
	}
}

function particles(){
	init(Math.random() * innerWidth, 100, 1);
	init(Math.random() * innerWidth, innerHeight - 100, 1);
	init(100, Math.random() * innerHeight, 1);
	init(innerWidth - 100, Math.random() * innerHeight, 1);
}

// for (let i = 0; i < (canvas.height * canvas.width) / 72000; i++){
// 	particles();
// }
function init(mousex, mousey, amount){
	
	let numberOfParticles = amount;
	// let numberOfParticles = 2;
	for (let i = 0; i < numberOfParticles; i++){
		// let size = Math.random() * 5 + 1; - for dots not hidden
		let size = 0.01; //hidden dots
		let x = mousex + Math.random() * 10;
		let y = mousey + Math.random() * 10;
		let directionX = Math.random() * 5 - 2.5;
		let directionY = Math.random() * 5 - 2.5;
		let color = '#8C5523'
		particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
	}
}

function animate(){
	requestAnimationFrame(animate);
	ctx.clearRect(0, 0, innerWidth, innerHeight);
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
				let opacity = 1 - distance / ((canvas.width / 7) * (canvas.height / 7)); //lines will appear with transition
				if (particlesArray[a].x > innerWidth / 2) {
					ctx.strokeStyle = 'rgba(255, 0, 0, ' + opacity + ')'
				}
				else {
					ctx.strokeStyle = 'rgba(0, 0, 0, ' + opacity + ')'
				}
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
		canvas.width = innerWidth;
		canvas.height= innerHeight;
		mouse.radius = (canvas.height / 80) * (canvas.width / 80);
	}
)

window.addEventListener('mouseout',
	function() {
		mouse.x = undefined;
		mouse.y = undefined;
	}
)
animate();
mousesim();