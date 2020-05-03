var canvas = document.createElement('canvas'),
    ctx = canvas.getContext('2d'),
    W,H,
    key = [];
canvas.tabIndex = 0;
canvas.width = W = 200;
canvas.height = H = 200;
ctx.font = 'bold 22px Courier New';
ctx.textBaseline = 'top';
ctx.textAlign = 'center';
document.body.appendChild(canvas);
document.body.appendChild((function(){var p = document.createElement('p');p.innerHTML = "<p>To use this, click the above box and press some keys.</p>"; return p;})());
canvas.focus();
document.body.onmouseover = function(){
    canvas.focus();
}
canvas.onkeydown = canvas.onkeyup = function(e){
    var e = e || event;
    key[e.keyCode] = e.type == 'keydown';
};
(function loop(){
    ctx.clearRect(0,0,W,H);
    var y = 0, l = key.length, i, t;
    for(i = 0; i < l; i ++){
        if(key[i]){
            t = i + ' (0x'+i.toString(16)+')';
            ctx.fillText(t,canvas.width/2,y);
            y += 22;
        }
    }
    setTimeout(loop,1000/24);
})();
