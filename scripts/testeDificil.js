const resultados = require('./dificuldadeDificil.json')

const { teste1, teste2, teste3 } = resultados[0]

const i_a_10 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]

const mediaRodadasSuperadasGeracaoTeste1 = teste1.map(item => {
    return item.reduce((acc, cur) => acc + (cur.ultimaWaveAtingida), 0) / item.length
})

const rodadaMaximaAtingida = i_a_10.map(i => {
    return teste1.map(item => item.reduce((acc, cur) => {
        if (cur.ultimaWaveAtingida === i) {
            return acc + 1
        } else return acc
    }, 0)
    )
})

console.log(mediaRodadasSuperadasGeracaoTeste1)
console.log(rodadaMaximaAtingida)
