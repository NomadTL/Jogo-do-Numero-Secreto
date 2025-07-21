let listaDeNumerosSorteados = [];
let numeroLimite = 10;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

let vidas = 5;

function atualizarVidas() {
    exibirTextoNaTela('#vidas-restantes', `Vidas: ${vidas}`);
}

function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    campo.classList.remove('fade-in');
    void campo.offsetWidth;
    campo.classList.add('fade-in');
}


function exibirMensagemInicial() {
    exibirTextoNaTela('h1', 'Jogo do número secreto');
    exibirTextoNaTela('p', 'Escolha um número entre 1 e 10');
}

exibirMensagemInicial();

function verificarChute() {
    let chuteInput = document.querySelector('input');
    let chute = chuteInput.value.trim();

    if (chute === '' || isNaN(chute) || chute < 1 || chute > numeroLimite) {
        exibirTextoNaTela('p', `Por favor, insira um número válido entre 1 e ${numeroLimite}.`);
        chuteInput.value = '';
        chuteInput.focus();
        return;
    }

    chute = Number(chute);

    if (chute === numeroSecreto) {
        exibirTextoNaTela('h1', 'Acertou!');
        exibirTextoNaTela('p', `Você descobriu o número secreto com ${tentativas} tentativas!`);
        document.getElementById('reiniciar').removeAttribute('disabled');
        chuteInput.setAttribute('disabled', true);
        document.querySelector('.container__botao').setAttribute('disabled', true);
    } else {
        vidas--;
        tentativas++;

        if (vidas <= 0) {
            exibirTextoNaTela('h1', 'Game Over!');
            exibirTextoNaTela('p', `Você perdeu todas as vidas! O número secreto era ${numeroSecreto}.`);
            chuteInput.setAttribute('disabled', true);
            document.querySelector('.container__botao').setAttribute('disabled', true);
            document.getElementById('reiniciar').removeAttribute('disabled');
        } else {
            if (chute > numeroSecreto) {
                exibirTextoNaTela('p', 'O número secreto é menor');
            } else {
                exibirTextoNaTela('p', 'O número secreto é maior');
            }
            atualizarVidas();
            limparCampo();
        }
    }
}

function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;

    if (quantidadeDeElementosNaLista == numeroLimite) {
        listaDeNumerosSorteados = [];
    }
    if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio();
    } else {
        listaDeNumerosSorteados.push(numeroEscolhido);
        console.log(listaDeNumerosSorteados)
        return numeroEscolhido;
    }
}

function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    vidas = 5;
    tentativas = 1;
    exibirMensagemInicial();
    atualizarVidas();

    let chuteInput = document.querySelector('input');
    chuteInput.removeAttribute('disabled');
    chuteInput.value = '';
    chuteInput.focus();

    document.querySelector('.container__botao').removeAttribute('disabled');
    document.getElementById('reiniciar').setAttribute('disabled', true);
}

atualizarVidas();
