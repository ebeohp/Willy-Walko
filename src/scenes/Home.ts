import Phaser from 'phaser'

export default class Home extends Phaser.Scene 
//Carnival map. Player can walk around and select games to play. If coming from title screen, give welcome back and spawn at entrance, if from any other scene, fade back in front of og place. 
{
    
    private buttons?: Phaser.Physics.Arcade.Group;
    private goAtomic?: any;
    private goClaw?: any;
    private goMicro?: any;
    private goParkour?: any;
    private goPhil?: any;
    private goTrivia?: any;

    numEvos!: number;
  
    
    private cursors!: Phaser.Types.Input.Keyboard.CursorKeys
    private willy!: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
    private myCam!: Phaser.Cameras.Scene2D.Camera;
    //Scale of all images
    private s = 1;
    private shipcarn?: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
    private philcarn?: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
    private bountycarn?: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
    private triviacarn?: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
    private electric!: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
    private teslacoil!: Phaser.GameObjects.Image;
    private electric2!: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
    private archi!: Phaser.GameObjects.Image;
    private background!: Phaser.GameObjects.TileSprite;

    private isBouncing = false;
    bohrmodel!: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
    bouncywall1!: Phaser.Types.Physics.Arcade.ImageWithDynamicBody;
    bouncywall2!: Phaser.Types.Physics.Arcade.ImageWithDynamicBody;
    bouncywall3!: Phaser.Types.Physics.Arcade.ImageWithDynamicBody;
    bouncyramp!: any;
    jumpTween!: Phaser.Tweens.Tween;
    inviswall!: Phaser.Types.Physics.Arcade.ImageWithDynamicBody;
    reachedNewLevel!: number;
    brainLabel!: Phaser.GameObjects.BitmapText;
    levelBar!: Phaser.GameObjects.Sprite;
    brainSize!: Phaser.GameObjects.Sprite;
    music!: Phaser.Sound.BaseSound;
    brainFrame!: number;
    sfxlevelup!: Phaser.Sound.BaseSound;
    taddycar!: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
    froggycar!: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
    bouncyfloor!: Phaser.GameObjects.Image;


	constructor()
	{
		super('home')
	}

	preload()
    {
        this.cursors = this.input.keyboard.createCursorKeys();
    }

    create()
    {   
        this.music = this.sound.add("arcade_carnival");  
        var musicConfig = 
        { //optional
            mute: false,
            volume: 0.5,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: true,
            delay: 0
        }
        this.music.play(musicConfig); 
        this.sfxlevelup = this.sound.add("sfx_levelup");  

        //Map setup
        this.background=this.add.tileSprite(-200,-200,1400, 1200, "background"); //TileSprite is different from images!
        this.background.setOrigin(0,0); //So its easier to move the background relating to it's top left corner.
        var gridW = 928;
        var gridH = 800;
        
        var gridDeep = this.add.rectangle(-10, 0, gridW+10, gridH+10, 0x002757);
        gridDeep.setOrigin(0,0)
        var g1 = this.add.grid(0, 0, gridW, gridH, 32, 32, 0x00b9f2).setAltFillStyle(0x016fce).setOutlineStyle();
        g1.setOrigin(0,0);
        this.physics.world.setBounds( 0, 0, gridW, gridH);
        

        var graphics = this.add.graphics();
            graphics.fillStyle(0x000000, 1).setDepth(150).setScrollFactor(0,0);
            graphics.beginPath();
            graphics.moveTo(0,0);
            graphics.lineTo(400, 0);
            graphics.lineTo(400, 28);
            graphics.lineTo(0,28);
            graphics.lineTo(0,0);
            graphics.closePath();
            graphics.fillPath();

        //Local storage. May need to restart game instance to update evos after each minigame
        this.numEvos= Number( localStorage.getItem("savedEvos") == null ? 0 : localStorage.getItem("savedEvos"));
        
        var name= this.add.bitmapText(15,10, "pixelFont", "Willy Walko", 20);
        name.setScrollFactor(0,0).setDepth(151);
        var evoCounter = this.add.bitmapText(190, 10, "pixelFont", "X " + this.numEvos, 20);
        var evoimg = this.add.image(180,15,'evoimg');
        evoimg.setScrollFactor(0,0).setDepth(151);
        evoCounter.setScrollFactor(0,0).setDepth(151);

        this.brainLabel = this.add.bitmapText(290, 5, "pixelFont", "Brain Size", 13);
        this.brainLabel.setScrollFactor(0,0).setDepth(151);
        this.levelBar = this.add.sprite(330,18, 'levelBar',0);
        this.levelBar.setScrollFactor(0,0).setDepth(151);
        this.brainSize = this.add.sprite(270,15, 'brainSize');
        this.brainSize.setScrollFactor(0,0).setDepth(151);
       
        if(this.numEvos > 100 || this.numEvos > 3000 || this.numEvos > 7000) //1000, 3000, 7000 when you come back from a game
        {
            this.levelBar.setFrame(1);
        }
        this.reachedNewLevel = Number( localStorage.getItem("savedReachedLevel") == null ? 0 : localStorage.getItem("savedReachedLevel"))
        if(this.reachedNewLevel>3)
        {
            this.reachedNewLevel = 3;
        }
        
        var brainFrame =  this.reachedNewLevel;
        this.brainSize.setFrame(brainFrame);
        

        this.shipcarn = this.physics.add.sprite(300,550, 'shipcarn', 0);
        this.shipcarn.anims.play('shipcarn_anim');
        this.philcarn = this.physics.add.sprite(300, 180, 'philcarn', 0);
        this.philcarn.anims.play('philcarn_anim');
        this.triviacarn = this.physics.add.sprite(600,150, 'triviacarn', 0);
        this.triviacarn.anims.play('triviacarn_anim');
        this.bountycarn = this.physics.add.sprite(170,200, 'bountycarn', 0);

        this.archi = this.physics.add.image(480,200, 'archi', 0);

        this.teslacoil = this.physics.add.image(120,430, 'teslacoil', 0);
        this.electric = this.add.sprite(120,370, 'electric', 0);
        this.electric.setScale(2).setDepth(2).anims.play('tesla_anim');
        this.electric2 = this.add.sprite(120,380, 'electric2', 0);
        this.electric2.setScale(2).anims.play('tesla2_anim');
        
        this.bohrmodel = this.physics.add.sprite(350,350, 'bohrmodel', 0).setDepth(1);
        this.bohrmodel.anims.play('bohrmodel_anim');
        this.tweens.add({
            targets: this.bohrmodel,
            y: 340,
            duration: 800,
            ease: 'Linear',
            repeat: -1,
            yoyo: true
            
        });
        var bohrstand = this.physics.add.image(350,390, 'bohrstand', 0);
        bohrstand.body.setSize(20,15);
        
        this.bouncywall1 = this.physics.add.image(600,300, 'bouncywall', 0);
        this.bouncywall1.setScale(1.25).body.setSize(96,15).offset.y = -0.5;
        this.bouncyfloor = this.add.image(600,360, 'bouncyfloor', 0)
        this.bouncywall2 = this.physics.add.image(600,370, 'bouncywall', 0);
        this.bouncywall2.setScale(1.25).setDepth(3).body.setSize(96,15).offset.y = 50;
        this.bouncywall2.body.offset.x = -5
        this.bouncywall3 = this.physics.add.image(650,335, 'bouncywall2',0)
        this.bouncyramp = this.physics.add.image(532, 360, 'bouncyramp',0)
        this.bouncyramp.setScale(1.25).body.setSize(10, 45).offset.x = 20;
        this.inviswall = this.physics.add.image(540,310, 'trigger');
        this.inviswall.body.setSize(15,20);
        this.containerHouse = this.add.container(50, 25, [ this.bouncywall1, this.bouncyfloor, this.bouncywall3, this.bouncyramp, this.inviswall,  this.bouncywall2 ]);
        
        var carW = 256;
        var carH = 192;
        var r1 = this.add.rectangle(563, 605, carW+10, carH+15, 0x002757);
        var r2 = this.add.rectangle(560, 610, carW, carH, 0x45baff);
        this.containerZone = this.add.container(0, -25, [r1, r2]);

        this.froggycar = this.physics.add.sprite(560,650, 'bumpercars', 0);
        this.froggycar.flipX = true;
        this.froggycar.setBounce(1, 1).setMass(20);
        this.froggycar.setCollideWorldBounds(true).setImmovable(false);
        this.froggycar.body.setBoundsRectangle(new Phaser.Geom.Rectangle(410, 350, carW+10, carH+15));
        
        this.taddycar = this.physics.add.sprite(660,650, 'bumpercars', 1);
        this.taddycar.setBounce(1, 1);
        this.taddycar.setCollideWorldBounds(true).setImmovable(false);
        this.taddycar.body.setBoundsRectangle(new Phaser.Geom.Rectangle(430, 475, carW+10, carH+15));
        
        var fence = this.add.graphics()
        .lineStyle(5, 0x00ffff, 0.5)
        .strokeRectShape(this.taddycar.body.customBoundsRectangle);

        this.physics.add.collider(this.froggycar, this.taddycar, (ball, block) =>
        {
            console.log('frog n tad');
        });

        var attractionsArray = [this.froggycar, this.taddycar, this.teslacoil, bohrstand, this.archi, this.shipcarn, this.philcarn, this.triviacarn, this.bountycarn, this.inviswall, this.bouncywall1, this.bouncywall2,this.bouncywall3, this.bouncyramp, this.bouncyfloor]

        //Player setup
        this.willy = this.physics.add.sprite(64,288,'willy',0);
        this.willy.setScale(this.s).setCollideWorldBounds(true);
        this.myCam = this.cameras.main.startFollow(this.willy, true);

        for(let i = 0; i<attractionsArray.length; i++)
        {
            
            if(i > 12)
            {
                this.physics.add.overlap(this.willy, attractionsArray[i]);
            }
            else if (i>1)
            {
                attractionsArray[i].setImmovable();
                this.physics.add.collider(this.willy, attractionsArray[i]);
            }
            else
            {
                this.physics.add.collider(this.willy, attractionsArray[i]);
                
            }

        
        }

        
        
        //Buttons to each minigame ------------------------------------------------------------------------

        this.bountycarn.setInteractive();
        this.bountycarn.body.setSize(70,65).offset.y = -2;
        this.bountycarn.on('pointerup',  (pointer) => {
            this.scene.pause();
            this.scene.launch('startingGame',{gameTitle: "Bohr's Bounty", evos: this.numEvos, gameKey: 'atomic'});
        }, this);
       
        this.shipcarn.setInteractive().setScale(this.s);
        this.shipcarn.body.setSize(75,45)
        this.shipcarn.on('pointerup',  (pointer) => {
            this.scene.pause();
            this.scene.launch('startingGame',{gameTitle: "Microship", evos: this.numEvos, gameKey: 'microship'});
        }, this);

        this.philcarn.setInteractive();
        this.philcarn.body.setSize(100,60).offset.y = -1;
        this.philcarn.on('pointerup',  (pointer) => {
            this.scene.pause();
            this.scene.launch('startingGame',{gameTitle: "Legend of Phil Helios", evos: this.numEvos, gameKey: 'philHelios'});
        }, this);
        
        this.triviacarn.setInteractive();
        this.triviacarn.body.setSize(60,110).offset.y = -1
        this.triviacarn.on('pointerup',  (pointer) => {
            this.scene.pause();
            this.scene.launch('startingGame',{gameTitle: "Chem Trivia", evos: this.numEvos, gameKey: 'trivia'});
        }, this);
        
    
    }
    

    update(time: number, delta: number): void 
    {
        this.background.tilePositionY-= 0.5;
        this.playerMoverManager();
       if(this.willy.body.touching.right && this.bouncyramp.body.touching.left && this.isBouncing == false)
        {
            this.isBouncing = true; 
            this.jumpTween = this.tweens.add({
                targets: this.willy,
                y: this.willy.y - 30,
                duration: 500,
                ease: 'Sine.easeOut',
                repeat: -1,
                yoyo: true
            });
            console.log("bounce")
        }
        if(this.willy.body.touching.left && this.bouncyramp.body.touching.right && this.isBouncing == true)
        {
            this.jumpTween.stop();
            this.isBouncing = false;

        }

        
            
        
    }
    playerMoverManager ()
    {
        var willyLevel_walk = 'willy_walk';
        var willyLevel_idle = 'willy_idle';
        if (this.numEvos >= 10000) //10000
        {
            if(this.reachedNewLevel == 2) //still has old frames of level 2
            {
                this.levelUpTime(10,2);
                this.reachedNewLevel +=1;
                localStorage.setItem('savedReachedLevel', String(this.reachedNewLevel+1));
                console.log(this.reachedNewLevel)
            }
            willyLevel_walk = 'willy3_walk';
            willyLevel_idle = 'willy3_idle';
        }
        else if (this.numEvos >= 5000) //5000
        {
            if(this.reachedNewLevel == 1) //still has old frames of level 1
            {
                this.levelUpTime(5,1);
                this.reachedNewLevel +=1;
                localStorage.setItem('savedReachedLevel', String(this.reachedNewLevel+1));
            }
            willyLevel_walk = 'willy2_walk';
            willyLevel_idle = 'willy2_idle';
        }
        else if(this.numEvos >=2000) //2000
        {
            //if this is first time, pause all controls, play level up bar anim, sparkles transform willy
            if(this.reachedNewLevel == 0) //still has old frames of level 0
            {
                this.levelUpTime(0,0);
                this.reachedNewLevel +=1;
                localStorage.setItem('savedReachedLevel', String(this.reachedNewLevel+1));
            }
            willyLevel_walk = 'willy1_walk';
            willyLevel_idle = 'willy1_idle';
        }
        


        if(!this.cursors || !this.willy)
        {
            return;
        }
        const speed = 150;
        
        //for animations of evolution sprites, have if else inside based on number evos
        var keys = this.input.keyboard.addKeys("W,A,S,D");
        this.willy.setVelocity(0);

        if (keys.A.isDown) 
        {
            
            this.willy.anims.play( willyLevel_walk,true);
            this.willy.setVelocityX(-speed); //Setting velocity X without makeing Y=0 allows for diagonal movement
            this.willy.scaleX = this.s
            this.willy.body.offset.x = 0
        } 
        else if (keys.D.isDown) 
        {
            this.willy.anims.play( willyLevel_walk,true);
            this.willy.setVelocityX(speed);
            this.willy.scaleX = -this.s
            this.willy.body.offset.x = 32
        }
        
        
        if (keys.W.isDown) 
        {
            this.willy.anims.play( willyLevel_walk,true);
            this.willy.setVelocityY(-speed);
        } 
        else if (keys.S.isDown) 
        {
            this.willy.anims.play( willyLevel_walk,true);
            this.willy.setVelocityY(speed);
        }
        
        if(!keys.W.isDown && !keys.A.isDown && !keys.S.isDown && !keys.D.isDown)
        {
            this.willy.anims.play(willyLevel_idle,true);
        }
    }
    levelUpTime(oldFrame,oldBrainSize)
    {
        this.music.pause();
        this.sfxlevelup.play();        
        this.willy.setFrame(oldFrame);
        this.willy.disableBody(true,false); //Dont allow movement while popup is on

        var poof = this.add.sprite(this.willy.x, this.willy.y, 'poof',0);
        poof.anims.play('poof_anim');
        this.levelBar.anims.play('levelUp_anim');
        
        poof.on('animationcomplete',(anim, frame)=> {
            poof.destroy();
            this.willy.enableBody(false,0, 0, true, true); 
            this.music.resume();
            console.log("poofed)")
        });

        var newBrainSize = oldBrainSize+1;
        this.levelBar.on('animationcomplete', (anim, frame) => {
            this.brainSize.setFrame(newBrainSize);   
            this.levelBar.setFrame(0); 
        });


        
    }
}
