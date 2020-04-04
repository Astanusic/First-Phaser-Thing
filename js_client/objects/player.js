let player = {
  aPlayer: null,
  isJumping: false,
  isAlive: true,

  initializePlayer: function () {
    this.aPlayer = stage.scene.physics.add.sprite(
      stage.world.startPosition.x,
      stage.world.startPosition.y,
      "player",
      "character_malePerson_hold"
    );
    this.aPlayer.setScale(0.6, 0.6);
    this.aPlayer.setCollideWorldBounds(true);
    this.aPlayer.setOrigin(0.5, 1);
  },
  generatePlayerAnimations: function () {
    stage.scene.anims.create({
      key: "playerWalk",
      frames: game.anims.generateFrameNames("player", {
        prefix: "character_malePerson_walk",
        start: 0,
        end: 7,
      }),
      frameRate: 5,
      repeat: -1,
    });
    stage.scene.anims.create({
      key: "playerIdle",
      frames: [
        { key: "player", frame: "character_malePerson_hold" },
        { key: "player", frame: "character_malePerson_idle" },
      ],
      frameRate: 0.7,
      repeat: -1,
    });
  },

  handlePlayerMovement: function () {
    if (this.isAlive) {
      if (stage.cursor.left.isDown) {
        this.aPlayer.setVelocityX(-200);
        this.aPlayer.setFlip(true, false);
      } else if (stage.cursor.right.isDown) {
        this.aPlayer.setVelocityX(200);
        this.aPlayer.setFlip(false, false);
      } else {
        this.aPlayer.setVelocityX(0);
      }

      if (stage.cursor.up.isDown && this.aPlayer.body.onFloor()) {
        this.aPlayer.setVelocityY(-480);
      }

      if (this.aPlayer.body.onFloor()) {
        this.isJumping = false;
      } else {
        this.isJumping = true;
      }

      if (this.isJumping) {
        this.aPlayer.setTexture("player", "character_malePerson_jump");
      } else {
        if (stage.cursor.left.isDown) {
          this.aPlayer.anims.play("playerWalk", true);
        } else if (stage.cursor.right.isDown) {
          this.aPlayer.anims.play("playerWalk", true);
        } else {
          this.aPlayer.setVelocityX(0);
          this.aPlayer.anims.play("playerIdle", true);
        }
      }
    } else {
      this.aPlayer.setVelocityX(0);
    }
  },

  killPlayer: function () {
    this.aPlayer.setTexture("player", "character_malePerson_hurt");
    this.isAlive = false;
  },
};
