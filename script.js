const game =
document.querySelector(".game");

const player =
document.getElementById("player");

const lanes = [55,175,295];

let lane = 1;

player.style.left =
lanes[lane]+"px";

let score = 0;
let coins = 0;
let speed = 6;
let playing = true;

/* ROAD LINES */

for(let i=0;i<10;i++){

let l1 =
document.createElement("div");

l1.className =
"line";

l1.style.top =
(i*100)+"px";

game.appendChild(l1);

let l2 =
document.createElement("div");

l2.className =
"line line2";

l2.style.top =
(i*100)+"px";

game.appendChild(l2);

let l3 =
document.createElement("div");

l3.className =
"line line3";

l3.style.top =
(i*100)+"px";

game.appendChild(l3);

}

const lines =
document.querySelectorAll(
".line"
);

function animateRoad(){

lines.forEach(line=>{

let top =
parseInt(
line.style.top
);

top += speed;

if(top > 800){

top = -100;
}

line.style.top =
top+"px";

});

requestAnimationFrame(
animateRoad
);

}

animateRoad();

/* PLAYER */

function moveLeft(){

if(lane>0){

lane--;

player.style.left =
lanes[lane]+"px";

}

}

function moveRight(){

if(lane<2){

lane++;

player.style.left =
lanes[lane]+"px";

}

}

document.addEventListener(
"keydown",
e=>{

if(e.key==="ArrowLeft")
moveLeft();

if(e.key==="ArrowRight")
moveRight();

}
);

/* SPAWN */

function spawnItem(){

if(!playing) return;

const isCoin =
Math.random()<0.55;

const item =
document.createElement("div");

item.className =
isCoin ?
"coin" :
"obstacle";

item.innerHTML =
isCoin ?
"🪙" :
"💣";

const itemLane =
Math.floor(
Math.random()*3
);

item.style.left =
lanes[itemLane]+"px";

item.style.top =
"-60px";

game.appendChild(item);

let y = -60;

function move(){

if(!playing) return;

y += speed;

item.style.top =
y+"px";

const itemRect =
item.getBoundingClientRect();

const playerRect =
player.getBoundingClientRect();

if(

itemRect.left <
playerRect.right &&

itemRect.right >
playerRect.left &&

itemRect.top <
playerRect.bottom &&

itemRect.bottom >
playerRect.top

){

if(isCoin){

coins++;

score += 5;

item.remove();

}else{

gameOver();

return;

}

}

if(y > 800){

item.remove();

score++;

}

else{

requestAnimationFrame(
move
);

}

}

move();

setTimeout(
spawnItem,
700
);

}

spawnItem();

/* SCORE LOOP */

setInterval(()=>{

if(!playing) return;

score++;

document.getElementById(
"score"
).innerText =
score;

document.getElementById(
"coins"
).innerText =
coins;

document.getElementById(
"speed"
).innerText =
Math.floor(speed);

if(score % 100 === 0){

speed += .5;

}

},200);

/* GAME OVER */

function gameOver(){

playing = false;

document.getElementById(
"final"
).innerHTML =

"Score: "+score+
"<br>Coins: "+coins;

document.getElementById(
"gameover"
).style.display =
"flex";

}
