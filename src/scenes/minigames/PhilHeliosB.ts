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
    sunArrangement1: any;
    sunArrangement2: any;
    sunArrangement3: any;
    sunArrangement4: any;
    sunArrangement5: any;
    starchEvos = 0;

   

	constructor()
	{
		super('philHeliosB')
	}

	init(data) //Gets initial num evos and coins from home
    {
        this.earnedEvos = data.earnedEvos; // the amt we have from main game
    }
    preload()
    {
        this.cursors = this.input.keyboard.createCursorKeys();
    }
    create()
    {
        /*var xButton = this.add.sprite(380,20, "uiButtons", 2)
        xButton.setDepth(100);
        xButton.setInteractive();
        xButton.on('pointerup',  (pointer) => {
            this.scene.launch('quittingGame', {currentGameKey: 'philHelios', earnedEvos: this.earnedEvos, numEvos: this.numEvos, gameTitle: "Legend of Phil Helios"});
            this.scene.pause();
        }, this);*/ //Complicated


        var graphics = this.add.graphics();
        graphics.fillGradientStyle(0x79ced9, 0x79ced9,0x65a2ba, 0x3287a8,  1);
        graphics.fillRect(-10, -210, 420, 2500);
        this.plant = this.physics.add.sprite(150,2200,"phil",2); //spawn on top of a cloud. so have one cloud at beginning fs
        this.plant.setDepth(10)
        var myCam = this.cameras.main.startFollow(this.plant, true);
        myCam.shake(12000,0.005);
        myCam.setBounds(0,-200,400,2000);
        myCam.setZoom(1.5);
        myCam.fadeIn(1000);

        
        
        this.sunArrangement1 = [[1,1,1,1],
                                [1,0,0,0],
                                [1,1,1,1],
                                [0,0,0,1],
                                [1,1,1,1]];
        this.sunArrangement2 = [[0,0,0,1],
                                [0,0,0,1],
                                [1,0,0,0],
                                [1,0,0,0],
                                [0,0,0,1],
                                [0,0,0,1]];
        this.sunArrangement3 = [[1,0,0,0],
                                [0,1,0,0],
                                [0,0,1,0],
                                [0,0,0,1]];
        this.sunArrangement4 = [[0,0,0,1],
                                [0,0,1,0],
                                [0,1,0,0],
                                [1,0,0,0]];
        this.sunArrangement4 = [[0,0,0,1],
                                [0,0,1,0],
                                [0,1,0,0],
                                [1,0,0,0]];
        this.sunArrangement5 = [[1,0,0,0],
                                [1,1,1,1],
                                [0,0,0,1],
                                [1,1,1,1],
                                [1,0,0,0],
                                [1,0,0,0],
                                [0,0,0,1],
                                [0,0,0,1],
                                [0,1,1,0]]
       
       var rowLocation = [20,60,100,140,180]; //vertical spaced
       var columnLocation = [120,160,200,240,280]; //horizontal spaced
                                
        for(let i = 0; i<this.sunArrangement1.length; i++)
        {
            for(let j = 0; j<this.sunArrangement1[0].length; j++)
            {
                if(this.sunArrangement1[i][j] == 1)
                {
                    //position in array represents a coordinate?
                    this.createSun(columnLocation[j],rowLocation[i]);
                }
            }
        }
        var rowLocation2 = [260,300,340,380,420,460];
        for(let i = 0; i<this.sunArrangement2.length; i++)
        {
            for(let j = 0; j<this.sunArrangement2[0].length; j++)
            {
                if(this.sunArrangement2[i][j] == 1)
                {
                    //position in array represents a coordinate?
                    this.createSun(columnLocation[j],rowLocation2[i]);
                }
            }
        }
        var rowLocation3 = [540,580,620,660];
        for(let i = 0; i<this.sunArrangement3.length; i++)
        {
            for(let j = 0; j<this.sunArrangement3[0].length; j++)
            {
                if(this.sunArrangement3[i][j] == 1)
                {
                    //position in array represents a coordinate?
                    this.createSun(columnLocation[j],rowLocation3[i]);
                }
            }
        }
        var rowLocation4 = [740,780,820,860];
        for(let i = 0; i<this.sunArrangement4.length; i++)
        {
            for(let j = 0; j<this.sunArrangement4[0].length; j++)
            {
                if(this.sunArrangement4[i][j] == 1)
                {
                    //position in array represents a coordinate?
                    this.createSun(columnLocation[j],rowLocation4[i]);
                }
            }
        }
        var rowLocation5 = [940,1000,1060,1120,1180,1240,1300,1360,1420]; //even more spaced out
        for(let i = 0; i<this.sunArrangement5.length; i++)
        {
            for(let j = 0; j<this.sunArrangement5[0].length; j++)
            {
                if(this.sunArrangement5[i][j] == 1)
                {
                    //position in array represents a coordinate?
                    this.createSun(columnLocation[j],rowLocation5[i]);
                }
            }
        }
    }
    createSun(x,y)
    {
        var sun = this.physics.add.sprite(x,y,"sunCandy");
        sun.anims.play("sun_anim");
        this.physics.add.collider(this.plant, sun, (plant,sunItem)=>{
            sunItem.destroy();
            this.starchEvos+=10;
        })
    }
  
    update(time: number, delta: number): void 
    {
        if(this.plant.y<-200)
        {
            this.scene.stop();
            console.log(this.starchEvos)
            this.scene.resume("philHelios")
        }
        this.plantMoverManager();
    }
    getStarchEvos(){ //getter method!
        
        return this.starchEvos;
    }
    plantMoverManager() //in this version, allow the plant to move on its own from a negative position up.
    {
        if(!this.cursors || !this.plant)
        {
            return;
        }
        const speed = 150;
        if(this.cursors.left?.isDown)
        {
            this.plant.setVelocity(-speed, -200);
        }
        else if(this.cursors.right?.isDown)
        {
            this.plant.setVelocity(speed, -200);
        }
        else
        {
            this.plant.setVelocity(0,-200);
        }
      
    }
    

    
    
    resetCloudPos(cloud){ //reset clouds and add power ups
        cloud.y = -50; 
        var spawnX = [50,150,250]
        var randomX = Phaser.Math.Between(0,2);
        cloud.x= spawnX[randomX];
       
    }

   
    

}