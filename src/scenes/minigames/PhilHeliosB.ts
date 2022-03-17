import Phaser from 'phaser'

export default class PhilHeliosB extends Phaser.Scene
{
//Recycling world but vertical
 
    numEvos!: number;
    private earnedEvos=0;
    private plant!: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
    private cloudVelX!: number;
    private cursors!: Phaser.Types.Input.Keyboard.CursorKeys | undefined;
    private cloud?: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
    private cloud2?: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
    private cloudArray!: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody[];
    private cloud3?: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
    private cloud1?: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
   

	constructor()
	{
		super('philHeliosB')
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
        this.cloud.setImmovable(true).setVelocityY(500);
        this.physics.add.overlap(this.plant, this.cloud)
    
        this.cloud1 = this.physics.add.sprite(150,50,"cloud");//starting cloud
        this.cloud1.setImmovable(true).setVelocityY(500);
        this.physics.add.overlap(this.plant, this.cloud1);

        this.cloud2 = this.physics.add.sprite(150, 150,"cloud");
        this.cloud2.setImmovable(true).setVelocityY(500);
        this.physics.add.overlap(this.plant, this.cloud2);

        this.cloud3 = this.physics.add.sprite(150, 250,"cloud");
        this.cloud3.setImmovable(true).setVelocityY(500);
        this.physics.add.overlap(this.plant, this.cloud3);


        this.cloudArray = [this.cloud, this.cloud1, this.cloud2, this.cloud3];

        
        
    }

  
    update(time: number, delta: number): void {
        
        for(let i = 0; i<this.cloudArray.length; i++)
            {
                
               this.moveCloud(this.cloudArray[i]);
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
    

    moveCloud(cloud){ 
        this.tweens.add({
            targets: cloud,
            y: cloud.y+100,
            duration: 10, //edit duration for speed
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
       
        
        
        //chances of cloud having boost is 10%

            
    }

   
    

}