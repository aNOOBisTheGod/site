console.log(10)
var can = document.createElement('canvas');
var themeeditors = []
can.id = "CursorLayer";
can.width = window.innerWidth;
can.height = 768;
can.width = window.innerWidth;
var body = document.body,
    html = document.documentElement;
var height = Math.max( body.scrollHeight, body.offsetHeight, 
                       html.clientHeight, html.scrollHeight, html.offsetHeight );
can.height = height - innerHeight;

can.style.position = "absolute";
var header = document.getElementsByTagName("header")[0];

header.appendChild(can);

var ctx1 = can.getContext("2d");
ctx1.fillStyle = "rgba(255, 0, 0, 0.2)";
ctx1.fillRect(100, 100, 200, 200);
ctx1.fillStyle = "rgba(0, 255, 0, 0.2)";
ctx1.fillRect(150, 150, 200, 200);
ctx1.fillStyle = "rgba(0, 0, 255, 0.2)";
ctx1.fillRect(200, 50, 200, 200);
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
        this.opacity -= 0.001;
        if (this.opacity <= 0){
            can.style.zIndex = -1
            return
        }
        ctx1.beginPath()
		ctx1.arc(this.x, this.y, this.size, 0, Math.PI * 2, true);
		ctx1.fillStyle = this.color + this.opacity  + ')';
		ctx1.fill();
        setTimeout(() => this.dodraw(), 10)
    }
	update(){
		this.size += this.size < innerWidth - 1000 ? 70 : 40;
		this.draw()
		if (this.size >= can.height ){
            this.live = false
            this.dodraw()
			return
		}
        setTimeout(() => this.update(), 10)
	}
}
function remake() {
    var sections = document.getElementsByTagName('section');
    for (var i = 0; i < sections.length; i++){
        sections[i].classList.toggle('dark' + sections[i].classList[0]);
    }
    cahgewaves();
}
function chagetheme(x, y){
    can.style.zIndex = 8;
    themeeditors.push(new Themededitor(x, y, bgcol ? 'rgba(0, 0, 0, ' : 'rgba(255, 255, 255, '))
    setTimeout(() => remake(), 200)
}
