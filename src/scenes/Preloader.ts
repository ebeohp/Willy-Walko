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


        //Music Assets
        this.load.audio("arcade_carnival", "music/arcade_carnival.mp3");
        this.load.audio("bounty_theme", "music/bounty_theme.ogg");
        this.load.audio("microship_theme", "music/microship_theme.ogg");
        this.load.audio("phil_theme", "music/phil_theme.mp3");
        this.load.audio("tent_theme", "music/tent_theme.mp3");
        this.load.audio("trivia1_theme", "music/trivia1_theme.mp3");
        this.load.audio("trivia2_theme", "music/trivia2_theme.ogg");
        this.load.audio("trivia3_theme", "music/trivia3_theme.ogg");

        this.load.audio("sfx_levelup", "music/sfx_levelup.wav");
        this.load.audio("sfx_pew", "music/sfx_pew.wav");
        this.load.audio("sfx_dedgerm", "music/sfx_dedgerm.wav");
        this.load.audio("sfx_hurt", "music/sfx_hurt.mp3");
        this.load.audio("sfx_click", "music/sfx_click.wav");
        this.load.audio("sfx_heal", "music/sfx_heal.wav");
        this.load.audio("sfx_shipdown", "music/sfx_shipdown.mp3");
        
        this.load.audio("sfx_aquap", "music/sfx_aquap.mp3");
        this.load.audio("sfx_chloro", "music/sfx_chloro.mp3");
        this.load.audio("sfx_starch", "music/sfx_starch.mp3");
        this.load.audio("sfx_sun", "music/sfx_sun.mp3");
        this.load.audio("sfx_drip", "music/sfx_drip.mp3");
        
        this.load.audio("sfx_dart", "music/sfx_dart.wav");
        this.load.audio("sfx_target", "music/sfx_target.wav");
        this.load.audio("sfx_bullseye", "music/sfx_bullseye.wav");

        
        this.load.audio("sfx_correct", "music/sfx_correct.wav");
        this.load.audio("sfx_incorrect", "music/sfx_incorrect.wav");
        
        this.load.audio("sfx_earnevos", "music/sfx_earnevos.mp3");




        //title assets
        this.load.spritesheet('title','sprites/title.png',{
            frameHeight: 96,
            frameWidth: 128
        });
        //Home Assets
        
        this.load.image('evoimg', 'images/evoimg.png');
        this.load.image('coinimg', 'images/coinimg.png');
        this.load.image('teslacoil', 'images/teslacoil.png');
        this.load.image('archi', 'images/archi.png');
        this.load.image('bohrstand', 'images/bohrstand.png');
        this.load.image('bouncywall', 'images/bouncywall.png');
        this.load.image('bouncyfloor', 'images/bouncyfloor.png');
        this.load.image('bouncywall2', 'images/bouncywall2.png');
        this.load.image('bouncyramp', 'images/bouncyramp.png');
        this.load.image('infoButton', 'images/infoButton.png');
        
        this.load.image('background', 'images/background.png');
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
        this.load.spritesheet('triviacarn', 'sprites/triviacarn.png', {
            frameWidth: 96,
            frameHeight: 128
        });
        this.load.spritesheet('electric', 'sprites/electric.png', {
            frameWidth: 32,
            frameHeight: 32
        });
        this.load.spritesheet('electric2', 'sprites/electric2.png', {
            frameWidth: 64,
            frameHeight: 128
        });
        this.load.spritesheet('bohrmodel','sprites/bohrmodel.png',{
            frameHeight: 96,
            frameWidth: 96
        });
        this.load.spritesheet('brainSize','sprites/brainSize.png',{
            frameHeight: 20,
            frameWidth: 20
        });
        this.load.spritesheet('levelBar','sprites/levelBar.png',{
            frameHeight: 18,
            frameWidth: 128
        });
        this.load.spritesheet('poof','sprites/poof.png',{
            frameHeight: 32,
            frameWidth: 32
        });

        //Phil Helios Assets
        this.load.image('cloud', 'images/cloud.png');
        this.load.spritesheet('phil', 'sprites/phil.png', {
            frameWidth: 32,
            frameHeight: 32
        });
        this.load.spritesheet('plantpowers', 'sprites/plantpowers.png', {
            frameWidth: 32,
            frameHeight: 32
        });
        this.load.spritesheet('sun', 'sprites/sun.png', {
            frameWidth: 32,
            frameHeight: 32
        });
        this.load.spritesheet('water', 'sprites/water.png', {
            frameWidth: 32,
            frameHeight: 32
        });
        this.load.spritesheet('waterbar', 'sprites/waterbar.png', {
            frameWidth: 32,
            frameHeight: 160
        });

        //Bohr's Bounty Assets
        this.load.image('dart', 'images/dart.png');
        this.load.image('trigger', 'images/trigger.png');
        this.load.image('atomicflaps', 'images/atomicflaps.png');
        this.load.spritesheet('bohrtargets', 'sprites/bohrtargets.png', {
            frameWidth: 32,
            frameHeight: 32
        });
        this.load.spritesheet('elements', 'sprites/elements.png', {
            frameWidth: 316,
            frameHeight: 316
        });

        //Microship assets
        this.load.image('ship', 'images/ship.png');
        this.load.image('hud', 'images/hud.png');
        this.load.image('redButton', 'images/redButton.png');
        this.load.image('enemy', 'images/enemy.png');
        this.load.image('bullet', 'images/bullet.png');
        this.load.image('redexitui', 'images/shipuiexit.png');
        this.load.spritesheet('lives', 'sprites/lives.png', {
            frameWidth: 32,
            frameHeight: 32
        });
        this.load.spritesheet('golgi', 'sprites/golgi.png', {
            frameWidth: 128,
            frameHeight: 96
        });
        this.load.spritesheet('er', 'sprites/er.png', {
            frameWidth: 160,
            frameHeight: 64
        });
        this.load.spritesheet('mito', 'sprites/mito.png', {
            frameWidth: 64,
            frameHeight: 64
        });
        this.load.spritesheet('vacuole', 'sprites/vacuole.png', {
            frameWidth: 64,
            frameHeight: 64
        });
        this.load.spritesheet('lyso', 'sprites/lyso.png', {
            frameWidth: 64,
            frameHeight: 64
        });
        this.load.spritesheet('ribo', 'sprites/ribo.png', {
            frameWidth: 32,
            frameHeight: 32
        });
        this.load.spritesheet('shipUI', 'sprites/shipUI.png', {
            frameWidth: 128,
            frameHeight: 96
        });

        //trivia assets
        this.load.image('easyLvl', 'images/easybutton.png');
        this.load.image('midLvl', 'images/midbutton.png');
        this.load.image('hardLvl', 'images/hardbutton.png');
        this.load.image('ball', 'images/ball.png');
        this.load.image('goggles', 'images/goggles.png');
        this.load.image('helpButton', 'images/helpButton.png');
        this.load.spritesheet('talkingMango', 'sprites/talkingmango.png', {
            frameWidth: 32,
            frameHeight: 32
        });
        this.load.spritesheet('answerButton', 'sprites/answerbutton.png', {
            frameWidth: 96,
            frameHeight: 32
        });
        this.load.spritesheet('bigBottle', 'sprites/bigbottles.png', {
            frameWidth: 96,
            frameHeight: 124
        });
        this.load.spritesheet('mangoEmote', 'sprites/mangoemotes.png', {
            frameWidth: 32,
            frameHeight: 32
        });
        this.load.spritesheet('dancingMango', 'sprites/dancingMango.png', {
            frameWidth: 32,
            frameHeight: 32
        });

        //transition scene assets
        
        this.load.image('playButton', 'images/playButton.png')
        
        this.load.image('checkButton', 'images/checkButton.png')
        this.load.image('xButton', 'images/xButton.png')
        this.load.spritesheet('uiButtons', 'sprites/uibuttons.png', {
            frameWidth: 32,
            frameHeight: 32
        });
        this.load.spritesheet('flaps', 'sprites/decoflaps.png', {
            frameWidth: 128,
            frameHeight: 32
        });
        
    }

    create()
    {
        //Home Anims
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
            key: "willy3_idle",
            frames: this.anims.generateFrameNames('willy', {start:15, end:15}),
            frameRate: 0,
            repeat: 0
        }); 
        this.anims.create({
            key: "willy3_walk",
            frames: this.anims.generateFrameNames('willy', {start:15, end:19}),
            frameRate: 10,
            repeat: -1
        }); 
        
        this.anims.create({
            key: "shipcarn_anim",
            frames: this.anims.generateFrameNames('shipcarn', {start:0, end:1}),
            frameRate: 5,
            repeat: -1
        }); 
        this.anims.create({
            key: "philcarn_anim",
            frames: this.anims.generateFrameNames('philcarn', {start:0, end:1}),
            frameRate: 8,
            repeat: -1
        }); 
        this.anims.create({
            key: "triviacarn_anim",
            frames: this.anims.generateFrameNames('triviacarn', {start:0, end:2}),
            frameRate: 8,
            repeat: -1
        }); 
        this.anims.create({
            key: "tesla_anim",
            frames: this.anims.generateFrameNames('electric', {start:0, end:6}),
            frameRate: 10,
            repeat: -1
        }); 
        this.anims.create({
            key: "tesla2_anim",
            frames: this.anims.generateFrameNames('electric2', {start:6, end:9}),
            frameRate: 8,
            repeat: -1
        }); 
        this.anims.create({
            key: "bohrmodel_anim",
            frames: this.anims.generateFrameNames('bohrmodel', {start:0, end:9}),
            frameRate: 7,
            repeat: -1
        }); 

        this.anims.create({
            key: "levelUp_anim",
            frames: this.anims.generateFrameNames('levelBar', {start:2, end:7}),
            frameRate: 8,
            repeat: 0
        }); 

        this.anims.create({
            key: "poof_anim",
            frames: this.anims.generateFrameNames('poof', {start:0, end:4}),
            frameRate: 5,
            repeat: 0
        }); 


        //Phil Helios Anims
        this.anims.create({
            key: "sun_anim",
            frames: this.anims.generateFrameNames('sun', {start:0, end:2}),
            frameRate: 8,
            repeat: -1
        }); 
        this.anims.create({
            key: "water_anim",
            frames: this.anims.generateFrameNames('water', {start:0, end:2}),
            frameRate: 12,
            repeat: 0
        }); 

        //trivia 
        this.anims.create({
            key: "talkingMango_anim",
            frames: this.anims.generateFrameNames('talkingMango', {start:0, end:5}),
            frameRate: 10,
            repeat: -1
        }); 
        this.anims.create({
            key: "dancingMango_anim",
            frames: this.anims.generateFrameNames('dancingMango', {start:0, end:7}),
            frameRate: 8,
            repeat: -1
        }); 

        //Start Title scene
        this.scene.start('home');
    }

    update(time: number, delta: number): void 
    {
        
    }
}
