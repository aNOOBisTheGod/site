// var canvas = document.getElementById('can');
// var ctx = canvas.getContext('2d');
// ctx.canvas.width  = window.innerWidth;
// ctx.canvas.height = window.innerHeight;
// ctx.font = "40px serif";
// canvas.onclick= function(event){
// 	var colors = ['#baefd5', '#efb9c3', '#b3edee', '#eec6b3', '#cbb9ef', '#eee7b3', '#9eecb7']
	
// 	var x = event.offsetX;
// 	var y = event.offsetY;
// 	texts = ['✦', '✦', '✦', '✦', '✦', '✦', '✦', '🦄']
// 	ctx.fillStyle = colors[Math.floor(Math.random() * colors.length)];
// 	// ctx.fillStyle = getRandomColor();
// 	ctx.fillText(texts[Math.floor(Math.random() * texts.length)], x, y);
// }

let lastKnownScrollPosition = 0;
let ticking = false;

document.addEventListener('scroll', function(e) {
  lastKnownScrollPosition = window.scrollY;
  if (lastKnownScrollPosition >= 2000){
  	ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
});

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
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
  	console.log(100);
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
window.human = false;

const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext('2d');
ctx.canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var circles = [];
var bgchangers = [];
var speedmultiplier = 20
var bgs = [];
var bgcol = true;
var red = 255;
var green = 0;
var blue = 255;
var themecolor = "rgba(" + red + ", " + green + ", " + blue + ", ";
var mouse = {
  'x' : innerWidth / 2, 
  'y' : innerHeight / 2,
  'removed': true,
}
function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

window.addEventListener('click', 
  function(event){
    for (let i = 1; i < 50; i++){
    let directionX = Math.round(Math.random() * 100 - 50);
    let directionY = Math.round(Math.random() * 100 - 50);
    let x = Math.round(Math.random() * 100 - 50);
    let y = Math.round(Math.random() * 100 - 50);
    let size = Math.round(Math.random() * 30);
    c = new Circle(event.x + x, event.y + y, directionX, directionY, size, tocol(red, green, blue));
    circles.push(c);
  }
  bgchangers.push(new BGChanger(event.x, event.y, tocol(red, green, blue), 30, innerWidth * 10))
  }
)


window.addEventListener('mousemove', 
  function(event){
    mouse['x'] = event.x;
    mouse['y'] = event.y
    mouse['removed'] = false
}
)


function beauty(){
  posx = Math.random() * innerWidth;
  posy = Math.random() * innerHeight;
  let r = Math.random() * 255;
  let g = Math.random() * 255;
  let b = Math.random() * 255;
  for (let i = 1; i < 50; i++){
    
    let directionX = Math.round(Math.random() * 100 - 50);
    let directionY = Math.round(Math.random() * 100 - 50);
    let x = Math.round(Math.random() * 100 - 50);
    let y = Math.round(Math.random() * 100 - 50);
    let size = Math.round(Math.random() * 30);
    c = new Circle(posx + x, posy + y, directionX, directionY, size, "rgba(" + r + ", " + g + ", " + b + ", ");
    circles.push(c);
  }
  bgchangers.push(new BGChanger(posx, posy, "rgba(" + r + ", " + g + ", " + b + ", ", 1))
  setTimeout(() => beauty(), 500 * Math.random());
}


function changebg(){
 bgcol = bgcol ? false : true
 if (!bgcol){
   red = 255;
   green = 0;
   blue = 255;
 }
 if (bgcol){
   red = 0;
   green = 255;
   blue = 255;
 }
 bgs.push(new Backgroundeditor(innerWidth * Math.random(), innerHeight * Math.random(), bgcol ? '#000' : '#FFF'))
 setTimeout(() => changebg(), Math.random() * 10000)
}
setTimeout(() => changebg(), Math.random() * 10000)


class Circle{
  constructor(x, y, directionX, directionY, size, color){
    this.x = x;
    this.y = y;
    this.directionX = directionX;
    this.directionY = directionY;
    this.size = size;
    this.color = color;
    this.live = true;
    this.opacity = size;
  }
  draw(){
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, true);
    ctx.fillStyle = this.color + this.size / this.opacity + ")";
    ctx.fill();
  }
  update(){
    if (this.directionY < 0){
      this.directionY += 1;
    }
    if (this.directionY > 0){
      this.directionY -= 1;
    }
    if (this.directionX < 0){
      this.directionX += 1;
    }
    if (this.directionX > 0){
      this.directionX -= 1;
    }
    if (this.directionX < 20 && this.directionY < 20){
      if (this.size > 0){
      this.size -= 1
    }
    if (this.size <= 0){
      this.live = false
    }
    }
    this.x += this.directionX;
    this.y += this.directionY;
    this.draw();
  }
}

