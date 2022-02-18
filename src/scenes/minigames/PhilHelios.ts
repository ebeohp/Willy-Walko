import Phaser from 'phaser'

export default class PhilHelios extends Phaser.Scene
{
//Recycling world but vertical
 
    numEvos!: number;
    numCoins!: number;
    private earnedCoins=0;
    private earnedEvos=0;
    private plant!: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
    private cloudGroup!: Phaser.Physics.Arcade.Group;
    private cloudVelX!: number;
    private cursors!: Phaser.Types.Input.Keyboard.CursorKeys | undefined;
    cloud?: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
    cloud2?: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
    cloudArray!: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody[];
    cloud3?: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
 
    cloud4?: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
    cloud1?: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
    plantJumping = false;



	constructor()
	{
		super('philHelios')
	}

	init(data) //Gets initial num evos and coins from home
    {
        this.numEvos = data.evos;
        this.numCoins = data.coins;
    }
    preload()
    {
        this.cursors = this.input.keyboard.createCursorKeys();
    }
    create()
    {
        var graphics = this.add.graphics();
        graphics.fillGradientStyle(0x79ced9, 0x79ced9,0x65a2ba, 0x3287a8,  1);
        graphics.fillRect(0, 0, 400, 300);
        this.plant = this.physics.add.sprite(150,150,"phil"); //spawn on top of a cloud. so have one cloud at beginning fs
        this.plant.body.gravity.y = 7000;
        
        this.cloud = this.physics.add.sprite(150,-25,"cloud");//starting cloud
        this.cloud.setImmovable(true);
        this.physics.add.overlap(this.plant, this.cloud);
    
        this.cloud1 = this.physics.add.sprite(150,50,"cloud");//starting cloud
        this.cloud1.setImmovable(true);
        this.physics.add.overlap(this.plant, this.cloud1);

        this.cloud2 = this.physics.add.sprite(150, 125,"cloud");
        this.cloud2.setImmovable(true);
        this.physics.add.overlap(this.plant, this.cloud2);

        this.cloud3 = this.physics.add.sprite(150, 200,"cloud");
        this.cloud3.setImmovable(true);
        this.physics.add.overlap(this.plant, this.cloud3);

        this.cloud4 = this.physics.add.sprite(150, 275,"cloud");
        this.cloud4.setImmovable(true);
        this.physics.add.overlap(this.plant, this.cloud4);

        this.cloudArray = [this.cloud, this.cloud1, this.cloud2, this.cloud3, this.cloud4];

        /*
        -plant hits cloud, tweens up and down
        -clouds moves down by 75 (should have four layers of clouds)
            -if cloud y>400, respawn at top
        -if player y>400, game over

        Issue: how to get plant go thru cloud wo collision?
        */
        
        
    }

    update(time: number, delta: number): void {
        if(this.plant.y>400)
        {
            console.log("game over");
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
        console.log("jumping")
        this.plantJumping = true;
        this.plant.body.gravity.y = 0;
        this.tweens.add({
            targets: this.plant,
            y: 75,
            duration: 1000, //edit duration for speed
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
            y: 175,
            duration: 1000, //edit duration for speed
            ease: 'Sine.easeInOut',
            repeat: 0,
            onComplete: () =>
            {
                console.log(this.plant.y)
                this.plant.body.gravity.y = 2000;
                this.plantJumping = false;
            }
            
        });
    }
    moveCloud(cloud){ 
        this.tweens.add({
            targets: cloud,
            y: cloud.y+75,
            duration: 1000, //edit duration for speed
            ease: 'Sine.easeInOut',
            repeat: 0,
            onComplete: () =>
            {
                if(cloud.y>280){ 
                    this.resetCloudPos(cloud);   
                }
            }
        }); 
        
        
    }
    
    resetCloudPos(cloud){ //This helps bring the ship back to the top of the game at a random X position.
        cloud.y = -25;
        var randomX = Phaser.Math.Between(25, 375);
        cloud.x= randomX;
    }
   
    endPopUp() //Determine number of evos and coins won
    {

        this.add.bitmapText(150,80, "pixelFont", "Evos Restored: " + this.earnedEvos, 40);
        this.add.bitmapText(150,100, "pixelFont", "Coins Restored: " + this.earnedCoins, 40);

        this.updateEvosCoins();
    }
    updateEvosCoins() //Add won evos and coins given from home. Localstoraged
    {
        var totalEvos = this.numEvos+this.earnedEvos;
        var totalCoins = this.numCoins+this.earnedCoins;

        localStorage.setItem('savedEvos', totalEvos.toString()); 
        localStorage.setItem('savedCoins', totalCoins.toString());
        this.scene.start('home');
    }
    //scene transition back to home
}
