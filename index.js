const canvas = document.getElementById('landing-box');

const ctx = canvas.getContext('2d');

// Draw White Landing Box
ctx.fillStyle = "#6495ed";

// Place it in the center of the window
ctx.fillRect(0,0, canvas.width,canvas.height);