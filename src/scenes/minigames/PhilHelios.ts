import Phaser from 'phaser'

export default class PhilHelios extends Phaser.Scene
{
//Recycling world but vertical
 
    numEvos!: number;
    private earnedEvos=0;
    private plant!: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
    private cloudGroup!: Phaser.Physics.Arcade.Group;
    private cloudVelX!: number;
    private cursors!: Phaser.Types.Input.Keyboard.CursorKeys | undefined;
    private cloud?: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
    private cloud2?: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
    private cloudArray!: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody[];
    private cloud3?: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
    private cloud1?: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
    private plantJumping = false;
    private rain!: Phaser.Physics.Arcade.Group;
    private waterAmt = 0;
    graphics!: Phaser.GameObjects.Graphics; //placeholders
    sunCandy!: Phaser.Physics.Arcade.Group;
    private gameSpeed = 1000;
    rainGroup!: Phaser.Physics.Arcade.Group;
    hasAquaporin = false;
    hasChlorophyll = false;
    suckedSun = 0;
    waterBar!: Phaser.GameObjects.Sprite;
    waterFrame = 0;
    activeAquaIcon!: Phaser.GameObjects.Sprite;
    activeChloroIcon!: Phaser.GameObjects.Sprite;
    activeStarchIcon!: Phaser.GameObjects.Sprite;
    hiScore!: number;
    hiScoreCounter!: Phaser.GameObjects.BitmapText;
    score!: number;
    scoreCounter!: Phaser.GameObjects.BitmapText;
    sfxdrip: Phaser.Sound.BaseSound;
    sfxsun: Phaser.Sound.BaseSound;
    sfxaquap: Phaser.Sound.BaseSound;
    sfxstarch: Phaser.Sound.BaseSound;
    sfxchloro: Phaser.Sound.BaseSound;
    music: Phaser.Sound.BaseSound;
    sfxConfig: { //optional
        mute: boolean; volume: number; rate: number; detune: number; seek: number; loop: boolean; delay: number;
    };
    sfxsunConfig: { //optional
        mute: boolean; volume: number; rate: number; detune: number; seek: number; loop: boolean; delay: number;
    };


	constructor()
	{
		super('philHelios')
	}

