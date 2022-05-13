import Phaser from 'phaser'

export default class Title extends Phaser.Scene
{
    willy!: Phaser.GameObjects.Sprite;
    spacebar!: Phaser.Input.Keyboard.Key;
    background: Phaser.GameObjects.TileSprite;
	constructor()
	{
		super('title')
	}

	preload()
    {
        this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    create()
    {
        this.music = this.sound.add("arcade_carnival_sr");  
        var musicConfig = 
        { //optional
            mute: false,
            volume: 0.3,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: true,
            delay: 0
        }
        this.music.play(musicConfig); 

        this.background=this.add.tileSprite(0,0,800, 400, "background"); //TileSprite is different from images!
        this.background.setOrigin(0,0); //So its easier to move the background relating to it's top left corner.

        var title = this.add.sprite(220,110,'title',0);
        title.setScale(0.5);
        this.tweens.add({
            targets: title,
            scale: 3,
            ease: 'Elastic',
            duration: 3000
          });
        
         
        var text = this.add.bitmapText(180,170, "pixelFont", "v2.0.0 PRESS [SPACE] TO PLAY", 20);
        text.alpha = 0.5;
          var tween = this.tweens.add({
              targets: text,
              y: 150,
              ease: "Power1",
              duration: 200,
              repeat: 0,
              onComplete: function(){
                  text.alpha = 1;
              },
              callbackScope: this
          });
        var floor = this.add.sprite(200,175,'title',1);
        floor.setScale(3.2);

        
        this.willy = this.add.sprite(100,210,'willy',0);
        this.willy.setScale(3).flipX=true;
        this.cameras.main.setZoom(1);
    }

    update(time: number, delta: number): void 
    {
        this.background.tilePositionX-= 0.25;
        if(Phaser.Input.Keyboard.JustDown(this.spacebar)){
            var cam = this.cameras.main;
            
            cam.fadeOut(3000);
            this.tweens.add({
                targets:  this.music,
                volume:   0,
                duration: 8000,
                onComplete: () => 
                {
                    this.music.stop();
                    this.startGame();
                }
            });
        }
    }
    startGame()
    {
        this.scene.stop();
        this.scene.start('home');
    }
}
