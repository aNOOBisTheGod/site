var can = document.createElement('canvas');
var ctx1 = can.getContext("2d");
var themeeditors = []
can.id = "CursorLayer";
can.width = window.innerWidth;
can.width = window.innerWidth;
var body = document.body,
    html = document.documentElement;
var height = Math.max( body.scrollHeight, body.offsetHeight, 
                       html.clientHeight, html.scrollHeight, html.offsetHeight );
can.height = height - innerHeight;
can.style.position = "absolute";
var header = document.getElementsByTagName("header")[0];

header.appendChild(can);

class Themededitor {
	constructor(x, y, color){
		this.x = x;
		this.y = y;
		this.color = color;
		this.size = 1;
		this.live = true;
        this.opacity = 1;
	}
	draw(){
		ctx1.beginPath();
		ctx1.arc(this.x, this.y, this.size, 0, Math.PI * 2, true);
		ctx1.fillStyle = this.color + this.opacity  + ')';
		ctx1.fill();
	}
    dodraw(){
        this.opacity -= 0.01;
        if (this.opacity <= 0){
            can.style.zIndex = -2;
            return
        }
        ctx1.beginPath()
		ctx1.arc(this.x, this.y, this.size, 0, Math.PI * 2, true);
		ctx1.fillStyle = this.color + this.opacity  + ')';
		ctx1.fill();
    }
	update(){
		this.size += this.size < innerWidth - 1000 ? 70 : 40;
		this.draw()
		if (this.size >= can.height && this.opacity > 0){
            this.live = false
            this.dodraw()
			return
		}
	}
}
function remake() {
    var sections = document.getElementsByTagName('section');
    for (var i = 0; i < sections.length; i++){
        sections[i].classList.toggle('dark' + sections[i].classList[0]);
    }
    cahgewaves();
}
function changetheme(x, y){
    can.style.zIndex = 8;
    themeeditors.push(new Themededitor(x, y, bgcol ? 'rgba(0, 0, 0, ' : 'rgba(255, 255, 255, '))
    setTimeout(() => remake(), 1500)
}
