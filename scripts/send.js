

 var lock = false;
 var debugao = true;
 var tempoA, tempoB;

function randomGun(){
    let gunsRandom = [];

    if(cash >= tower.gun.cost){
        gunsRandom.push('gun');
    }
    if(cash >= tower.slow.cost){
        gunsRandom.push('slow');
    }
    if(cash >= tower.sniper.cost){
        gunsRandom.push('sniper');
    }
    if(cash >= tower.laser.cost){
        gunsRandom.push('laser');
    }

    if(gunsRandom.length == 0){
        return -1;
    }
    
    let a = getRandomIntInclusive(0,gunsRandom.length);    
    return a == gunsRandom.length ? -1 : gunsRandom[a];
  
}

var novosIndividuos = [];
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
function salvarDados(){
    console.log("Salvando dados...");
    let intervalo;

    
    tempoB = performance.now();

    intervalo = (tempoB - tempoA)/1000;

    tempoA = performance.now();

    var packet = {
        individuo,
        geracao,
        torresPosicionadas: adicionadas,
        ultimaWaveAtingida: wave,
        tempoSegundos: intervalo
    }
    individuo++;
    novosIndividuos.push(packet);    

    if(individuo == individuosPorGeracao){
        individuo = 0;
        geracao++;

        geraNovaGeracao();
        
    }

    console.log("Individuo", individuo,"/",individuosPorGeracao,". Geração", geracao);
    adicionadas = [];
}

var todosIndividuosDeTodasGeracoes = [];

function geraNovaGeracao(){
    let melhoresIndividuos = sortObj(novosIndividuos, 'ultimaWaveAtingida').slice(0, quantidadeMelhoresIndivuduos);
    todosIndividuosDeTodasGeracoes.push(novosIndividuos);
    novosIndividuos = [];


        for (let i = 0; i < melhoresIndividuos.length; i++)
        for (let j = 0; j < melhoresIndividuos.length; j++) {
            if (i != j) {
                
                //Necessário para manter o array inalterado
                json1 = JSON.stringify(melhoresIndividuos[i]);
                json2 = JSON.stringify(melhoresIndividuos[j]);

                filho = mutateInto(melhoresIndividuos[i].torresPosicionadas, melhoresIndividuos[j].torresPosicionadas, 0.15);	
                novosIndividuos.push(filho);				            
                
                melhoresIndividuos[i] = JSON.parse(json1);
                melhoresIndividuos[j] = JSON.parse(json2);
            }
        }
        
}
function randomIntFromInterval(min, max) { // min and max included 
	return Math.floor(Math.random() * (max - min + 1) + min);
}
/**
 * Função que pega cromossomos do A e coloca em B
 */
function mutateInto(a, b, fator, fatorMutacao = 0.1) {
	
	const bias = Math.floor(b.length * fator);
	const inicio = Math.floor(Math.random() * (a.length - bias - 1));

	const cromossomos = a.slice(inicio, inicio + bias);	
	cromossomos.forEach(function (element) {		
		element.mutacao = Math.random() < fatorMutacao;
	});

	const inicio2 = randomIntFromInterval(0, b.length - bias);	
	b.splice(inicio2, bias);	
	return sortObj(b.concat(cromossomos), 'wave', true);
}

var adicionadas = [];
var pararDeComprar = false;

var individuo = 0;
var geracao = 0;
const individuosPorGeracao = 6;
const quantidadeMelhoresIndivuduos = 3;

var firstExecution = true;

if(debugao){

if(firstExecution){
    firstExecution = false;
    tempoA = performance.now();
}

 setInterval(function(){
     //Se não estiver pausado vamos executar
    if((paused || toWait) && !pararDeComprar){

        //Garante que só um pegue a trava/lock
        if(!lock){
            
            lock = true;
            
            let x, y;
            let podePosicionar = false;

            //Seleciona a arma a ser posicionada, se for -1 não vai comprar.
            let gun = randomGun();
            
            while(gun != -1){

                //Seleciona a arma
                setPlace(gun);             
               
                x = getRandomIntInclusive(0,24);
                y = getRandomIntInclusive(0,23);
                
                do{

                    //Sorteia um local para posicionar
                    podePosicionar = canPlace(x,y);
                    if(podePosicionar){
                        buy(createTower(x, y, tower[towerType]));
                        let nome = tower[towerType].name;
                        adicionadas.push({
                                wave,
                                "torre": tower[towerType].name,
                                x,
                                y,
                        
                        });
                        console.log("Posicionando", nome,"em", x,y);
                        print(adicionadas);
                    }
                    else{
                        x = getRandomIntInclusive(0,24);
                        y = getRandomIntInclusive(0,23);
                    }                    
                }while(!podePosicionar)

           
                gun = randomGun();
            }

            if(paused){
                pause();
            }  

            lock = false;
        }
    }
 }, 1000);

}

 function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