class BGChanger {
  constructor(x, y, color, opacity){
    this.x = x;
    this.y = y;
    this.color = color;
    this.opacity = 30;
    this.size = 1;
    this.live = true;
  }
  draw(){
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, true);
    ctx.fillStyle = this.color + this.opacity / this.size + ")";
    ctx.fill();
  }
  update(){
    this.size += 50;
    this.draw()
    if (this.size >= 10000){
      this.live = false;
    }
  }
}
beauty();
class Backgroundeditor {
  constructor(x, y, color){
    this.x = x;
    this.y = y;
    this.color = color;
    this.size = 1;
    this.live = true;
  }
  draw(){
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, true);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
  update(){
    this.size += this.size < innerWidth - 1000 ? 70 : 40;
    this.draw()
    if (this.size >= innerWidth * 2){
      this.live = false;
    }
  }
}

function animate(){
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, innerWidth, innerHeight);
  for (let i = 0; i < bgs.length; i++){
    bgs[i].update();
    if (!bgs[i].live && bgs.length > 20){
      bgs.splice(i, 1);
    }
  }
  for (let i = 0; i < bgchangers.length; i++){
    bgchangers[i].update();
    if (!bgchangers[i].live){
      bgchangers.splice(i, 1);
    }
  }
  for (let i = 0; i < circles.length; i++){
    circles[i].update();
    if (!circles[i].live){
      circles.splice(i, 1);
    }
  }
  if (mouse['removed']){
    if (mouse['x'] < 100){
      mouse['x'] += 50
    } else if (mouse['x'] > innerWidth - 100) {
      mouse['x'] -= 50
    }
    else{
      mouse['x'] += Math.random() * 100 - 50
    }
    if (mouse['y'] < 100){
      mouse['y'] += 50
    } else if (mouse['y'] > innerHeight - 100) {
      mouse['y'] -= 50
    }
    else{
      mouse['y'] += Math.random() * 100 - 50
    }
  }
  for (let i = 1; i < 100; i++){
    let directionX = Math.round(Math.random() * speedmultiplier - speedmultiplier / 2);
    let directionY = Math.round(Math.random() * speedmultiplier - speedmultiplier / 2);
    let size = Math.round(Math.random() * 20);
    c = new Circle(mouse['x'], mouse['y'], directionX, directionY, size, 
      tocol(red == 0 ? red + Math.round(Math.random() * 100) : red - Math.round(Math.random() * 100),
       green == 0 ? green - Math.round(Math.random() * 100) : green - Math.round(Math.random() * 100), 
       blue == 0 ? blue + Math.round(Math.random() * 100) : blue - Math.round(Math.random() * 100)
      )
    );
    circles.push(c);
  }
  
}
window.addEventListener('resize', 
  function(){
    canvas.width = innerWidth;
    canvas.height= innerHeight;
  }
)
window.addEventListener('mouseout', 
  function(){
    mouse['x'] = innerWidth / 2;
    mouse['y'] = innerHeight / 2;
    mouse['removed'] = true
  }
)
window.addEventListener('dblclick',
  function(event){
    bgcol = bgcol ? false : true
    if (!bgcol){
      red = 255;
      green = 0;
      blue = 255;
    }
    if (bgcol){
      red = 0;
      green = 255;
      blue = 255;
    }
    bgs.push(new Backgroundeditor(event.x, event.y, bgcol ? '#000' : '#FFF'))
  }
)

function tocol(r, g, b){
  return "rgba(" + r + ", " + g + ", " + b + ", ";
}
animate();