import Phaser from 'phaser'

export default class MicroShip extends Phaser.Scene
{
    numEvos!: number;
    earnedEvos=0;
    ship!: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
    myCam!: Phaser.Cameras.Scene2D.Camera;
    mito!: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
    er!: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
    golgi!: any;
    vacuole!: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
    lyso!: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
    ribo!: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
    organelleArray!: any[];
    targetXY: Phaser.Math.Vector2;
    pointer: Phaser.Input.Pointer[];
    keys: object;
    organelleTexts: string[];
    numHearts = 3;
    
    
	constructor()
	{
		super('microship')
	} 

    init(data) //Gets initial num evos and coins from home
    {
        this.numEvos = data.evos;
    }

	preload()
    {
       // this.cursors = this.input.keyboard.createCursorKeys();
       this.pointer = this.input.addPointer();
    }

    create() //block out bg with graphics. do as little art as possible
    {
        var xButton = this.add.sprite(380,20, "uiButtons", 2)
        xButton.setDepth(100).setScrollFactor(0,0);
        xButton.setInteractive();
        xButton.on('pointerup',  (pointer) => {
            this.scene.launch('quittingGame', {currentGameKey: 'microship', earnedEvos: this.earnedEvos, numEvos: this.numEvos, gameTitle: "Micro-Ship"});
            this.scene.pause();
        }, this);
        this.add.rectangle(-200,-150,400,300,0xffffff)
        var r1 = this.add.circle(0, 0, 450, 0xe1e2ed,0.5);
        r1.setStrokeStyle(4, 0xff0400);
        var r2 = this.add.circle(0, 0, 200, 0xa80019);
        r2.setStrokeStyle(4, 0xff0400);

        this.ship = this.physics.add.sprite(0,-250,'ship',0); //0,-220
        this.ship.setDepth(10)
        //Graphics for lives system and groups hearts 
        this.heartGroup = this.physics.add.group();
        this.heart1 = this.heartGroup.create(30, 30, "lives",3);
        this.heart1.setScrollFactor(0,0).setDepth(20);
        this.heart2 = this.heartGroup.create(60, 30, "lives",3);
        this.heart2.setScrollFactor(0,0).setDepth(20);
        this.heart3 = this.heartGroup.create(90, 30, "lives",3);
        this.heart3.setScrollFactor(0,0).setDepth(20);

        var cam = this.myCam = this.cameras.main.startFollow(this.ship, false, 0.1, 0.1, 0, 0);
        //this.myCam.setBounds(-400,-300, 800, 600);
        //this.myCam.setViewport(0,0,400,300);
        
       
        this.input.on('pointermove',  (pointer) => 
        {
            let mouse = pointer
            var angle = Phaser.Math.Angle.Between(this.ship.x, this.ship.y, mouse.x + this.cameras.main.scrollX, mouse.y + this.cameras.main.scrollY)            
            this.ship.rotation=angle+90; //fix later
        }, this);
        this.input.on('pointerup',  (pointer) => 
        {
            //this.shootBeam()
            console.log('shoot!');
            
            var beam = this.projectiles.create(this.ship.x, this.ship.y, "bullet");
            var angle = Phaser.Math.Angle.Between(this.ship.x, this.ship.y, pointer.x + this.cameras.main.scrollX, pointer.y + this.cameras.main.scrollY)            
            
            this.physics.velocityFromRotation(angle, 600, beam.body.velocity);
        }, this);

        //bit boring, add some tweening/floaty effect
        this.mito = this.physics.add.sprite(250,-250,'mito',0);
        this.er = this.physics.add.sprite(230,0,'er',0);
        this.er.angle = 90
        this.golgi = this.physics.add.sprite(-180,-300,'golgi',0);
        this.golgi.angle = -20;
        this.vacuole = this.physics.add.sprite(-300, 200,'vacuole',0);
        this.lyso = this.physics.add.sprite(380,-50,'lyso',0);
        this.ribo = this.physics.add.sprite(50, 280,'ribo',0);
        this.organelleArray = [this.mito, this.er, this.golgi, this.vacuole, this.lyso, this.ribo];
        for(let i = 0; i<this.organelleArray.length; i++)
        {
            this.physics.add.collider(this.organelleArray[i], this.germGroup,()=>{
                //set this organelle's health bar
            })
        }
        
        
        this.organelleTexts = ["mitochondria","endoplasmic\nreticulum", "golgi\napparatus", "vacuole", "ribosome"]
        
        this.physics.add.overlap(this.mito,this.ship, ()=>{
            var incorrect1 = Phaser.Math.Between(1,5);
            var incorrect2 = Phaser.Math.Between(1,5);
            while(incorrect1==incorrect2)//incase if they are the same
            {
                incorrect2 = Phaser.Math.Between(1,5);
            }
            this.popUp("mitochondria", this.organelleTexts[incorrect1], this.organelleTexts[incorrect2]);
        })
        
        this.projectiles = this.physics.add.group()




        //Decoration change depth soon
        var dec1 = this.physics.add.sprite(-280,-100,'mito',0);
        dec1.setScale(0.8).setAlpha(0.3).flipX = true;
        var dec2 = this.add.sprite(300,280,'mito',0);
        dec2.setAlpha(0.3).setScale(0.8)
        var dec3 = this.add.sprite(150,350,'lyso',0);
        dec3.setAlpha(0.3).setScale(0.8).angle = -20
        var dec4 = this.add.sprite(-350,100,'lyso',0);
        dec4.setAlpha(0.3).setScale(0.8).angle = 90
        var dec5 = this.add.sprite(-190,150,'er',0);
        dec5.setAlpha(0.3).setScale(2).angle = -130
        var dec6 = this.add.sprite(180,-300,'golgi',0);
        dec6.setAlpha(0.3).setScale(0.8).angle = 20
        var dec7 = this.add.sprite(180, 280,'golgi',0);
        dec7.setAlpha(0.3).setScale(0.8).angle = 160
        var dec8 = this.add.sprite(0, -250,'vacuole',0);
        dec8.setAlpha(0.3).setScale(0.8)
        var dec9 = this.add.sprite(50, -350,'ribo',0);
        dec9.setAlpha(0.3).setScale(0.8)


        this.germGroup = this.physics.add.group();
        this.germ = this.germGroup.create(0,0,"enemy"); //change sprite look later... so ugly
        this.physics.add.collider(this.projectiles, this.germGroup, (bullet, germ)=>{
            console.log("ded germ") //issue fix later
            //bullet.destroy();
            this.earnedEvos+=1;
        })
        this.physics.add.collider(this.ship, this.germGroup, (ship, germ)=>{
           //germ bounces back
           this.hurtShip(ship,germ)
           germ.disableBody(true,false)
           this.time.addEvent({  
            delay: 2000, 
            callback: ()=>{
                germ.enableBody();
            }, 
            callbackScope: this, 
            loop: true
        });
        })
        

    }
    hurtShip(ship, germ)
    {
       
        this.numHearts -= 1;
        var once = 0;
        
        console.log("d" + this.numHearts);
        if(this.numHearts == 2 && once!=1)
        {
            this.heart3.setFrame(4);
            once+=1;
        }
        if(this.numHearts == 1 && once!=1)
        {
            this.heart2.setFrame(4);
            once+=1;
        }
        if(this.numHearts == 0 && once!=1)
        {
            this.heart1.setFrame(4);
            once+=1;
            this.time.addEvent
            ({
                delay: 2000,
                callback: this.gameOver,
                callbackScope: this,
                loop: false
            });
        }
    
    }  
    spawnGerm() //make lots of them... rounds
    {

    }
    
