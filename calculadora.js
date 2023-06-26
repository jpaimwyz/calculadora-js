/* 
Quando alguém pega uma calculadora, eles podem apertar: 
1. um número (0-9);
2. um operador (+, -, *, /);
3. tecla decimal;
4. a tecla de igual;
5. a tecla de limpar;
 */
const calculadora = document.querySelector('.calculadora')
const teclas = document.querySelector('.calculadora_teclas')
const tela = document.querySelector('.calculadora_tela')

//Esse código permite ouvir todas as teclas, já que são filhas da classe .calculadora_teclas.
teclas.addEventListener('click', e =>{
    if(e.target.matches('button')){
        //o código abaixo determina qual tecla foi clicada usando o atributo data-action
        const tecla = e.target
        const accao = tecla.dataset.action
        /*Para fazer o código para mostrar os números e exibir na tela, precisamos de duas coisas: 
        1. qual tecla foi clicada;
        2. o número atual exibido;
        */
        const conteudoTecla = tecla.textContent
        const numeroNaTela = tela.textContent

        //Condição que verifica o atributo data-action, caso não tenha esse atributo, é considerada uma tecla númerica.
        if(!accao){
            if(numeroNaTela === '0'){
            tela.textContent = conteudoTecla
        } else{
            tela.textContent = numeroNaTela + conteudoTecla
        }
    }
        //Se ela tiver um data-action, que seja um dos que está abaixo, então, é um operador.
        if(
            accao === "adicionar" ||
            accao === "subtrair" ||
            accao === "multiplicar" ||
            accao === "dividir"
        ){
            console.log('Tecla de Operador')
        }
        //É o mesmo processo para as teclas de decimal, limpar e calcular
        if(accao === "decimal"){
            tela.textContent = numeroNaTela + '.'
        }
        if(accao === "limpar"){
            console.log('Tecla limpar')
        }
        if(accao === "calcular"){
            console.log('Tecla calcular')
        }
}
})