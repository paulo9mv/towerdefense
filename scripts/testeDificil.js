const resultados = require('./dificuldadeDificil.json')

const { teste1, teste2, teste3 } = resultados[0]

const i_a_10 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]

const getRodadaAtingida = array => {
    return array.map(item => {
        return i_a_10.map(i => item.reduce((acc, cur) => {
            if (cur.ultimaWaveAtingida === i) {
                return acc + 1
            } else return acc
        }, 0)
        )
    })
}

const getMediaRodadasSuperadasGeracao = array => {
    return array.map(item => {
        return item.reduce((acc, cur) => acc + (cur.ultimaWaveAtingida), 0) / item.length
    })
}

const rodadasTeste1 = getRodadaAtingida(teste1)
const mediaRodadasSuperadas1 = getMediaRodadasSuperadasGeracao(teste1)

const rodadasTeste2 = getRodadaAtingida(teste2)
const mediaRodadasSuperadas2 = getMediaRodadasSuperadasGeracao(teste2)

const rodadasTeste3 = getRodadaAtingida(teste3)
const mediaRodadasSuperadas3 = getMediaRodadasSuperadasGeracao(teste3)

const escolhidos = teste3.map(item => item.filter(i => i.ultimaWaveAtingida === 11)).filter(item => item.length)[0].map(item => item.torresPosicionadas)[0]
const escolhidos1 = teste2.map(item => item.filter(i => i.ultimaWaveAtingida === 11)).filter(item => item.length)[0].map(item => item.torresPosicionadas)[0]
const escolhidos2 = teste1.map(item => item.filter(i => i.ultimaWaveAtingida === 11)).filter(item => item.length)[0].map(item => item.torresPosicionadas)[0]

console.log(escolhidos)
console.log(escolhidos1)
console.log(escolhidos2)

/*
console.log("Teste 1")
console.log("Média rodadas: ", mediaRodadasSuperadas1)
console.log("Rodadas: ", rodadasTeste1)

console.log("Teste 2")
console.log("Média rodadas: ", mediaRodadasSuperadas2)
console.log("Rodadas: ", rodadasTeste2)

console.log("Teste 3")
console.log("Média rodadas: ", mediaRodadasSuperadas3)
console.log("Rodadas: ", rodadasTeste3)
*/