	init(data) //Gets initial num evos from home
    {
        this.numEvos = data.evos;
        
    }
    preload()
    {
        this.cursors = this.input.keyboard.createCursorKeys();
    }
    create()
    {
        this.sfxdrip = this.sound.add('sfx_drip'); 
        this.sfxsun = this.sound.add('sfx_sun'); 
        this.sfxaquap = this.sound.add('sfx_aquap'); 
        this.sfxstarch = this.sound.add('sfx_starch'); 
        this.sfxchloro = this.sound.add('sfx_chloro'); 
        this.music = this.sound.add("phil_theme");  
        this.sfxConfig = 
        { //optional
            mute: false,
            volume: 4,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: false,
            delay: 0
        }
        this.sfxsunConfig = 
        { //optional
            mute: false,
            volume: 0.5,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: false,
            delay: 0
        }
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

        this.earnedEvos = 0;
        var xButton = this.add.image(380,20, "xButton")
        xButton.setDepth(100).setAlpha(0.3);
        xButton.setInteractive();
        xButton.setScrollFactor(0,0);
        
        xButton.on('pointerover',  (pointer) => {
            xButton.setAlpha(1);
        }, this);
        xButton.on('pointerout',  (pointer) => {
            xButton.setAlpha(0.5);
        }, this);
        xButton.on('pointerup',  (pointer) => {
            var totalEvos = this.earnedEvos;
            this.scene.launch('quittingGame', {currentGameKey: 'philHelios', earnedEvos: totalEvos, numEvos: this.numEvos, gameTitle: "Legend of Phil Helios", currentMusicKey: "phil_theme"});
            this.scene.pause();
        }, this);
        

        var graphics = this.add.graphics();
        graphics.fillGradientStyle(0x79ced9, 0x79ced9,0x65a2ba, 0x3287a8,  1);
        graphics.fillRect(0, 0, 400, 300);

        this.hiScore = Number( localStorage.getItem("savedPhilScore") == null ? 0 : localStorage.getItem("savedPhilScore"));
        var hiScoreFormatted = this.zeroPad(this.hiScore, 6)
        this.hiScoreCounter = this.add.bitmapText(10, 10, "pixelFont", "BEST " +  hiScoreFormatted, 20);
        this.hiScoreCounter.setDepth(10)

        this.score = 0;
        this.scoreCounter = this.add.bitmapText(365, 60, "pixelFont", this.score + " \n FT", 20);
        this.scoreCounter.setDepth(10)

        this.plant = this.physics.add.sprite(150,185,"phil"); //spawn on top of a cloud. so have one cloud at beginning fs
        this.plant.body.gravity.y = 7000;
        this.plant.setDepth(10);
        this.physics.world.setBounds( 0, 0, 325, 500);
        this.plant.setCollideWorldBounds(true)
        
        this.cloud = this.physics.add.sprite(150,-50,"cloud");//starting cloud
        this.cloud.setImmovable(true);
        this.physics.add.overlap(this.plant, this.cloud)
    
        this.cloud1 = this.physics.add.sprite(150,50,"cloud");//starting cloud
        this.cloud1.setImmovable(true);
        this.physics.add.overlap(this.plant, this.cloud1);

        this.cloud2 = this.physics.add.sprite(150, 150,"cloud");
        this.cloud2.setImmovable(true);
        this.physics.add.overlap(this.plant, this.cloud2);

        this.cloud3 = this.physics.add.sprite(150, 250,"cloud");
        this.cloud3.setImmovable(true);
        this.physics.add.overlap(this.plant, this.cloud3);


        this.cloudArray = [this.cloud, this.cloud1, this.cloud2, this.cloud3];

        this.graphics = this.add.graphics();
        this.waterBar = this.add.sprite(375,180, "waterbar",0)        
        this.waterAmt = 10;
        //active powerups
        this.activeAquaIcon = this.add.sprite(340,145, "plantpowers", 3);
        this.activeAquaIcon.setAlpha(0.5)
        this.activeChloroIcon = this.add.sprite(339,182, "plantpowers", 0);
        this.activeChloroIcon.setAlpha(0.5)
        this.activeStarchIcon = this.add.sprite(340,218, "plantpowers", 2);
        this.activeStarchIcon.setAlpha(0.5)
        
        this.time.addEvent({  
            delay: 2000, 
            callback: this.depleteWater, 
            callbackScope: this, 
            loop: true
        });

        
        this.rainGroup = this.physics.add.group();
        this.time.addEvent({
            delay: 5000,
            callback: this.rainWater,
            callbackScope: this,
            loop: true
        });
        this.physics.add.collider(this.plant, this.rainGroup, (plant, drop) =>{
            this.sfxdrip.play();
            var animPlayer = this.add.sprite(drop.x,drop.y,"water");
            drop.destroy();
            animPlayer.anims.play("water_anim");
            animPlayer.on('animationcomplete', ()=>{
                animPlayer.destroy();
            })
            this.waterAmt+= 1;
            if(this.waterAmt<=10)
            {
                this.waterBar.setFrame(this.waterFrame-=1)

            }
            console.log(this.waterAmt)
        });
        
        this.time.addEvent({
            delay: 5000,
            callback: this.speedUpGame,
            callbackScope: this,
            loop: true
        });

        //powerups
        this.time.addEvent({
            delay: 10000,
            callback: this.newAquaPower,
            callbackScope: this,
            loop: true
        });

        
        this.time.addEvent({
            delay: 30000, // 30 seconds
            callback: this.newStarchPower,
            callbackScope: this,
            loop: true
        });

        

    }

