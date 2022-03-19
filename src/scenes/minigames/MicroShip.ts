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
    targetXY!: Phaser.Math.Vector2;
    pointer!: Phaser.Input.Pointer[];
    keys!: object;
    organelleTexts!: string[];
    numHearts = 3;
    heartGroup?: Phaser.Physics.Arcade.Group;
    heart1: any;
    heart2: any;
    heart3: any;
    germGroup?: Phaser.Physics.Arcade.Group;
    projectiles: GameObject | Group | GameObject[] | Group[];
    spacebar!: Phaser.Input.Keyboard.Key;
    popUpOn = false;
    organelleHealth: any;
    mitoBar: Phaser.GameObjects.Sprite;
    erBar: Phaser.GameObjects.Sprite;
    golgiBar: Phaser.GameObjects.Sprite;
    vacuoleBar: Phaser.GameObjects.Sprite;
    lysoBar: Phaser.GameObjects.Sprite;
    riboBar: Phaser.GameObjects.Sprite;
    healthBars: Phaser.GameObjects.Sprite[];
    ui: any;
    exit: any;
    the: any;
    fillIn: any;
    containerA: any;
    containerC: any;
    containerB: any;

    
    
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
       this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
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
        this.add.rectangle(-200,-150,1000,600,0x000000)
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
        this.myCam.setBounds(-500,-500, 1000, 1000);
        //this.myCam.setViewport(0,0,400,300);
        
       
        this.input.on('pointermove',  (pointer) => 
        {
            let mouse = pointer
            var angle = Phaser.Math.Angle.Between(this.ship.x, this.ship.y, mouse.x + this.cameras.main.scrollX, mouse.y + this.cameras.main.scrollY)            
            this.ship.rotation=angle+90; //fix later
        }, this);
        
        this.projectiles = this.physics.add.group()

        this.input.on('pointerup',  (pointer) => 
        {
            //this.shootBeam()
            if(this.popUpOn == false)
            {
                console.log('shoot!');
            
                var beam = this.projectiles.create(this.ship.x, this.ship.y, "bullet");
                var angle = Phaser.Math.Angle.Between(this.ship.x, this.ship.y, pointer.x + this.cameras.main.scrollX, pointer.y + this.cameras.main.scrollY)            
            
                this.physics.velocityFromRotation(angle, 600, beam.body.velocity);
            }
            
        }, this);

        //bit boring, add some tweening/floaty effect
        this.mito = this.physics.add.sprite(250,-250,'mito',0).setImmovable();      
        this.mitoBar = this.add.sprite(250,-260, "lives",0)
        this.er = this.physics.add.sprite(230,0,'er',0).setImmovable(); 
        this.erBar = this.add.sprite(230,-10, "lives",0)
        this.er.angle = 90
        this.er.body.setSize(64,140)
        this.golgi = this.physics.add.sprite(-180,-300,'golgi',0).setImmovable();
        this.golgiBar = this.add.sprite(-180,-310, "lives",0)
        this.golgi.angle = -20;
        this.vacuole = this.physics.add.sprite(-300, 200,'vacuole',0).setImmovable();
        this.vacuoleBar = this.add.sprite(-300,-210, "lives",0)
        this.lyso = this.physics.add.sprite(380,-50,'lyso',0).setImmovable();
        this.lysoBar = this.add.sprite(380,-60, "lives",0)
        this.ribo = this.physics.add.sprite(50, 280,'ribo',0).setImmovable();
        this.riboBar = this.add.sprite(50,270, "lives",0)

        this.organelleArray = [this.mito, this.er, this.golgi, this.vacuole, this.lyso, this.ribo];
        this.organelleHealth = [3,3,3,3,3,3]
        this.healthBars = [this.mitoBar, this.erBar, this.golgiBar, this.vacuoleBar, this.lysoBar, this.riboBar];
        
        
        
        
        
        this.organelleTexts =  ["mitochondria",
                                "endoplasmic\nreticulum", 
                                "golgi\napparatus", 
                                "vacuole", 
                                "lysosome", 
                                "ribosome"];
        
        this.physics.add.overlap(this.mito,this.ship, ()=>{
            if(Phaser.Input.Keyboard.JustDown(this.spacebar))
            {
                var incorrect1 = Phaser.Math.Between(1,5);
                var incorrect2 = Phaser.Math.Between(1,5);
    
                while(incorrect2 == incorrect1)
                {
                    incorrect2= Phaser.Math.Between(1,5);
                }
                console.log("first " + incorrect1 + " " + incorrect2)
                
                this.popUp("mitochondria", this.organelleTexts[incorrect1], this.organelleTexts[incorrect2], 0);
            
            }
        })
        this.physics.add.overlap(this.er,this.ship, ()=>{
            if(Phaser.Input.Keyboard.JustDown(this.spacebar))
            {
                const incorrectChoices = [0,2,3,4,5];
                var incorrect1 = Phaser.Math.RND.pick(incorrectChoices);
                var incorrect2 = Phaser.Math.RND.pick(incorrectChoices);
    
                while(incorrect2 == incorrect1)
                {
                    incorrect2= Phaser.Math.RND.pick(incorrectChoices);
                }
                console.log("first " + incorrect1 + " " + incorrect2)
                
                this.popUp("endoplasmic\nreticulum", this.organelleTexts[incorrect1], this.organelleTexts[incorrect2], 1);
            
            }
        })
        this.physics.add.overlap(this.golgi,this.ship, ()=>{
            if(Phaser.Input.Keyboard.JustDown(this.spacebar))
            {
                const incorrectChoices = [0,1,3,4,5];
                var incorrect1 = Phaser.Math.RND.pick(incorrectChoices);
                var incorrect2 = Phaser.Math.RND.pick(incorrectChoices);
    
                while(incorrect2 == incorrect1)
                {
                    incorrect2= Phaser.Math.RND.pick(incorrectChoices);
                }
                console.log("first " + incorrect1 + " " + incorrect2)
                
                this.popUp("golgi\napparatus", this.organelleTexts[incorrect1], this.organelleTexts[incorrect2], 2);
            
            }
        })
        this.physics.add.overlap(this.vacuole,this.ship, ()=>{
            if(Phaser.Input.Keyboard.JustDown(this.spacebar))
            {
                const incorrectChoices = [0,1,2,4,5];
                var incorrect1 = Phaser.Math.RND.pick(incorrectChoices);
                var incorrect2 = Phaser.Math.RND.pick(incorrectChoices);
    
                while(incorrect2 == incorrect1)
                {
                    incorrect2= Phaser.Math.RND.pick(incorrectChoices);
                }
                console.log("first " + incorrect1 + " " + incorrect2)
                
                this.popUp("vacuole", this.organelleTexts[incorrect1], this.organelleTexts[incorrect2], 3);
            
            }
        })
        this.physics.add.overlap(this.lyso,this.ship, ()=>{
            if(Phaser.Input.Keyboard.JustDown(this.spacebar))
            {
                const incorrectChoices = [0,1,2,3,5];
                var incorrect1 = Phaser.Math.RND.pick(incorrectChoices);
                var incorrect2 = Phaser.Math.RND.pick(incorrectChoices);
    
                while(incorrect2 == incorrect1)
                {
                    incorrect2= Phaser.Math.RND.pick(incorrectChoices);
                }
                console.log("first " + incorrect1 + " " + incorrect2)
                
                this.popUp("lysosome", this.organelleTexts[incorrect1], this.organelleTexts[incorrect2], 4);
            
            }
        })
        this.physics.add.overlap(this.ribo,this.ship, ()=>{
            if(Phaser.Input.Keyboard.JustDown(this.spacebar))
            {
                const incorrectChoices = [0,1,2,3,4];
                var incorrect1 = Phaser.Math.RND.pick(incorrectChoices);
                var incorrect2 = Phaser.Math.RND.pick(incorrectChoices);
    
                while(incorrect2 == incorrect1)
                {
                    incorrect2= Phaser.Math.RND.pick(incorrectChoices);
                }
                console.log("first " + incorrect1 + " " + incorrect2)
                
                this.popUp("ribosome", this.organelleTexts[incorrect1], this.organelleTexts[incorrect2], 5);
            
            }
        })
        



        //Decoration change depth soon
        var dec1 = this.add.sprite(-280,-100,'mito',0);
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
        this.germ = this.germGroup.create(0,0,"enemy").setPushable().setBounce(0.5); 
    
        this.germ.setBounce(1);
        this.physics.add.collider(this.projectiles, this.germGroup, (bullet, germ)=>{
            console.log("ded germ") //issue fix later
            
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
        });
        this.physics.add.collider(this.golgi, this.germGroup,(organelle, germ)=>{
            //set this organelle's health bar

            var ogPosX = germ.x;
            var ogPosY = germ.y;
            germ.disableBody(true,false)

            this.tweens.add({
                targets: germ,
                x: organelle.x;
                y: organelle.y;
                duration: 1000, 
                ease: 'Linear',
                repeat: 0,
                yoyo:true,
                onComplete: () =>
                {
                    germ.enableBody();
                }
                
            });
            this.organelleDamage(0);
            console.log(this.organelleArray[0] + " is hit")
        });
        

    }
    hurtShip(ship, germ)
    {
       
        this.numHearts -= 1;
        var once = 0;
        
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
    organelleDamage(organelleNum)
    {
        this.organelleHealth[organelleNum] -= 1; 
        var once = 0;
        
        if(this.organelleHealth[organelleNum] == 2 && once!=1)
        {
            this.healthBars[organelleNum].setFrame(1);
            once+=1;
        }
        if(this.organelleHealth[organelleNum] == 1 && once!=1)
        {
            this.organelleArray[organelleNum].setFrame(1);
            this.healthBars[organelleNum].setFrame(2);
            once+=1;
        }
        
    }
    organelleHeal(orgNum)
    {   
        this.organelleHealth[orgNum] = 3;
        this.organelleArray[orgNum].setFrame(0);
        this.healthBars[orgNum].setFrame(0);
    }
    spawnGermHorde() //make lots of them... rounds
    {
        var hordeSize = Phaser.Math.Between(3,8);

    }
    enemyFollows () {
        
        this.physics.moveToObject(this.germ, this.golgi, 100);
        
    }
    
    update(time: number, delta: number): void 
    {
        
        this.enemyFollows(); //later, loop call this using a timer event
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
    
    popUp(correctAnswer, incor1, incor2, orgNum)
    {
        this.popUpOn = true; 
        this.ui = this.add.sprite(200,150,"shipUI",0)
        this.ui.setScrollFactor(0,0).setDepth(10).setScale(2);
        this.exit = this.physics.add.image(315,65,"redexitui")
        this.exit.setScrollFactor(0,0).setDepth(12).setInteractive();
        this.exit.on('pointerup',  (pointer) => {
            this.ui.destroy();
            this.exit.destroy();
            this.the.destroy();
            this.fillIn.destroy();
            this.containerA.destroy();
            this.containerB.destroy();
            this.containerC.destroy();
            this.popUpOn = false;
        }, this);


        this.the = this.add.bitmapText(140,95, "pixelFont","The",16)
        this.the.setScrollFactor(0,0).setDepth(12);
        const orgFunctions=["is the powerhouse of the cell", 
                            "is involved in the creation,\ntransportation, and storage of\nlipids and proteins",
                            "is the packaging center\nof the cell",
                            "stores food, water, and nutrients",
                            "breaks down food and\ncell waste materials",
                            "produces proteins"];

        this.fillIn = this.add.bitmapText(200,140,"pixelFont", orgFunctions[orgNum],15,1)
        this.fillIn.setOrigin(0.5,0.5).setScrollFactor(0,0).setDepth(12);

        //this.ship.disableBody(true,false);//has to disable input as well. but allow damage 
        
        var a = this.add.sprite(0,0,"redButton").setScale(2);
        var b = this.add.sprite(0,0,"redButton").setScale(2);
        var c = this.add.sprite(0,0,"redButton").setScale(2);
        
        

        const answers = [correctAnswer,incor1,incor2]
        console.log(correctAnswer + " " + incor1 + " " +incor2)
        const abcorder = [];
        for(let i =2; i>=0; i--)
        {
            var take = Phaser.Math.Between(0,i);
            abcorder.push(answers[take]);
            answers.splice(take, 1); 
        }

        var aText = this.add.bitmapText(0, 0, "pixelFont", abcorder[0],15, 1);
        aText.setOrigin(0.5,0.5)
        this.containerA = this.add.container(140, 200, [ a, aText ]);
        this.containerA.setSize(50, 16);
        this.containerA.setScrollFactor(0,0).setDepth(15).setInteractive();
        this.input.setDraggable(this.containerA)

        var bText = this.add.bitmapText(0, 0, "pixelFont", abcorder[1],15, 1);
        bText.setOrigin(0.5,0.5)
        this.containerB = this.add.container(260, 200, [ b, bText ]);
        this.containerB.setSize(50, 16);
        this.containerB.setScrollFactor(0,0).setDepth(15).setInteractive();
        this.input.setDraggable(this.containerB)

        var cText = this.add.bitmapText(0, 0, "pixelFont", abcorder[2],15, 1);
        cText.setOrigin(0.5,0.5)
        this.containerC = this.add.container(200, 230, [ c, cText ]);
        this.containerC.setSize(50, 16);
        this.containerC.setScrollFactor(0,0).setDepth(15).setInteractive();
        this.input.setDraggable(this.containerC)

        this.input.on('drag', (pointer, gameObject, dragX, dragY)=> {

            gameObject.x = Phaser.Math.Snap.To(dragX, 10);
            gameObject.y = Phaser.Math.Snap.To(dragY, 10);
            console.log(gameObject.x + " " + gameObject.y)
            if(gameObject.x == 230 && gameObject.y == 100)
            {
                console.log("answerd")
                //check if is correct answer
                if(gameObject.getAt(1).text == correctAnswer)
                {
                    this.time.addEvent({  
                        delay: 800, 
                        callback: () =>{
                            this.organelleHeal(orgNum);
                            this.ui.destroy();
                            this.exit.destroy();
                            this.the.destroy();
                            this.fillIn.destroy();
                            this.containerA.destroy();
                            this.containerB.destroy();
                            this.containerC.destroy();
                            this.popUpOn = false;
                        }, 
                        callbackScope: this, 
                        loop: false
                    });
                    
                    
                }
                else
                {
                    this.time.addEvent({  
                        delay: 800, 
                        callback: () =>{
                            this.ui.destroy();
                            this.exit.destroy();
                            this.the.destroy();
                            this.fillIn.destroy();
                            this.containerA.destroy();
                            this.containerB.destroy();
                            this.containerC.destroy();
                            this.popUpOn = false;
                        }, 
                        callbackScope: this, 
                        loop: false
                    });
                }
            
            }
        });

    }
    destroyer(array)
    {
        this.popUpOn = false;
        for(let i = 0; i < array.length; i++)
        {
            array[i].destroy();
        }
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
