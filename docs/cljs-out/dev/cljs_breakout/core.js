// Compiled by ClojureScript 1.10.773 {}
goog.provide('cljs_breakout.core');
goog.require('cljs.core');
cljs.core.enable_console_print_BANG_.call(null);
cljs_breakout.core.canvas = document.getElementById("my-canvas");
cljs_breakout.core.ctx = cljs_breakout.core.canvas.getContext("2d");
cljs_breakout.core.x = (cljs_breakout.core.canvas.width / (2));
cljs_breakout.core.y = (cljs_breakout.core.canvas.height - (30));
cljs_breakout.core.dx = (4);
cljs_breakout.core.dy = (-4);
cljs_breakout.core.ball_radius = (10);
cljs_breakout.core.paddle_height = (10);
cljs_breakout.core.paddle_width = (75);
cljs_breakout.core.paddle_x = ((cljs_breakout.core.canvas.width - cljs_breakout.core.paddle_width) / (2));
cljs_breakout.core.right_pressed = false;
cljs_breakout.core.left_pressed = false;
cljs_breakout.core.brick_row_count = (5);
cljs_breakout.core.brick_column_count = (10);
cljs_breakout.core.brick_width = (33);
cljs_breakout.core.brick_height = (20);
cljs_breakout.core.brick_padding = (10);
cljs_breakout.core.brick_offset_top = (30);
cljs_breakout.core.brick_offset_left = (30);
cljs_breakout.core.score = (0);
cljs_breakout.core.lives = (3);
cljs_breakout.core.fill_style = "#0095DD";
cljs_breakout.core.bricks = cljs.core.vec.call(null,cljs.core.repeat.call(null,cljs_breakout.core.brick_column_count,cljs.core.vec.call(null,cljs.core.repeat.call(null,cljs_breakout.core.brick_row_count,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"x","x",2099068185),(0),new cljs.core.Keyword(null,"y","y",-1757859776),(0),new cljs.core.Keyword(null,"status","status",-1997798413),(1)], null)))));
cljs_breakout.core.key_down_handler = (function cljs_breakout$core$key_down_handler(e){
var pressed = e.key;
if(((cljs.core._EQ_.call(null,"Right",pressed)) || (cljs.core._EQ_.call(null,"ArrowRight",pressed)))){
(cljs_breakout.core.right_pressed = true);
} else {
}

if(((cljs.core._EQ_.call(null,"Left",pressed)) || (cljs.core._EQ_.call(null,"ArrowLeft",pressed)))){
return (cljs_breakout.core.left_pressed = true);
} else {
return null;
}
});
cljs_breakout.core.key_up_handler = (function cljs_breakout$core$key_up_handler(e){
var pressed = e.key;
if(((cljs.core._EQ_.call(null,"Right",pressed)) || (cljs.core._EQ_.call(null,"ArrowRight",pressed)))){
(cljs_breakout.core.right_pressed = false);
} else {
}

if(((cljs.core._EQ_.call(null,"Left",pressed)) || (cljs.core._EQ_.call(null,"ArrowLeft",pressed)))){
return (cljs_breakout.core.left_pressed = false);
} else {
return null;
}
});
cljs_breakout.core.mouse_move_handler = (function cljs_breakout$core$mouse_move_handler(e){
var relative_x = (e.clientX - cljs_breakout.core.canvas.offsetLeft);
if((((relative_x > (0))) && ((cljs_breakout.core.canvas.width > relative_x)))){
return (cljs_breakout.core.paddle_x = (relative_x - (cljs_breakout.core.paddle_width / (2))));
} else {
return null;
}
});
cljs_breakout.core.collision_detection = (function cljs_breakout$core$collision_detection(){
var n__4613__auto__ = cljs_breakout.core.brick_row_count;
var r = (0);
while(true){
if((r < n__4613__auto__)){
var n__4613__auto___28405__$1 = cljs_breakout.core.brick_column_count;
var c_28406 = (0);
while(true){
if((c_28406 < n__4613__auto___28405__$1)){
var b_28407 = cljs.core.get_in.call(null,cljs_breakout.core.bricks,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [c_28406,r], null));
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"status","status",-1997798413).cljs$core$IFn$_invoke$arity$1(b_28407),(1))){
if((((cljs_breakout.core.x > new cljs.core.Keyword(null,"x","x",2099068185).cljs$core$IFn$_invoke$arity$1(b_28407))) && ((cljs_breakout.core.y > new cljs.core.Keyword(null,"y","y",-1757859776).cljs$core$IFn$_invoke$arity$1(b_28407))) && (((new cljs.core.Keyword(null,"x","x",2099068185).cljs$core$IFn$_invoke$arity$1(b_28407) + cljs_breakout.core.brick_width) > cljs_breakout.core.x)) && (((new cljs.core.Keyword(null,"y","y",-1757859776).cljs$core$IFn$_invoke$arity$1(b_28407) + cljs_breakout.core.brick_height) > cljs_breakout.core.y)))){
(cljs_breakout.core.dy = (- cljs_breakout.core.dy));

(cljs_breakout.core.bricks = cljs.core.assoc_in.call(null,cljs_breakout.core.bricks,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [c_28406,r,new cljs.core.Keyword(null,"status","status",-1997798413)], null),(0)));

(cljs_breakout.core.score = (cljs_breakout.core.score + (1)));

if(cljs.core._EQ_.call(null,cljs_breakout.core.score,(cljs_breakout.core.brick_column_count * cljs_breakout.core.brick_row_count))){
alert("YOU WIN. CONGRATULATIONS!");

window.location.reload();
} else {
}
} else {
}
} else {
}

var G__28408 = (c_28406 + (1));
c_28406 = G__28408;
continue;
} else {
}
break;
}

