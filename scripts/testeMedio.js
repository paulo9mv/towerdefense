const resultados = require('./dificuldadeDificil.json')

const { teste1, teste2, teste3 } = resultados[0]

const i_a_10 = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11]

const rodadasSuperadasGeracao0_0 = teste1[0].reduce((acc, cur) => acc + (cur.ultimaWaveAtingida), 0)
const rodadasSuperadasGeracao1_0 = teste1[1].reduce((acc, cur) => acc + (cur.ultimaWaveAtingida), 0)

const rodadasSuperadasGeracao0_1 = teste2[0].reduce((acc, cur) => acc + (cur.ultimaWaveAtingida), 0)
const rodadasSuperadasGeracao1_1 = teste2[1].reduce((acc, cur) => acc + (cur.ultimaWaveAtingida), 0)

const rodadasSuperadasGeracao0_2 = teste3[0].reduce((acc, cur) => acc + (cur.ultimaWaveAtingida), 0)
const rodadasSuperadasGeracao1_2 = teste3[1].reduce((acc, cur) => acc + (cur.ultimaWaveAtingida), 0)


const superadosPorRodada = i_a_10.map(item => {
    return teste1[0].reduce((acc, cur) => {
        if (cur.ultimaWaveAtingida  == item) {
            return acc + 1
        } else return acc
    }, 0
    )
})

const superadosPorRodada1 = i_a_10.map(item => {
    return teste1[1].reduce((acc, cur) => {
        if (cur.ultimaWaveAtingida  == item) {
            return acc + 1
        } else return acc
    }, 0
    )
})

const superadosPorRodada2 = i_a_10.map(item => {
    return teste2[0].reduce((acc, cur) => {
        if (cur.ultimaWaveAtingida  == item) {
            return acc + 1
        } else return acc
    }, 0
    )
})

const superadosPorRodada2_1 = i_a_10.map(item => {
    return teste2[1].reduce((acc, cur) => {
        if (cur.ultimaWaveAtingida  == item) {
            return acc + 1
        } else return acc
    }, 0
    )
})

const superadosPorRodada3 = i_a_10.map(item => {
    return teste3[0].reduce((acc, cur) => {
        if (cur.ultimaWaveAtingida  == item) {
            return acc + 1
        } else return acc
    }, 0
    )
})

const superadosPorRodada3_1 = i_a_10.map(item => {
    return teste3[1].reduce((acc, cur) => {
        if (cur.ultimaWaveAtingida  == item) {
            return acc + 1
        } else return acc
    }, 0
    )
})







console.log("Teste 1")
console.log('Media de rodada atingida: ', rodadasSuperadasGeracao0_0 / teste1[0].length)
console.log('Media de rodada atingida: ', rodadasSuperadasGeracao1_0 / teste1[1].length)
console.log(superadosPorRodada)
console.log(superadosPorRodada1)

console.log("Teste 2")
console.log('Media de rodada atingida: ', rodadasSuperadasGeracao0_1 / teste1[0].length)
console.log('Media de rodada atingida: ', rodadasSuperadasGeracao1_1 / teste1[1].length)
console.log(superadosPorRodada2)
console.log(superadosPorRodada2_1)


console.log("Teste 3")
console.log('Media de rodada atingida: ', rodadasSuperadasGeracao0_2 / teste1[0].length)
console.log('Media de rodada atingida: ', rodadasSuperadasGeracao1_2 / teste1[1].length)

console.log(superadosPorRodada3)
console.log(superadosPorRodada3_1)