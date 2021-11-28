var a = "";
var removed = false;



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
remove();


