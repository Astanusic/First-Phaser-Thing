const zombieTemplate = {
  createZombie: function (posX, posY, range) {
    var zombie = {
      aZombie: null,

      initZombie: function () {
        this.aZombie = stage.scene.physics.add.sprite(
          posX,
          posY,
          "zombie",
          "character_zombie_hold"
        );
        this.aZombie.setOrigin(0.5, 1);
        this.aZombie.setScale(0.8);
        this.aZombie.setFlip(false, false);
        this.handleZombieMovement();
        this.handleCollide();
      },

      handleZombieMovement: function () {
        this.aZombie.play("zombieWalk");

        let tween = stage.scene.tweens.add({
          targets: this.aZombie,
          x: posX + range,
          ease: "Linear",
          duration: (1000 * range) / 100,
          yoyo: true,
          repeat: -1,
          onStart: function () {},
          onComplete: function () {},
          onYoyo: function (tween) {
            tween.targets[0].flipX = !tween.targets[0].flipX;
          },
          onRepeat: function () {
            tween.targets[0].flipX = !tween.targets[0].flipX;
          },
        });
      },
      handleCollide: function () {
        stage.scene.physics.add.collider(this.aZombie, stage.world.worldLayer);

        stage.scene.physics.add.overlap(
          stage.player.aPlayer,
          this.aZombie,
          this.attackZombie
        );
      },
      attackZombie: function (player, zombie) {
        if (stage.player.isJumping) {
          stage.world.score += 20;
          stage.world.scoreText.setText("Score : " + stage.world.score);
          zombie.destroy();
        } else {
          stage.world.killPlayer();
        }
      },
    };
    return zombie;
  },
  generateZombieAnimations: function () {
    stage.scene.anims.create({
      key: "zombieWalk",
      frames: game.anims.generateFrameNames("zombie", {
        prefix: "character_zombie_walk",
        start: 0,
        end: 7,
      }),
      frameRate: 5,
      repeat: -1,
    });
  },
};