    update(time: number, delta: number): void 
    {
        
        this.enemyFollows();
        var keys = this.input.keyboard.addKeys("W,A,S,D");
        this.ship.setVelocity(0);

        if (keys.A.isDown) 
        {
            this.ship.setVelocityX(-300);
        } 
        else if (keys.D.isDown) 
        {
            this.ship.setVelocityX(300);
        }

        if (keys.W.isDown) 
        {
            this.ship.setVelocityY(-300);
        } 
        else if (keys.S.isDown) 
        {
            this.ship.setVelocityY(300);
        }
      
    }
    enemyFollows () {
        this.physics.moveToObject(this.germ, this.ship, 100);
    }
    popUp(correctAnswer, incor1, incor2)
    {
        console.log('popup');
        var ui = this.add.sprite(200,150,"shipUI",0)
        ui.setScrollFactor(0,0).setDepth(10).setScale(2);

        this.ship.disableBody(true,false);
        var a = this.add.sprite(0,0,"redButton");
        a.setScale(2)
        

        var answers = [correctAnswer,incor1,incor2]
        var abcorder = ["",""];
        for(let i =2; i>=0; i--)
        {
            var take = Phaser.Math.Between(0,i);
            abcorder.push(answers[take]);
            answers.splice(take, 1); 
        }
        var aText = this.add.bitmapText(0, 0, "pixelFont", abcorder[2],15, 1);
        aText.setOrigin(0.5,0.5)
        console.log(aText);
        console.log(abcorder[2]);

        var container = this.add.container(160, 200, [ a, aText ]);
        container.setSize(50, 16);
        container.setScrollFactor(0,0).setDepth(15).setInteractive();
        this.input.setDraggable(container)

        this.input.on('drag', function (pointer, gameObject, dragX, dragY) {

            gameObject.x = Phaser.Math.Snap.To(dragX, 10);
            gameObject.y = Phaser.Math.Snap.To(dragY, 10);
            console.log(gameObject.x + " " + gameObject.y)
            if(gameObject.x == 230 && gameObject.y == 100)
            {
                console.log("answerd")
                //check if is correct answer
                if(container.getAt(1).text == correctAnswer)
                {
                    console.log("heal")
                }
                else
                {
                    console.log("exit the popup")
                }
            
            }
        });
    }
    gameOver()
    {
        var camera = this.cameras.main;
        camera.fadeOut(1000)
        this.time.addEvent({  
            delay: 2000, 
            callback: ()=>{
                this.scene.start("awardGame", {gameTitle: "MicroShip", earnedEvos: this.earnedEvos, numEvos: this.numEvos});
            }, 
            callbackScope: this, 
            loop: false
        });
        this.ship.disableBody(true,true);
    }
}
