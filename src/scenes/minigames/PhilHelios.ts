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
 
    private cloud4?: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
    private cloud1?: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
    private plantJumping = false;
    private rain!: Phaser.Physics.Arcade.Group;
    private waterAmt = 0;
    graphics!: Phaser.GameObjects.Graphics; //placeholders
    waterBar!: Phaser.GameObjects.Graphics;
    sunCandy!: Phaser.Physics.Arcade.Group;
    private gameSpeed = 1000;
    rainGroup!: Phaser.Physics.Arcade.Group;
    waterBarHeight: number;



	constructor()
	{
		super('philHelios')
	}

	init(data) //Gets initial num evos and coins from home
    {
        this.numEvos = data.evos;
    }
    preload()
    {
        this.cursors = this.input.keyboard.createCursorKeys();
    }
    create()
    {
        var xButton = this.add.sprite(380,20, "uiButtons", 2)
        xButton.setDepth(100);
        xButton.setInteractive();
        xButton.on('pointerup',  (pointer) => {
            this.scene.launch('quittingGame', {currentGameKey: 'philHelios', earnedEvos: this.earnedEvos, numEvos: this.numEvos, gameTitle: "Legend of Phil Helios"});
            this.scene.pause();
        }, this);


        var graphics = this.add.graphics();
        graphics.fillGradientStyle(0x79ced9, 0x79ced9,0x65a2ba, 0x3287a8,  1);
        graphics.fillRect(0, 0, 400, 300);
        this.plant = this.physics.add.sprite(150,185,"phil"); //spawn on top of a cloud. so have one cloud at beginning fs
        this.plant.body.gravity.y = 7000;
        this.plant.setDepth(10)
        
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

        graphics.fillStyle(0x88eb7f, 1);
        graphics.fillRoundedRect(370, 80, 20, 200, 5);
        graphics.fillStyle(0x2391eb, 1);
        this.waterBar = graphics.fillRoundedRect(375, 90, 10, 180, 3);
        //height -18, and then y+18
        this.waterBarHeight = 180;
        this.waterAmt = 10;
        
        this.time.addEvent({  
            delay: 1500, 
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
            var animPlayer = this.add.sprite(drop.x,drop.y,"water");
            drop.destroy();
            animPlayer.anims.play("water_anim");
            animPlayer.on('animationcomplete', ()=>{
                animPlayer.destroy();
            })
            this.waterAmt+= 1;
            console.log(this.waterAmt)
        });
        /*
        this.time.addEvent({
            delay: 5000,
            callback: this.speedUpGame,
            callbackScope: this,
            loop: true
        }); */
        
    }

    speedUpGame() //slightly buggy. instead of increasing, try interval night and day
    {
        this.gameSpeed -= 10;
    }
    update(time: number, delta: number): void {
        
        if(this.plant.y>300)
        {
            console.log("game over");
            this.add.bitmapText(10,10, "pixelFont", "GAME OVER");
            this.plant.disableBody(true,true);
            this.scene.pause();
        }

        this.plantMoverManager();
    }
     
    plantMoverManager()
    {
        if(!this.cursors || !this.plant)
        {
            return;
        }
        const speed = 150;
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
        
        var sun = this.physics.add.sprite(cloud.x, cloud.y-32, "sun");
        sun.body.gravity.y = 300;
        sun.play("sun_anim");
        this.physics.add.collider(sun, cloud);
        this.physics.add.collider(this.plant, sun, ()=>{
            sun.destroy();
            this.earnedEvos +=10; 
        
            console.log(this.earnedEvos)
        })
            
    }

    rainWater(){ // new raindrops
        var rainX = [30,80,130,180,230,280];
        for(let i = 0; i<rainX.length; i++)
        {
            var rain = this.rainGroup.create(rainX[i], 0, "water");
            rain.body.gravity.y = Phaser.Math.Between(100,400)
        }
    
    }
    depleteWater() //add graphics later
    {
        if(this.waterAmt==0)
        {   
            console.log("game over, no more water!")
            this.add.bitmapText(10,10,"pixelFont", "GAME OVER",30,5)
            this.scene.pause();
        }
        this.waterAmt-=1;
    
    }

   //powerUps
}