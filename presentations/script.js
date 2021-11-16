
function zoomin(a){
	if (a != 'unused'){
    img = document.querySelector('.img' + a);
	    if (!img.classList.contains("normal")){
	    	img.classList.add("normal");
	    }
	    else {
	    	img.classList.remove("normal");
	    }
	}
}
