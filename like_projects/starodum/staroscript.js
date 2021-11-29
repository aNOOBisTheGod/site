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
	console.log(r, g, b)
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



