const calcular = (n1, operador, n2) => {
    let resultado = ''

    if(operador === 'adicionar'){
        resultado = parseFloat(n1) + parseFloat(n2)
    } else if(operador === 'subtrair'){
        resultado = parseFloat(n1) - parseFloat(n2)
    } else if(operador === 'multiplicar'){
        resultado = parseFloat(n1) * parseFloat(n2)
    } else if(operador === 'dividir'){
        resultado = parseFloat(n1) / parseFloat(n2)
    }

    return resultado
}


const calculadora = document.querySelector('.calculadora')
const teclas = calculadora.querySelector('.calculadora_teclas')
const tela = document.querySelector('.calculadora_tela')

teclas.addEventListener('click', e =>{
    if(e.target.matches('button')){
        const tecla = e.target
        const action = tecla.dataset.action
        const teclaConteudo = tecla.textContent
        const numNaTela = tela.textContent
        const previousKeyType = calculadora.dataset.previousKeyType

        Array.from(tecla.parentNode.children).forEach(t => t.classList.remove('pressionado'))
        
        if(!action){
            if(numNaTela === '0' || previousKeyType === 'operador'){
                tela.textContent = teclaConteudo
            } else {
                tela.textContent = numNaTela + teclaConteudo
            }
        }
        
        if(
            action === 'adicionar' || 
            action === 'subtrair' || 
            action === 'multiplicar' || 
            action === 'dividir'
            ){
            tecla.classList.add('pressionado')
            calculadora.dataset.previousKeyType = 'operador'
            calculadora.dataset.firstValue = numNaTela
            calculadora.dataset.operador = action
            }
       
        
        if(action === 'decimal'){
            tela.textContent = numNaTela + '.'
        }
        if(action === 'limpar'){
            tela.textContent = '0'
        }
        if(action === 'calcular'){
            const pValor = calculadora.dataset.firstValue
            const operacao = calculadora.dataset.operador
            const sValor = numNaTela

            tela.textContent = calcular(pValor, operacao, sValor)
        }
    }
})
