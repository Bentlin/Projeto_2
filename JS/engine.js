var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
var botao = document.getElementById('btnStart');
var palavra = document.getElementById('jogo');

var img = new Image();
img.src = 'IMG/capa.png';

var fundo = new Image();
fundo.src = 'IMG/LAYOUT.png';

img.onload = function(){
    context.drawImage(img, 0, 50, canvas.width, 600);
    palavra.style.display = 'none';
}

function iniciarJogo() {
    context.drawImage(fundo, 0, 35, canvas.width, 625);
    botao.style.display = 'none';
    palavra.style.display = 'block';
}

botao.addEventListener('click', function(){
    iniciarJogo();
});

