/* Vou refazer o códigp do zero. */
/* Função calcular - criada depois */
const calcular = (n1, operator, n2) => {
    const primeiroNum = parseFloat(n1)
    const segundoNum = parseFloat (n2)
    //Tem a opção de ficar com ou sem colchetes, vou mantê-las
    if(operator === 'adicionar'){
        return primeiroNum + segundoNum
    } 
    if(operator === 'subtrair'){
        return primeiroNum - segundoNum
    }
    if(operator === 'multiplicar'){
        return primeiroNum * segundoNum
    }
    if(operator === 'dividir'){
        return primeiroNum / segundoNum
    }
}

const calculadora = document.querySelector('.calculadora')
const teclas = calculadora.querySelector('.calculadora_teclas')
const ecrã = calculadora.querySelector('.calculadora_tela')

teclas.addEventListener('click', e => {
    if(e.target.matches('button')){
        const tecla = e.target
        const ação = tecla.dataset.action
        const conteudoTecla = tecla.textContent
        const numeroNaTela = ecrã.textContent
        const teclaAnterior = calculadora.dataset.previousKeyType

        Array.from(tecla.parentNode.children).forEach(k => k.classList.remove('pressionado'))
        //Números
        if(!ação){
            if(numeroNaTela === '0' || 
            teclaAnterior === 'operador' || teclaAnterior === 'calcular'){
                ecrã.textContent = conteudoTecla
            } else {
                ecrã.textContent = numeroNaTela + conteudoTecla
            }
            calculadora.dataset.previousKeyType = 'numero'
        }

        //Operadores
        if(ação === 'adicionar' || ação === 'subtrair' || ação === 'multiplicar' || ação === 'dividir'){
            const primeiroValor = calculadora.dataset.firstValue
            const operador = calculadora.dataset.operator
            const segundoValor = numeroNaTela

            if(primeiroValor && operador && teclaAnterior !== 'operador' && teclaAnterior !== 'calcular'){
                const valorCalculado = calcular(primeiroValor, operador, segundoValor)
                ecrã.textContent = valorCalculado
                calculadora.dataset.firstValue = valorCalculado
            } else {
                calculadora.dataset.firstValue = numeroNaTela
            }

            tecla.classList.add('pressionado')
            calculadora.dataset.previousKeyType = 'operador'
            calculadora.dataset.operator = ação

        }

        //Decimal, Limpar e Calcular
        if(ação === 'decimal'){
            if(!numeroNaTela.includes('.')){
                ecrã.textContent = numeroNaTela + '.'
            }
            else if(teclaAnterior === 'operador' || teclaAnterior === 'calcular'){
                ecrã.textContent = '0.'
            }
            calculadora.dataset.previousKeyType = 'decimal'
        }

        if(ação === 'limpar'){
            if(tecla.textContent === 'AC'){
                calculadora.dataset.firstValue = ''
                calculadora.dataset.modValue = ''
                calculadora.dataset.operator = ''
                calculadora.dataset.previousKeyType = ''
            } else{
                tecla.textContent = 'AC'
            }
            ecrã.textContent = 0
            calculadora.dataset.previousKeyType = ' limpar'
        }
        if(ação !== 'limpar'){
            const btnLimpar = calculadora.querySelector('[data-action=limpar]')
            btnLimpar.textContent = 'CE'
        }

        if(ação === 'calcular'){
            let primeiroValor = calculadora.dataset.firstValue
            const operador = calculadora.dataset.operator
            let segundoValor = numeroNaTela

            if(primeiroValor){
                if(teclaAnterior === 'calcular'){
                    primeiroValor = numeroNaTela
                    segundoValor = calculadora.dataset.modValue
                }
                ecrã.textContent = calcular(primeiroValor, operador, segundoValor)
            }

            calculadora.dataset.modValue = segundoValor
            calculadora.dataset.previousKeyType = 'calcular'
        }
        
    }
})