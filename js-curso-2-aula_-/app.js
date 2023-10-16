//let titulo = document.querySelector('h1'); //document querySelector para selecionar o h1 do html
//titulo.innerHTML = 'Jogo do número secreto'; //innerHTML é para manipular o h1 

//let paragrafo = document.querySelector('p');
//paragrafo.innerHTML = 'Escolha um número entre 1 e 10';
let listaDeNumerosSorteados = [];
let numeroLimite = 10;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

function exibirTextoNaTela(tag, texto){
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
}

function exibirMensagemInicial() {
    exibirTextoNaTela('h1', 'Jogo do número secreto');
    exibirTextoNaTela('p', 'Escolha um número entre 1 e 10');
}

exibirMensagemInicial();

function verificarChute(){
    let chute = document.querySelector('input').value; //input entrada do usuario, value para pegar somente o valor
    if (chute == numeroSecreto){
        exibirTextoNaTela('h1', 'Acertou!');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa!}`;
        exibirTextoNaTela('p', mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
        else {
            if (chute > numeroSecreto){
                exibirTextoNaTela('p', 'O número secreto é menor');
            } else {
                exibirTextoNaTela('p', 'O número secreto é maior');
            }
            tentativas++; //recebe o valor dela mesma mais 1
            limparCampo();
        }
    }
} 

function gerarNumeroAleatorio(){
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1); //parseInt para pegar a parte inteira
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;

    if (quantidadeDeElementosNaLista == numeroLimite){ //== é para comparar
        listaDeNumerosSorteados = [];
    }

    if (listaDeNumerosSorteados.includes(numeroEscolhido)) { //includes verifica se o numero está na lista
        return gerarNumeroAleatorio(); //return retona para onde a função foi chamada
    } else {
        listaDeNumerosSorteados.push(numeroEscolhido); //push adiciona o item na lista, sempre coloca no final da lista
        return numeroEscolhido;
    }
}

function limparCampo(){
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true); //o by id é para colocar o botão que no html está como reiniciar
}