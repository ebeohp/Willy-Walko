import Phaser from 'phaser'

export default class Preloader extends Phaser.Scene
{
	constructor()
	{
		super('preloader')
	}

	preload()
    {   
        //Bitmap font
        this.load.bitmapFont("pixelFont", "font/whiteFont.png", "font/whiteFont.xml");

        //Loading bar
        var progressBar = this.add.graphics();
        var progressBox = this.add.graphics();
        progressBox.fillStyle(0xff0000, 0.8);
        progressBox.fillRect(45, 180, 320, 30);
        
        let percText = this.add.text(200, 195, "0%", {
            font: "15px",
        }).setOrigin(0.5);
        let loadingText = this.add.text(200, 50, "Loading...", {
            font: "15px",
        }).setOrigin(0.5);

        this.load.on("progress", function (perc) {
            percText.setText(perc * 100 + "%");
            loadingText.setText('Loading...');
            progressBar.clear();
            progressBar.fillStyle(0xffffff, 1);
            progressBar.fillRect(55, 185, 300 * perc, 20);

        });
        this.load.on("complete", function () {
            loadingText.destroy();
        });

        //Assets
        this.load.spritesheet('willy','sprites/willy.png',{
            frameHeight: 32,
            frameWidth: 32
        });
        
    }

    create()
    {
        //Animations
        this.anims.create({
            key: "willy_walk",
            frames: this.anims.generateFrameNames('willy', {start:1, end:2}),
            frameRate: 5,
            repeat: -1
        }); 
        this.anims.create({
            key: "willy_idle",
            frames: this.anims.generateFrameNames('willy', {start:0, end:0}),
            frameRate: 0,
            repeat: 0
        }); 

        //Start Title scene
        //this.scene.start("title");
        this.scene.start("trivia");
    }

    update(time: number, delta: number): void 
    {
        
    }
}
