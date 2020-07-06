

var lock = false;
var debugao = true;
var tempoA, tempoB;
var adicionadas = [];
var pararDeComprar = false;

var individuo = 0;
var geracao = 0;
const individuosPorGeracao = 6;
const quantidadeMelhoresIndivuduos = 3;

var firstExecution = true;
var posterior = [];
var waveAnterior = -1;
let executando = false;
var todosIndividuosDeTodasGeracoes = [];
var genesCriados = [];

var novosIndividuos = [];
function randomGun() {
    let gunsRandom = [];

    if (cash >= tower.gun.cost) {
        gunsRandom.push('gun');
    }
    if (cash >= tower.slow.cost) {
        gunsRandom.push('slow');
    }
    if (cash >= tower.sniper.cost) {
        gunsRandom.push('sniper');
    }
    if (cash >= tower.laser.cost) {
        gunsRandom.push('laser');
    }

    if (gunsRandom.length == 0) {
        return -1;
    }

    let a = getRandomIntInclusive(0, gunsRandom.length);
    return a == gunsRandom.length ? -1 : gunsRandom[a];

}

function sortObj(list, key, dec = false) {
    function compare(b, a) {
        a = a[key];
        b = b[key];
        var type = (typeof (a) === 'string' ||
            typeof (b) === 'string') ? 'string' : 'number';
        var result;
        if (type === 'string') result = a.localeCompare(b);
        else result = dec ? b - a : a - b;
        return result;
    }
    return list.sort(compare);
}
function salvarDados() {
    let intervalo;


    tempoB = performance.now();

    intervalo = (tempoB - tempoA) / 1000;

    tempoA = performance.now();

    var packet = {
        individuo,
        geracao,
        torresPosicionadas: adicionadas,
        ultimaWaveAtingida: wave,
        tempoSegundos: intervalo
    }

    console.log("Indivíduo", individuo, "finalizado. Seus dados são:");
    console.log(packet);

    individuo++;
    novosIndividuos.push(packet);

    if (individuo == individuosPorGeracao) {
        individuo = 0;
        geracao++;

        console.log("Geração", geracao, "finalizada. Os indivíduos são");
        console.log(novosIndividuos);
        geraNovaGeracao();

    }

    console.log("Individuo", individuo, "/", individuosPorGeracao, ". Geração", geracao);
    adicionadas = [];
}



function geraNovaGeracao() {
    console.log('Selecionando os melhores');
    let melhoresIndividuos = sortObj(novosIndividuos, 'ultimaWaveAtingida').slice(0, quantidadeMelhoresIndivuduos);

    console.log("A quantidade de indíviduos deve ser 6 == ", novosIndividuos.length);
    todosIndividuosDeTodasGeracoes.push(novosIndividuos);

    console.log('todosIndividuosDeTodasGeracoes');
    console.log(todosIndividuosDeTodasGeracoes);

    novosIndividuos = [];
    genesCriados = [];
    let filho;
    let json1, json2;


    for (let i = 0; i < melhoresIndividuos.length; i++) {
        for (let j = 0; j < melhoresIndividuos.length; j++) {
            if (i != j) {

                //Necessário para manter o array inalterado
                json1 = JSON.stringify(melhoresIndividuos[i]);
                json2 = JSON.stringify(melhoresIndividuos[j]);

                filho = mutateInto(melhoresIndividuos[i].torresPosicionadas, melhoresIndividuos[j].torresPosicionadas, 0.1);
                genesCriados.push(filho);

                melhoresIndividuos[i] = JSON.parse(json1);
                melhoresIndividuos[j] = JSON.parse(json2);
            }
        }
    }

    console.log(genesCriados);

}
function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
}
/**
 * Função que pega cromossomos do A e coloca em B
 */
function mutateInto(a, b, fator, fatorMutacao = 0.1) {

    let bias = Math.floor(b.length * fator);

    if (bias < 1) bias = 1;

    const inicio = Math.floor(Math.random() * (a.length - bias - 1));

    const cromossomos = a.slice(inicio, inicio + bias);
    cromossomos.forEach(function (element) {
        element.mutacao = Math.random() < fatorMutacao;
    });

    const inicio2 = randomIntFromInterval(0, b.length - bias);
    b.splice(inicio2, bias);
    return sortObj(b.concat(cromossomos), 'wave', true);
}

