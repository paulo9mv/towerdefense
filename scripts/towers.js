function createTower(x, y, template) {
    var t = new Tower(x, y);
    t.upgrade(template);
    t.onCreate();
    return t;
}


var tower = {};


tower.gun = {
    // Display
    color: [249, 191, 59],
    length: 0.65,
    radius: 0.9,
    secondary: [149, 165, 166],
    // Misc
    name: 'gun',
    title: 'Gun Tower',
    // Stats
    cooldownMax: 8,
    cooldownMin: 4,
    damageMin: 2,
    cost: 20,
    range: 3,
    // Upgrades

};

tower.laser = {
    // Display
    color: [25, 181, 254],
    length: 0.55,
    radius: 0.8,
    secondary: [149, 165, 166],
    width: 0.25,
    // Misc
    name: 'laser',
    title: 'Laser Tower',
    // Stats
    cooldownMax: 1,
    cost: 40,
    damageMax: 4,
    damageMin: 3,
    range: 2,
    type: 'energy',
    // Upgrades
};



tower.sniper = {
    // Display
    color: [207, 0, 15],
    follow: false,
    hasBase: false,
    radius: 0.9,
    weight: 3,
    // Misc
    name: 'sniper',
    sound: 'sniper',
    title: 'Sniper Tower',
    // Stats
    cooldownMax: 80,
    cooldownMin: 50,
    cost: 60,
    damageMax: 100,
    damageMin: 100,
    range: 9,
    // Methods
    drawBarrel: function() {
        stroke(0);
        fill(this.color);
        var height = this.radius * ts * sqrt(3) / 2;
        var back = -height / 3;
        var front = height * 2 / 3;
        var side = this.radius * ts / 2;
        triangle(back, -side, back, side, front, 0);
    },
    target(entities) {
        if (stopFiring) return;
        entities = this.visible(entities);
        if (entities.length === 0) return;
        var t = getTaunting(entities);
        if (t.length > 0) entities = t;
        var e = getStrongest(entities);
        if (typeof e === 'undefined') return;
        this.onAim(e);
    },
};