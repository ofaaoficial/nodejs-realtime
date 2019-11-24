"use strict";
const cl = c => console.log(c);
const el = e => document.querySelector(e);
const on = (event, callback, el = document) => el.addEventListener(event, callback);

(()=> {
    const canvas = el('#app');
    const ctx = canvas.getContext('2d');
    const socket = io();

    const wWidth = canvas.width = window.innerWidth;
    const wHeight = canvas.height = window.innerHeight;

    const mouse = {
        line: {
            moveTo: { x: 0, y: 0 },
            lineTo: { x: 0, y: 0 }
        },
        actions: {
            click: false,
            move: false
        },
        handlers(){
            on('mousedown', () => this.actions.click = true, canvas);
            on('mouseup', () => this.actions.click = false, canvas);
             on('mousemove', (e) => {
                 [this.line.lineTo.x, this.line.lineTo.y] = [e.offsetX, e.offsetY];
                 this.actions.move = true;
             }, canvas);
            this.loop();
        },
        loop(){
            if(this.actions.click && this.actions.move){
                socket.emit('drawing', this.line);
                this.actions.move = false;
            }
            [this.line.moveTo.x, this.line.moveTo.y] = [this.line.lineTo.x, this.line.lineTo.y];

            requestAnimationFrame(this.loop.bind(this));
        },
        listen(data){
            ctx.beginPath();
                ctx.lineWidth = 2;
                ctx.moveTo(data.moveTo.x, data.moveTo.y);
                ctx.lineTo(data.lineTo.x, data.lineTo.y);
            ctx.stroke();
        }

    };

    mouse.handlers();
    socket.on('drawing', mouse.listen);

    cl('Script is works');
})();