var G__28409 = (r + (1));
r = G__28409;
continue;
} else {
return null;
}
break;
}
});
cljs_breakout.core.draw_score = (function cljs_breakout$core$draw_score(){
(cljs_breakout.core.ctx["font"] = "16px Arial");

(cljs_breakout.core.ctx["fillStyle"] = cljs_breakout.core.fill_style);

return cljs_breakout.core.ctx.fillText(["score: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs_breakout.core.score)].join(''),(8),(20));
});
cljs_breakout.core.draw_livs = (function cljs_breakout$core$draw_livs(){
(cljs_breakout.core.ctx["font"] = "16px Arial");

(cljs_breakout.core.ctx["fillStyle"] = cljs_breakout.core.fill_style);

return cljs_breakout.core.ctx.fillText(["Lives: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs_breakout.core.lives)].join(''),(cljs_breakout.core.canvas.width - (65)),(20));
});
cljs_breakout.core.draw_ball = (function cljs_breakout$core$draw_ball(){
cljs_breakout.core.ctx.beginPath();

cljs_breakout.core.ctx.arc(cljs_breakout.core.x,cljs_breakout.core.y,cljs_breakout.core.ball_radius,(0),(Math.PI * (2)));

(cljs_breakout.core.ctx["fillStyle"] = cljs_breakout.core.fill_style);

cljs_breakout.core.ctx.fill();

return cljs_breakout.core.ctx.closePath();
});
cljs_breakout.core.draw_paddle = (function cljs_breakout$core$draw_paddle(){
cljs_breakout.core.ctx.beginPath();

cljs_breakout.core.ctx.rect(cljs_breakout.core.paddle_x,(cljs_breakout.core.canvas.height - cljs_breakout.core.paddle_height),cljs_breakout.core.paddle_width,cljs_breakout.core.paddle_height);

(cljs_breakout.core.ctx["fillStyle"] = cljs_breakout.core.fill_style);

cljs_breakout.core.ctx.fill();

return cljs_breakout.core.ctx.closePath();
});
cljs_breakout.core.draw_bricks = (function cljs_breakout$core$draw_bricks(){
var n__4613__auto__ = cljs_breakout.core.brick_column_count;
var c = (0);
while(true){
if((c < n__4613__auto__)){
var n__4613__auto___28410__$1 = cljs_breakout.core.brick_row_count;
var r_28411 = (0);
while(true){
if((r_28411 < n__4613__auto___28410__$1)){
if(cljs.core._EQ_.call(null,cljs.core.get_in.call(null,cljs_breakout.core.bricks,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [c,r_28411,new cljs.core.Keyword(null,"status","status",-1997798413)], null)),(1))){
var brick_x_28412 = ((c * (cljs_breakout.core.brick_width + cljs_breakout.core.brick_padding)) + cljs_breakout.core.brick_offset_left);
var brick_y_28413 = ((r_28411 * (cljs_breakout.core.brick_height + cljs_breakout.core.brick_padding)) + cljs_breakout.core.brick_offset_top);
(cljs_breakout.core.bricks = cljs.core.assoc_in.call(null,cljs_breakout.core.bricks,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [c,r_28411,new cljs.core.Keyword(null,"x","x",2099068185)], null),brick_x_28412));

(cljs_breakout.core.bricks = cljs.core.assoc_in.call(null,cljs_breakout.core.bricks,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [c,r_28411,new cljs.core.Keyword(null,"y","y",-1757859776)], null),brick_y_28413));

cljs_breakout.core.ctx.beginPath();

cljs_breakout.core.ctx.rect(brick_x_28412,brick_y_28413,cljs_breakout.core.brick_width,cljs_breakout.core.brick_height);

(cljs_breakout.core.ctx["fillStyle"] = cljs_breakout.core.fill_style);

cljs_breakout.core.ctx.fill();

cljs_breakout.core.ctx.closePath();
} else {
}

var G__28414 = (r_28411 + (1));
r_28411 = G__28414;
continue;
} else {
}
break;
}

var G__28415 = (c + (1));
c = G__28415;
continue;
} else {
return null;
}
break;
}
});
cljs_breakout.core.draw = (function cljs_breakout$core$draw(){
cljs_breakout.core.ctx.clearRect((0),(0),cljs_breakout.core.canvas.width,cljs_breakout.core.canvas.height);

cljs_breakout.core.draw_bricks.call(null);

cljs_breakout.core.draw_ball.call(null);

cljs_breakout.core.draw_paddle.call(null);

cljs_breakout.core.draw_score.call(null);

cljs_breakout.core.draw_livs.call(null);

cljs_breakout.core.collision_detection.call(null);

if(((cljs_breakout.core.y + cljs_breakout.core.dy) < cljs_breakout.core.ball_radius)){
(cljs_breakout.core.dy = (- cljs_breakout.core.dy));
} else {
}

if(((cljs_breakout.core.y + cljs_breakout.core.dy) > (cljs_breakout.core.canvas.height - cljs_breakout.core.ball_radius))){
if((((cljs_breakout.core.paddle_x < cljs_breakout.core.x)) && ((cljs_breakout.core.x < (cljs_breakout.core.paddle_x + cljs_breakout.core.paddle_width))))){
(cljs_breakout.core.dy = (- (cljs_breakout.core.dy + 0.5)));
} else {
(cljs_breakout.core.lives = (cljs_breakout.core.lives - (1)));

if((cljs_breakout.core.lives === (0))){
alert("GAME OVER");

window.location.reload();
} else {
(cljs_breakout.core.x = (cljs_breakout.core.canvas.width / (2)));

(cljs_breakout.core.y = (cljs_breakout.core.canvas.height - (30)));

(cljs_breakout.core.dx = (4));

(cljs_breakout.core.dy = (-4));

(cljs_breakout.core.paddle_x = ((cljs_breakout.core.canvas.width - cljs_breakout.core.paddle_width) / (2)));
}
}
} else {
}

if(((((cljs_breakout.core.x + cljs_breakout.core.dx) < cljs_breakout.core.ball_radius)) || (((cljs_breakout.core.x + cljs_breakout.core.dx) > (cljs_breakout.core.canvas.width - cljs_breakout.core.ball_radius))))){
(cljs_breakout.core.dx = (- cljs_breakout.core.dx));
} else {
}

if(((cljs_breakout.core.right_pressed === true) && ((cljs_breakout.core.paddle_x < (cljs_breakout.core.canvas.width - cljs_breakout.core.paddle_width))))){
(cljs_breakout.core.paddle_x = (cljs_breakout.core.paddle_x + (7)));
} else {
}

if(((cljs_breakout.core.left_pressed === true) && (((0) < cljs_breakout.core.paddle_x)))){
(cljs_breakout.core.paddle_x = (cljs_breakout.core.paddle_x - (7)));
} else {
}

(cljs_breakout.core.x = (cljs_breakout.core.x + cljs_breakout.core.dx));

(cljs_breakout.core.y = (cljs_breakout.core.y + cljs_breakout.core.dy));

return requestAnimationFrame(cljs_breakout.core.draw);
});
addEventListener("keydown",cljs_breakout.core.key_down_handler,false);
addEventListener("keyup",cljs_breakout.core.key_up_handler,false);
addEventListener("mousemove",cljs_breakout.core.mouse_move_handler,false);
cljs_breakout.core.draw.call(null);

//# sourceMappingURL=core.js.map
