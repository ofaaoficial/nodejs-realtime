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
        position: {
            x: 0,
            y: 0
        },
        actions: {
            click: false,
            move: false
        },
        handdlers(){
            on('mousedown', () => this.actions.click = true, canvas);
            on('mouseup', () => this.actions.click = false, canvas);
             on('mousemove', (e) => {
                 this.position.x = e.clientX / wWidth;
                 this.position.y = e.clientY / wHeight;
                 this.actions.move = true;
             }, canvas);
            this.loop();
        },
        loop(){
            if(this.actions.click && this.actions.move){
                cl('exec');

            }
            requestAnimationFrame(this.loop.bind(this));
        }
    };

    mouse.handdlers();

    cl('Script is works');
})();
