window.onload=function(){
	u();
	v();
	x();

	y();
	z();
	q();

};

function u(){

var img1 =document.getElementById('img1');
img1.addEventListener('mouseup', function(event){
document.getElementById('img1').src="img/s2_btn1.png";
console.log('up');

window.location.assign("frame2.html");
// var btnX = document.getElementById('scene2').offsetLeft;
// console.log(btnX);
},false);
img1.addEventListener('mousedown', function(event){
document.getElementById('img1').src="img/s2_btn2.png";
console.log('down');
},false);};

function y(){

var img1 =document.getElementById('img1');
img1.addEventListener('touchend', function(event){
document.getElementById('img1').src="img/s2_btn1.png";
console.log('up');

window.location.assign("frame2.html");
// var btnX = document.getElementById('scene2').offsetLeft;
// console.log(btnX);
},false);
img1.addEventListener('touchstart', function(event){
document.getElementById('img1').src="img/s2_btn2.png";
console.log('down');
},false);};





function v(){


var img1 =document.getElementById('img2');
img1.addEventListener('mouseup', function(event){
document.getElementById('img2').src="img/s2_btn2.png";
console.log('up');

window.location.assign("index.html");
// var btnX = document.getElementById('img1').offsetLeft;
// console.log(btnX);
},false);
img1.addEventListener('mousedown', function(event){
document.getElementById('img2').src="img/s2_btn3.png";
console.log('down');
},false);};

function z(){


var img1 =document.getElementById('img2');
img1.addEventListener('touchend', function(event){
document.getElementById('img2').src="img/s2_btn2.png";
console.log('up');

window.location.assign("index.html");
// var btnX = document.getElementById('img1').offsetLeft;
// console.log(btnX);
},false);
img1.addEventListener('touchstart', function(event){
document.getElementById('img2').src="img/s2_btn3.png";
console.log('down');
},false);};



function x(){
var img1 =document.getElementById('img3');
img1.addEventListener('mouseup', function(event){
document.getElementById('img3').src="img/s2_btn3.png";
console.log('up');

window.location.assign("index02.html");
},false);
img1.addEventListener('mousedown', function(event){
document.getElementById('img3').src="img/s2_btn1.png";
console.log('down');
},false);};

function q(){
var img1 =document.getElementById('img3');
img1.addEventListener('touchend', function(event){
document.getElementById('img3').src="img/s2_btn3.png";
console.log('up');

window.location.assign("index02.html");
},false);
img1.addEventListener('touchstart', function(event){
document.getElementById('img3').src="img/s2_btn1.png";
console.log('down');
},false);};


