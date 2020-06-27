

 var lock = false;

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

    console.log('Escolhendo entre', (gunsRandom.length + 1))
    let a = getRandomIntInclusive(0,gunsRandom.length);    
    return a == gunsRandom.length ? -1 : gunsRandom[a];
  
}

var pararDeComprar = false;

 setInterval(function(){
     //Se não estiver pausado vamos executar
     console.log(paused, toWait, pararDeComprar);
    if((paused || toWait) && !pararDeComprar){
        console.log(paused, toWait, pararDeComprar, lock);

        //Garante que só um pegue a trava/lock
        if(!lock){
            
            lock = true;

            let x, y;
            let podePosicionar = false;
            let gun = randomGun();
            console.log('Vai comprar ', gun);
            
            while(gun != -1){
                setPlace(gun);


                if(cash < tower.gun.cost){
                    console.log('Sem condiçoes de compra alguma');
                    pararDeComprar = true;
                    break;
                }
               
                x = getRandomIntInclusive(0,24);
                y = getRandomIntInclusive(0,23);
                
                do{
                    podePosicionar = canPlace(x,y);
                    if(podePosicionar){
                        buy(createTower(x, y, tower[towerType]))
                    }
                    else{
                        x = getRandomIntInclusive(0,24);
                        y = getRandomIntInclusive(0,23);
                    }                    
                }while(!podePosicionar)

           
                gun = randomGun();
                console.log('Vai comprar ', gun);
            }

            if(paused){
                pause();
            }  

            lock = false;
        }
    }
 }, 1000);


 function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

