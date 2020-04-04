var stage = {
  scene: null,
  world: world,
  player: player,
  cursor: null,
  zombieTemplate: zombieTemplate,
};

function preload() {
  stage.scene = this;
  stage.scene.load.image("tiles", "tilesheet.png");
  stage.scene.load.tilemapTiledJSON("map", "platformFirstGame.json");
  stage.scene.load.atlas("player", "player.png", "playerAtlas.json");
  stage.scene.load.atlas("zombie", "zombie.png", "zombieAtlas.json");
  stage.scene.load.image("spark", "particles.png");
  stage.scene.load.audio("gemSound", "gemSound.ogg");
  stage.scene.load.image("validation", "yellow_boxCheckmark.png");
  stage.scene.load.image("panel", "yellow_panel.png");

  stage.world.gameOver = false;
  stage.player.isAlive = true;
}

function create() {
  stage.world.initializeWorld();
  stage.player.initializePlayer();
  stage.zombieTemplate.generateZombieAnimations();
  stage.zombieTemplate
    .createZombie(stage.world.zombieStart1.x, stage.world.zombieStart1.y, 100)
    .initZombie();
  stage.zombieTemplate
    .createZombie(stage.world.zombieStart2.x, stage.world.zombieStart2.y, 300)
    .initZombie();
  stage.zombieTemplate
    .createZombie(stage.world.zombieStart3.x, stage.world.zombieStart3.y, 200)
    .initZombie();
  stage.player.generatePlayerAnimations();
  stage.world.handleCollider();
  stage.cursor = stage.scene.input.keyboard.createCursorKeys();

  stage.world.handleCamera();
}

function update(time, delta) {
  stage.player.handlePlayerMovement();
  adjustScreenSize();
}

function adjustScreenSize() {
  let canvas = document.querySelector("canvas");

  let windowInnerWidth = window.innerWidth;
  let windowInnerHeight = window.innerHeight;
  let windowRatio = windowInnerWidth / windowInnerHeight;

  let stageRatio = config.width / config.height;

  if (windowRatio < stageRatio) {
    canvas.style.width = windowInnerWidth + "px";
    canvas.style.height = windowInnerWidth / stageRatio + "px";
  } else {
    canvas.style.width = windowInnerHeight * stageRatio + "px";
    canvas.style.height = windowInnerHeight + "px";
  }
}
