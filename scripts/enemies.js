function createEnemy(x, y, template) {
    var e = new Enemy(x, y);
    // Fill in all keys
    template = typeof template === 'undefined' ? {} : template;
    var keys = Object.keys(template);
    for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        e[key] = template[key];
    }
    e.onCreate();
    return e;
}

var enemy = {};

enemy.fraco = {
    color : [255,0,0],
    name : 'fraco',
    cash : 1,
    health: 80,
    speed: 2,
}

enemy.normal = {
    color : [0,255,0],
    name : 'normal',
    cash : 1,
    health: 170,
    speed: 2,
}

enemy.forte = {
    color : [0,0,255],
    name : 'forte',
    cash : 2,
    health: 240,
    speed: 2,
}