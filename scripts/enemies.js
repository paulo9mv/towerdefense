function createEnemy(x, y, template) {
  var e = new Enemy(x, y);
  // Fill in all keys
  template = typeof template === "undefined" ? {} : template;
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
  color: [255, 0, 0],
  name: "fraco",
  cash: 1,
  health: 50,
  speed: 2,
};

enemy.normal = {
  color: [0, 255, 0],
  name: "normal",
  cash: 1,
  health: 100,
  speed: 2,
};

enemy.forte = {
  color: [0, 0, 255],
  name: "forte",
  cash: 2,
  health: 150,
  speed: 2,
};

enemy.fracoM = {
  color: [255, 0, 0],
  name: "fraco",
  cash: 1,
  health: 80,
  speed: 2,
};

enemy.normalM = {
  color: [0, 255, 0],
  name: "normal",
  cash: 1,
  health: 170,
  speed: 2,
};

enemy.forteM = {
  color: [0, 0, 255],
  name: "forte",
  cash: 2,
  health: 250,
  speed: 2,
};

enemy.fracoH = {
  color: [255, 0, 0],
  name: "fraco",
  cash: 1,
  health: 120,
  speed: 2,
};

enemy.normalH = {
  color: [0, 255, 0],
  name: "normal",
  cash: 1,
  health: 230,
  speed: 2,
};

enemy.forteH = {
  color: [0, 0, 255],
  name: "forte",
  cash: 2,
  health: 360,
  speed: 2,
};

enemy.fracoE = {
  color: [255, 0, 0],
  name: "fraco",
  cash: 1,
  health: 110,
  speed: 2,
};

enemy.normalE = {
  color: [0, 255, 0],
  name: "normal",
  cash: 1,
  health: 220,
  speed: 2,
};

enemy.forteE = {
  color: [0, 0, 255],
  name: "forte",
  cash: 2,
  health: 350,
  speed: 2,
};