    zeroPad(number,size)
    {
        var stringNumber = String(number);
        while(stringNumber.length < (size || 2))
        {
            stringNumber = "0" + stringNumber;
        }
        return stringNumber;
    }
    speedUpGame() //slightly buggy. instead of increasing, try interval night and day
    {
        if(this.gameSpeed != 500)
        {        
            this.gameSpeed -= 30;
        }
    }
    update(time: number, delta: number): void {
        if(this.hasAquaporin == true)
        {
            this.activeAquaIcon.setAlpha(1).setScale(1.5);
        }else{
            this.activeAquaIcon.setAlpha(0.5).setScale(1)
        }
        if(this.hasChlorophyll == true)
        {
            this.activeChloroIcon.setAlpha(1).setScale(1.5);
        }else{
            this.activeChloroIcon.setAlpha(0.5).setScale(1)
        }
        if(this.plant.y>300)
        {
            console.log("game over");
            this.hiScoreCounter.setAlpha(0);
            var gameOver = this.add.bitmapText(10,10, "pixelFont", "GAME OVER",40);
            this.gameOver();
        }

        this.plantMoverManager();
    }
    gameOver()
    {
        var totalEvos = this.earnedEvos+this.scene.get('philHeliosB').getStarchEvos();
        var camera = this.cameras.main;
        camera.fadeOut(1000)
        this.time.addEvent({  
            delay: 2000, 
            callback: ()=>{
                this.music.stop();
                this.scene.start("awardGame", {gameTitle: "Legend of Phil Helios", earnedEvos: totalEvos, numEvos: this.numEvos, currentMusicKey: 'phil_theme'});
            }, 
            callbackScope: this, 
            loop: false
        });
        this.plant.disableBody(true,true);
    }
    plantMoverManager()
    {
        if(!this.cursors || !this.plant)
        {
            return;
        }
        const speed = 200;
        if(this.cursors.left?.isDown)
        {
            this.plant.setVelocity(-speed, 0);
        }
        else if(this.cursors.right?.isDown)
        {
            this.plant.setVelocity(speed, 0);
        }
        else
        {
            this.plant.setVelocity(0,0);
        }
        if(this.plant.body.touching.down && this.plantJumping == false) //AND is at certain height
        {
            this.plant.setFrame(1);
            this.time.addEvent({  
                delay: 100, 
                callback: this.jump, 
                callbackScope: this, 
                loop: false
            });
            //move all clouds for loop
            for(let i = 0; i<this.cloudArray.length; i++)
            {
                
               this.moveCloud(this.cloudArray[i]);
            }
            
        }
    }
    
    jump(){
        this.plant.setFrame(0);
        this.plantJumping = true;
        this.plant.body.gravity.y = 0;
        this.score += 15;
        this.scoreCounter.text = this.score + " \n FT";
        if(this.score>this.hiScore)
        {
            this.hiScore = this.score;
            localStorage.setItem('savedPhilScore', String(this.hiScore));
            this.hiScoreCounter.text = "BEST " + this.zeroPad(this.hiScore, 6);
            this.tweens.add({
                targets: this.hiScoreCounter,
                scale: 1.25,
                ease: 'Elastic',
                duration: 300,
                onComplete: () => {
                    this.hiScoreCounter.setScale(1);
                    //plays a ding! sound
                }
              });
        }
        this.tweens.add({
            targets: this.plant,
            y: 150, //just space clouds out more
            duration: this.gameSpeed, //edit duration for speed
            ease: 'Sine.easeInOut',
            repeat: 0,
            onComplete: () =>
            {
                this.fall()
            }
            
        });
        
    }
    fall()
    {
        this.tweens.add({
            targets: this.plant,
            y: 240,
            duration: this.gameSpeed, //edit duration for speed
            ease: 'Sine.easeInOut',
            repeat: 0,
            onComplete: () =>
            {
                this.plant.body.gravity.y = 7000;
                this.plantJumping = false;
            }
            
        });
    }
    moveCloud(cloud){ 
        this.tweens.add({
            targets: cloud,
            y: cloud.y+100,
            duration: this.gameSpeed, //edit duration for speed
            ease: 'Sine.easeInOut',
            repeat: 0,
            
        }); 
        if(cloud.y>300){ 
            this.resetCloudPos(cloud);   
        }
        
    }
    
