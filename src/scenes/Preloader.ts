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
        this.load.spritesheet('shipcarn', 'sprites/shipcarn.png', {
            frameWidth: 96,
            frameHeight: 64
        });
        this.load.spritesheet('bountycarn', 'sprites/bountycarn.png', {
            frameWidth: 96,
            frameHeight: 96
        });
        this.load.spritesheet('philcarn', 'sprites/philcarn.png', {
            frameWidth: 160,
            frameHeight: 96
        });
        this.load.image('evoimg', 'images/evoimg.png');
        this.load.image('coinimg', 'images/coinimg.png');
        
    }

    create()
    {
        //Animations
        this.anims.create({
            key: "willy_idle",
            frames: this.anims.generateFrameNames('willy', {start:0, end:0}),
            frameRate: 0,
            repeat: 0
        }); 
        this.anims.create({
            key: "willy_walk",
            frames: this.anims.generateFrameNames('willy', {start:1, end:4}),
            frameRate: 10,
            repeat: -1
        }); 
        this.anims.create({
            key: "willy1_idle",
            frames: this.anims.generateFrameNames('willy', {start:5, end:5}),
            frameRate: 0,
            repeat: 0
        }); 
        this.anims.create({
            key: "willy1_walk",
            frames: this.anims.generateFrameNames('willy', {start:6, end:9}),
            frameRate: 10,
            repeat: -1
        }); 
        this.anims.create({
            key: "willy2_idle",
            frames: this.anims.generateFrameNames('willy', {start:10, end:10}),
            frameRate: 0,
            repeat: 0
        }); 
        this.anims.create({
            key: "willy2_walk",
            frames: this.anims.generateFrameNames('willy', {start:11, end:14}),
            frameRate: 10,
            repeat: -1
        }); 
        
        this.anims.create({
            key: "shipcarn_anim",
            frames: this.anims.generateFrameNames('shipcarn', {start:0, end:1}),
            frameRate: 8,
            repeat: -1
        }); 
        this.anims.create({
            key: "philcarn_anim",
            frames: this.anims.generateFrameNames('philcarn', {start:0, end:1}),
            frameRate: 8,
            repeat: -1
        }); 
        

        //Start Title scene
        //this.scene.start("title");
        this.scene.start('home');
    }

    update(time: number, delta: number): void 
    {
        
    }
}