if (debugao) {

    if (firstExecution) {
        firstExecution = false;
        tempoA = performance.now();
        console.log("Primeira execuçao", wave);
    }

    setInterval(function () {

        if(paused){
            pause();
        }

        if(!lock){
            lock = true;

            if(wave != waveAnterior){
                waveAnterior = wave;
    
                let x, y;
                let podePosicionar = false;
                console.log("Fazendo operações.");
                if(geracao == 0){
                    
                    

                    //Seleciona a arma a ser posicionada, se for -1 não vai comprar.
                    let gun = randomGun();

                    while (gun != -1) {

                        //Seleciona a arma
                        setPlace(gun);

                        x = getRandomIntInclusive(0, 24);
                        y = getRandomIntInclusive(0, 23);

                        do {

                            //Sorteia um local para posicionar
                            podePosicionar = canPlace(x, y);
                            if (podePosicionar) {
                                buy(createTower(x, y, tower[towerType]));
                                let nome = tower[towerType].name;
                                adicionadas.push({
                                    wave,
                                    "torre": tower[towerType].name,
                                    x,
                                    y,

                                });
                                console.log("Posicionando", nome, "em", x, y);
                            }
                            else {
                                x = getRandomIntInclusive(0, 24);
                                y = getRandomIntInclusive(0, 23);
                            }
                        } while (!podePosicionar)

                        gun = randomGun();
                    }
                }
                else{

                    let genotipoDaRodada = genesCriados[individuo];
                    let gunsDaRodada = genotipoDaRodada.filter(item => item.wave == wave);
                    gunsDaRodada = gunsDaRodada.concat(posterior);
                    posterior = [];
                    let waveMaximaAtingida = Math.max.apply(null, genotipoDaRodada.map(item => item.wave));

                    if (wave <= waveMaximaAtingida) {

                        console.log("Nessa rodada tentaremos posicionar", gunsDaRodada.length, "torres.");

                        gunsDaRodada.forEach(
                            item => {
                                let gun = item.torre;
                                setPlace(gun);

                                let x = item.x;
                                let y = item.y;
                                let podePosicionar = false;

                                if (item.mutacao) {
                                    console.log("Realizando uma mutação.");
                                    x = getRandomIntInclusive(0, 24);
                                    y = getRandomIntInclusive(0, 23);
                                }

                                do {

                                    //Sorteia um local para posicionar
                                    podePosicionar = canPlace(x, y);
                                    if (podePosicionar) {

                                        let compra = buy(createTower(x, y, tower[towerType]));

                                        if (compra) {
                                            let nome = tower[towerType].name;
                                            adicionadas.push({
                                                wave,
                                                "torre": tower[towerType].name,
                                                x,
                                                y,
                                            });
                                            console.log("Posicionando", nome, "em", x, y);
                                        } else {
                                            posterior.push(item);
                                            console.log("Não foi possível comprar a torre");
                                            console.log(item);
                                        }
                                    }
                                    else {
                                        x = getRandomIntInclusive(0, 24);
                                        y = getRandomIntInclusive(0, 23);
                                    }
                                } while (!podePosicionar);

                            }
                        )
                    }

                    else {
                        console.log("Estamos evoluindo. Wave atual:", wave, "Wave máxima:", waveMaximaAtingida);
                        let x, y;
                        let podePosicionar = false;

                        //Seleciona a arma a ser posicionada, se for -1 não vai comprar.
                        let gun = randomGun();

                        while (gun != -1) {

                            //Seleciona a arma
                            setPlace(gun);

                            x = getRandomIntInclusive(0, 24);
                            y = getRandomIntInclusive(0, 23);

                            do {

                                //Sorteia um local para posicionar
                                podePosicionar = canPlace(x, y);
                                if (podePosicionar) {
                                    buy(createTower(x, y, tower[towerType]));
                                    let nome = tower[towerType].name;
                                    adicionadas.push({
                                        wave,
                                        "torre": tower[towerType].name,
                                        x,
                                        y,

                                    });
                                    console.log("Posicionando", nome, "em", x, y);
                                }
                                else {
                                    x = getRandomIntInclusive(0, 24);
                                    y = getRandomIntInclusive(0, 23);
                                }
                            } while (!podePosicionar)

                            gun = randomGun();
                        }
                    }
                    executando = true;
                }
            }

            lock = false;
        }
        

    }
        , 2000);

}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