    resetCloudPos(cloud){ //reset clouds and add power ups
        cloud.y = -50; 
        var spawnX = [50,150,250]
        var randomX = Phaser.Math.Between(0,2);
        cloud.x= spawnX[randomX];
        //add more complexity in terms of 1-3 clouds per Amt, also more spaced out
        
        var chances = Phaser.Math.Between(1,100);
        //chances of cloud having chrolophyll is 25%
        if(chances>90)
        {
            var chlorophyll = this.physics.add.sprite(cloud.x, cloud.y-32,"plantpowers", 0);
            chlorophyll.body.gravity.y = 300;   
            this.physics.add.collider(chlorophyll, cloud);
            this.physics.add.collider(this.plant, chlorophyll,(plant, power) => {
                this.hasChlorophyll = true;
                this.sfxchloro.play(this.sfxConfig);
                chlorophyll.destroy();
            });
        }
        if(chances<=90)  //chances of cloud having sun is 70%
        {
            var sun = this.physics.add.sprite(cloud.x, cloud.y-32, "sun");
            sun.body.gravity.y = 300;
            sun.play("sun_anim");
            var cloudCollider = this.physics.add.collider(sun, cloud);
                
            this.physics.add.collider(this.plant, sun, ()=>{
                this.sfxsun.play(this.sfxsunConfig);
                sun.destroy();
                this.earnedEvos +=10; 
            })
            if(this.hasChlorophyll == true)
            {
                    if(this.suckedSun<10)
                    {
                        this.time.addEvent({
                            delay: 1000, // let the sun show up on the cloud first...
                            callback: ()=>{     
                                cloudCollider.destroy();                          
                                this.physics.moveToObject(sun, this.plant, 300)
                            },
                            loop: false
                        })
                        this.suckedSun +=1;
                    }
                    else if(this.suckedSun ==10)
                    {
                        this.hasChlorophyll = false;
                        this.suckedSun = 0;
                    }
                
            }
            else
            {
                
            }
        }
        
        
        //chances of cloud having boost is 10%

            
    }

    rainWater(){ // new raindrops
        var rainX = [30,80,130,180,230,280];
        for(let i = 0; i<rainX.length; i++)
        {
            
            var rain = this.rainGroup.create(rainX[i], 0, "water");
            if(this.hasAquaporin == true)
            {
                this.tweens.add({
                    targets: rain,
                    x: this.plant.x,
                    y: this.plant.y,
                    duration: 800, //edit duration for speed
                    ease: 'Linear',
                    repeat: 0,
                    onComplete: () =>
                    {
                        this.hasAquaporin = false;
                    } 
                });
            }
            else
            {    
                rain.body.gravity.y = Phaser.Math.Between(100,400)
            }
        }
        
    
    }
    depleteWater() //add graphics later
    {
        if(this.waterAmt==0)
        {   
            console.log("game over, no more water!")
            this.add.bitmapText(10,10,"pixelFont", "GAME OVER",40,5)
            this.gameOver();
        }
        this.waterAmt-=1; // so what if its at 14?
        if(this.waterAmt>=10)
        {
            this.waterBar.setFrame(0);
            this.waterAmt = 10;
        }else if(this.waterFrame+1 !=11)
        {
            this.waterBar.setFrame(this.waterFrame+=1);
        }
    
    }

   //powerUps

    newAquaPower()
    {
        var aquaporin = this.physics.add.sprite(Phaser.Math.Between(10,250), Phaser.Math.Between(50,150),"plantpowers", 3)
        aquaporin.setVelocityY(50).setAlpha(0);
        this.tweens.add({
            targets: aquaporin,
            alpha: 1,
            duration: 500, //edit duration for speed
            ease: 'Linear',
            repeat:0
            
        });
        this.physics.add.collider(this.plant,aquaporin, (plant, power) => {
            this.sfxaquap.play(this.sfxConfig);
            this.hasAquaporin = true;
            aquaporin.destroy();
        });
    }
    newStarchPower() //
    {
        var starch = this.physics.add.sprite(50,0,"plantpowers", 2);
        starch.setVelocityY(20).setVelocityX(200).setAlpha(0.2).setBounce(1);
        starch.setCollideWorldBounds(true);
        this.tweens.add({ // bounces around for a limited amount of time
            targets: starch,
            alpha: 1,
            duration: 1000, 
            ease: 'Linear',
            repeat: 0,
            onComplete: ()=>
            {
                this.tweens.add({
                    targets: starch,
                    alpha: 0,
                    delay: 8000,
                    duration: 1000,
                    ease: 'Linear',
                    repeat: 0,
                    onComplete: () =>
                    {
                        starch.destroy();
                    }
                    
                });
            }
            
            
        });
        this.physics.add.collider(this.plant, starch, (plant, power) => { 
            this.sfxstarch.play(this.sfxConfig);
            starch.destroy();
            //fade out of scene

            this.time.addEvent({
                delay: 1000, // let the sun show up on the cloud first...
                callback: ()=>{     
                    this.scene.pause();
                    this.scene.launch('philHeliosB');
                },
                loop: false
            })

        });
        //launch another scene and pause this one
        //other scene counts evos and resumes this one with evos?
    }
    

}