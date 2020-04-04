let world = {
  tilemap: null,
  tileset: null,
  downLayer: null,
  worldLayer: null,
  topLayer: null,
  overlapLayer: null,
  startPosition: null,
  score: 0,
  scoreText: null,
  gameOver: false,
  zombieStart1: null,
  zombieStart2: null,
  zombieStart3: null,

  initializeWorld: function () {
    this.score = 0;
    this.tilemap = stage.scene.make.tilemap({ key: "map" });
    this.tileset = this.tilemap.addTilesetImage("tilesheet", "tiles");
    this.downLayer = this.tilemap.createStaticLayer("bot", this.tileset, 0, 0);
    this.worldLayer = this.tilemap.createStaticLayer(
      "world",
      this.tileset,
      0,
      0
    );
    this.topLayer = this.tilemap.createStaticLayer("top", this.tileset, 0, 0);
    this.overlapLayer = this.tilemap.createDynamicLayer(
      "overlap",
      this.tileset,
      0,
      0
    );

    this.startPosition = this.tilemap.findObject(
      "Objects",
      (obj) => obj.name === "start"
    );
    this.zombieStart1 = this.tilemap.findObject(
      "Objects",
      (obj) => obj.name === "zombieStart1"
    );
    this.zombieStart2 = this.tilemap.findObject(
      "Objects",
      (obj) => obj.name === "zombieStart2"
    );
    this.zombieStart3 = this.tilemap.findObject(
      "Objects",
      (obj) => obj.name === "zombieStart3"
    );
    this.worldLayer.setCollisionByProperty({ Colides: true });

    stage.scene.physics.world.setBounds(
      0,
      0,
      this.tilemap.widthInPixels,
      this.tilemap.heightInPixels
    );

    let titleFont = {
      fontSize: "32px",
      color: "#FF0000",
      fontFamily: "Spicy Rice",
    };
    this.scoreText = stage.scene.add.text(16, 16, "Score : 0", titleFont);
    this.scoreText.setScrollFactor(0);
  },
  handleCollider: function () {
    this.overlapLayer.setTileIndexCallback(50, this.collectGems, this);
    this.overlapLayer.setTileIndexCallback(53, this.collectGems, this);
    this.overlapLayer.setTileIndexCallback(71, this.killPlayer, this);
    this.overlapLayer.setTileIndexCallback(76, this.endLevel, this);
    this.overlapLayer.setTileIndexCallback(90, this.endLevel, this);
    stage.scene.physics.add.collider(stage.player.aPlayer, this.worldLayer);
    stage.scene.physics.add.overlap(stage.player.aPlayer, this.overlapLayer);
  },
  endLevel: function () {
    if (!this.gameOver) {
      this.gameOver = true;
      stage.player.killPlayer();
      stage.scene.add
        .sprite(
          stage.scene.cameras.main.midPoint.x,
          stage.scene.cameras.main.midPoint.y,
          "panel"
        )
        .setScale(5, 3);
      let restartButton = stage.scene.add
        .sprite(
          stage.scene.cameras.main.midPoint.x,
          stage.scene.cameras.main.midPoint.y + 100,
          "validation"
        )
        .setInteractive();
      restartButton.on("pointerup", function () {
        stage.scene.scene.restart();
      });
    }

    let titleFont = {
      fontSize: "42px",
      color: "#FFFFFF",
      fontFamily: "Spicy Rice",
    };
    stage.scene.add.text(
      stage.scene.cameras.main.midPoint.x - 200,
      stage.scene.cameras.main.midPoint.y - 100,
      "Tu as gagné \n Recommencer ?",
      titleFont
    );
  },
  handleCamera: function () {
    stage.scene.cameras.main.startFollow(stage.player.aPlayer);
    stage.scene.cameras.main.setBounds(
      0,
      0,
      this.tilemap.widthInPixels,
      this.tilemap.heightInPixels
    );
  },
  collectGems: function (player, tile) {
    stage.scene.sound.play("gemSound");
    this.generateParticles(tile.getCenterX(), tile.getCenterY());
    this.addScoreGems(tile.properties.item);
    this.scoreText.setText("Score : " + this.score);
    this.overlapLayer.removeTileAt(tile.x, tile.y).destroy();
  },
  addScoreGems: function (item) {
    if (item === "redGem") {
      this.score += 10;
    } else if (item === "blueGem") {
      this.score += 5;
    }
  },
  generateParticles: function (posX, posY) {
    let particles = stage.scene.add.particles("spark");

    let configParticles = {
      x: posX,
      y: posY,
      speed: 500,
      angle: { min: 180, max: 360 },
      lifeSpan: { min: 300, max: 400 },
      scale: { start: 0.1, end: 0.08 },
      blendMode: "ADD",
    };

    const emitter = particles.createEmitter(configParticles);

    //     const emitter = particles.createEmitter();
    //     emitter.setPosition(posX, posY);
    //     emitter.setScale(0.06);
    //     emitter.setSpeed(1300);
    //     emitter.setBlendMode(Phaser.BlendModes.ADD);

    stage.scene.time.delayedCall(100, function () {
      particles.destroy();
    });
  },
  killPlayer: function () {
    if (!this.gameOver) {
      gameOver = true;
      stage.player.killPlayer();
      stage.scene.add
        .sprite(
          stage.scene.cameras.main.midPoint.x,
          stage.scene.cameras.main.midPoint.y,
          "panel"
        )
        .setScale(5, 3);
      let restartButton = stage.scene.add
        .sprite(
          stage.scene.cameras.main.midPoint.x,
          stage.scene.cameras.main.midPoint.y + 100,
          "validation"
        )
        .setInteractive();

      restartButton.on("pointerup", function () {
        stage.scene.scene.restart();
      });

      let titleFont = {
        fontSize: "32px",
        color: "#FFFFFF",
        fontFamily: "Spicy Rice",
      };
      stage.scene.add.text(
        stage.scene.cameras.main.midPoint.x - 200,
        stage.scene.cameras.main.midPoint.y - 100,
        "Tu es mort \n Recommencer ?\n Score : " + stage.world.score,
        titleFont
      );
    }
  },
};
