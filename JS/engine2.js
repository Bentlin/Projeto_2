const tamanho = 15;
    const palavras = ["LER", "DORMIR", "CONVERSAR", "ESTUDAR", "COMER", "CORRER", "AMAR", "DANÇAR"];
    const alfabeto = "ABCDEFGHIJKLMNOPQRSTUVWXYZÇ";
    const matriz = Array.from({ length: tamanho }, () => Array(tamanho).fill(''));
    let selecionadas = [];
    const palavrasEncontradas = new Set();

var win = new Image();
win.src = 'IMG/GANHOU.png';

var palavra = document.getElementById('jogo');
var verifica = document.getElementById('verificar');

function inserirPalavra(palavra) {
    let direcao, linha, coluna, podeInserir;
    const tentativas = 100;

    for (let tentativa = 0; tentativa < tentativas; tentativa++) {
        direcao = Math.floor(Math.random() * 3);
        linha = Math.floor(Math.random() * tamanho);
        coluna = Math.floor(Math.random() * tamanho);

        podeInserir = true;
        for (let i = 0; i < palavra.length; i++) {
            let l = linha, c = coluna;
            if (direcao === 0) c += i; // Horizontal
            else if (direcao === 1) l += i; // Vertical
            else { l += i; c += i; } // Diagonal

            if (l >= tamanho || c >= tamanho || (matriz[l][c] && matriz[l][c] !== palavra[i])) {
                podeInserir = false;
                break;
            }
        }

        if (podeInserir) {
            for (let i = 0; i < palavra.length; i++) {
                let l = linha, c = coluna;
                if (direcao === 0) c += i; // Horizontal
                else if (direcao === 1) l += i; // Vertical
                else { l += i; c += i; } // Diagonal

                matriz[l][c] = palavra[i];
            }
            return true;
        }
    }
    return false;
}

function preencherMatriz() {
    matriz.forEach((linha, i) => {
        linha.forEach((_, j) => {
            if (matriz[i][j] === '') {
                matriz[i][j] = alfabeto[Math.floor(Math.random() * alfabeto.length)];
            }
        });
    });
}

function renderizarMatriz() {
    const tabela = document.getElementById('procura');
    tabela.innerHTML = '';
    matriz.forEach((linha, i) => {
        const linhaEl = document.createElement('tr');
        linha.forEach((letra, j) => {
            const celula = document.createElement('td');
            celula.textContent = letra;
            celula.onclick = () => selecionarCelula(celula, i, j);
            linhaEl.appendChild(celula);
        });
        tabela.appendChild(linhaEl);
    });
}

function renderizarListaPalavras() {
    const lista = document.getElementById('lista');
    lista.innerHTML = '';
    palavras.forEach(palavra => {
        const item = document.createElement('li');
        item.textContent = palavra;
        item.classList.add('word-item');
        lista.appendChild(item);
    });
}

function selecionarCelula(celula, linha, coluna) {
    if (celula.classList.contains('selected')) {
        celula.classList.remove('selected');
        selecionadas = selecionadas.filter(coord => !(coord.linha === linha && coord.coluna === coluna));
    } else {
        celula.classList.add('selected');
        selecionadas.push({ linha, coluna });
    }
}

function Ganhou(){
    context.drawImage(win, 0, 45, canvas.width, 610);
    verifica.style.display = 'none';
    palavra.style.display = 'none';
}

function verificarPalavra() {
    const palavraSelecionada = selecionadas.map(coord => matriz[coord.linha][coord.coluna]).join('');
    if (palavras.includes(palavraSelecionada) && !palavrasEncontradas.has(palavraSelecionada)) {
        palavrasEncontradas.add(palavraSelecionada);
        document.querySelectorAll('.word-item').forEach(item => {
            if (item.textContent === palavraSelecionada) {
                item.classList.add('encontro');
            }
        });
        selecionadas.forEach(coord => {
            const celula = document.getElementById('procura').rows[coord.linha].cells[coord.coluna];
            celula.classList.add('found');
        });
    }
    selecionadas.forEach(coord => {
        const celula = document.getElementById('procura').rows[coord.linha].cells[coord.coluna];
        celula.classList.remove('selected');
    });
    selecionadas = [];

    if (palavrasEncontradas.size === palavras.length) {
        Ganhou();
    }
}

palavras.forEach(palavra => inserirPalavra(palavra));
preencherMatriz();
renderizarMatriz();
renderizarListaPalavras();