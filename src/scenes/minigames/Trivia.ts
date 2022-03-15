import Phaser from 'phaser'

export default class Trivia extends Phaser.Scene
{

    //make sure mark as incorrect when timer hits zero. also, destroy text and answer buttons
    private modeButtons?: Phaser.Physics.Arcade.Group;
    private mode!: string;
    private learning!: boolean;
    private goEasy: any;
    private goMedium: any;
    private goHard: any;

    numEvos!: number;
    numCoins!: number;
    private earnedCoins=0;
    private earnedEvos=0;
    
    private initialTime!: number;
    private timeLabel!: Phaser.GameObjects.BitmapText;
    private countDown!: Phaser.Time.TimerEvent;

    private answerButtons!: Phaser.Physics.Arcade.Group;
    private A!: any;

    private easyBank!: string[][];
    private easyKey!: number[][];
    private evoText!: Phaser.GameObjects.BitmapText;
    B: any;
    C: any;
    mediumBank!: string[][];
    mediumKey!: number[][];
    hardBank!: string[][];
    hardKey!: number[][];
    question!: Phaser.GameObjects.Text;
    answerC!: Phaser.GameObjects.Text;
    answerB!: Phaser.GameObjects.Text;
    answerA!: Phaser.GameObjects.Text;
    
    numCorrectE=0; //used only for bottle anims
    bottle!: Phaser.GameObjects.Sprite;
    mangoemote!: Phaser.GameObjects.Sprite;
    mangoEmote!: Phaser.GameObjects.Sprite;
    dancingMango: any;
    goggles!: Phaser.GameObjects.Sprite;


	constructor()
	{
		super('trivia')
	}

	init(data) //Gets initial num evos and coins from home
    {
        this.numEvos = data.evos;
        this.numCoins = data.coins;
    }

    create()
    {
        var xButton = this.add.sprite(380,20, "uiButtons", 2)
        xButton.setDepth(100);
        xButton.setInteractive();
        xButton.on('pointerup',  (pointer) => {
            this.scene.launch('quittingGame', {currentGameKey: 'trivia', earnedEvos: this.earnedEvos, numEvos: this.numEvos, gameTitle: "Chem Trivia"});
            this.scene.pause();
        }, this);
        var graphics = this.add.graphics();
        var outside = graphics.fillGradientStyle(0x2a0078, 0x2a0078,0x871fa1, 0x871fa1,  1);
        graphics.fillRect(0, 0, 400, 300);

       
        
        var balls = this.physics.add.group({
            key: 'ball',
            quantity: 24,
            bounceX: 1,
            bounceY: 1,
            collideWorldBounds: true,
            velocityX: 80,
            velocityY: 80
        });

        Phaser.Actions.RandomRectangle(balls.getChildren(), this.physics.world.bounds);
        balls.children.iterate(function (ball) {
            ball.setScale(0.5);
        });
        this.physics.add.collider(balls);



        this.evoText = this.add.bitmapText(70,50, "pixelFont", "Evos X 0", 20); //Add image later

        //Q&A Banks
        this.easyBank = 
        [
            ["What is the chemical name for water?","Dihydrogen Monoxide","Liquid","Carbon Dioxide"],
            ["Where are the protons located in the atom?","Nucleus","Electron Cloud","Lala Land"],
            ["How are atoms in a molecule held together?","Bonds", "Glue","Magnets"],
            ["What is room temperature?","22 Degrees Celcius","70 Degrees Fahrenheit","Air Conditioning"],
            ["What is the atomic number of nitrogen?","Seven","Two Thousand","One"],
            ["What is the name of the first noble gas?","Hydrogen","Prince H","Oyxgen"],
            ["What is the only metal liquid at room temperature?","Mercury","Water","Gold"],
            ["When you drink milk, you are drinking plenty of…?","Calcium","Gold","Strong bones"],
            ["The amount of space a liquid takes up is called what?","Volume","Chicken Nuggets","Mass"],
            ["Which commonly used liquid has a pH of 7?","Water","Orange Juice","Milk"],
            ["What are electrically charged atoms called?","Ions","Electrons","Quarks"]
        ];
        this.easyKey = 
        [
            [1],
            [1],
            [1],
            [1],
            [1],
            [1],
            [1],
            [1]
        ]

        this.mediumBank = 
        [
            ["What is the symbol of the strongest acid, containing H?","HCl","Helium Acid","HF"],
            ["How are compounds that contain Carbon, Hydrogen, and Oxygen classified?","Organic Compounds","Natural Compounds","Prison Compounds"],
            ["In a closed system...?","Only energy can move about","Nothing can leave or enter","Only matter can move about"],
            ["To neutralize an acid, you add…?", "Water to Acid", "Acid to Water", "Acid to the trashcan"]
        ];
        this.mediumKey = 
        [
            [1],
            [1],
            [1]
        ]

        this.hardBank = 
        [
            ["?","A","B","C"],
            ["??","A","B","C"],
            ["???","A","B","C"]
        ];
        this.hardKey = 
        [
            [1],
            [2],
            [3]
        ]
        //Select bank 
        this.challengePopUp();        


        this.initialTime = 60;
        


        //If kid selects the end codon button
        //this.endPopUp();   
    }
    challengePopUp() //Popup, destroyed after selection
    {
      
        //UI note have some curtains for select your challenge
        var r6 = this.add.rectangle(200, 150, 400, 300, 0x2a0078); //BG Color
        var text = this.add.bitmapText(110,50, "pixelFont","Select your challenge!", 25);
        var curtains1 = this.add.rectangle(0,120,100,400, 0xae57ff);
        curtains1.setDepth(10).angle = 15;
        var curtains2 = this.add.rectangle(400,120,100,400, 0xae57ff);
        curtains2.setDepth(10).angle = -15;
        var spotlight = this.add.ellipse(200, 240, 200, 60 ,0x5d118c);
        var rectangle = this.add.rectangle(200,110, 400,80, 0x2d004a);
        
        var willy = this.add.sprite(200,200, "willy",0).setScale(2)//delete after
        var talkingMango = this.add.sprite(100,160,"talkingMango",0)
        talkingMango.anims.play('talkingMango_anim')
        talkingMango.setScale(2).flipX = true;

        var deleteArray = [r6, text, curtains1, curtains2, spotlight, rectangle, willy, talkingMango]



        this.modeButtons = this.physics.add.group();
        this.goEasy = this.modeButtons.create(100,100, "easyLvl");
        this.tweens.add({
            targets: this.goEasy,
            y: 90,
            duration: 500,
            ease: 'Sine.easeOut',
            repeat: -1,
            yoyo: true
            
        });
        this.goEasy.setInteractive().setScale();
        this.goEasy.on('pointerup',  (pointer) => {
            this.newEasyQ();

            for(let i = 0; i<deleteArray.length; i++)
            {
                deleteArray[i].destroy(true);
            }
            this.goEasy.destroy(true);
            this.goMedium.destroy(true);
            this.goHard.destroy(true);
            this.mode = "easy";
            return;
        }, this);

        this.goMedium = this.modeButtons.create(200,100, "midLvl");
        this.tweens.add({
            targets: this.goMedium,
            y: 90,
            duration: 400,
            ease: 'Sine.easeOut',
            repeat: -1,
            yoyo: true
            
        });
        this.goMedium.setInteractive().setScale();
        this.goMedium.on('pointerup',  (pointer) => {
            this.newMediumQ();
            for(let i = 0; i<deleteArray.length; i++)
            {
                deleteArray[i].destroy(true);
            }
            this.goEasy.destroy(true);
            this.goMedium.destroy(true);
            this.goHard.destroy(true);
            this.mode = "medium";
            return;
        }, this);

        this.goHard = this.modeButtons.create(300,100, "hardLvl");
        this.tweens.add({
            targets: this.goHard,
            y: 90,
            duration: 1000,
            ease: 'Elastic',
            repeat: -1,
            yoyo: true
            
        });
        this.goHard.setInteractive().setScale();
        this.goHard.on('pointerup',  (pointer) => {
            this.newHardQ();
            for(let i = 0; i<deleteArray.length; i++)
            {
                deleteArray[i].destroy(true);
            }
            this.goEasy.destroy(true);
            this.goMedium.destroy(true);
            this.goHard.destroy(true);
            this.mode = "hard";
            return;
        }, this);
    }



    resetTimer()
    {
        this.initialTime = 60;
        if (this.timeLabel != null)
        {
            this.timeLabel.destroy(true);
            this.countDown.destroy();
            this.bottle.destroy();
            this.question.destroy();
            this.answerA.destroy();
            this.answerB.destroy();
            this.answerC.destroy();
            this.mangoEmote.destroy();
            this.dancingMango.destroy();
            this.A.destroy();
            this.B.destroy();
            this.C.destroy();
            //Also destroy the texts for A B and C after you add them!
        }
        
        this.timeLabel = this.add.bitmapText(260,90, "pixelFont", "Time: ",20);
        this.timeLabel.setDepth(1)
        this.timeLabel.text = "Time: " + this.timeFormat(this.initialTime);
        this.countDown = this.time.addEvent
        ({
            delay:1000,
            callback: this.onCount,
            callbackScope: this,
            loop: true
        });
    }
    timeFormat(seconds)
    {
        var minutes = Math.floor(seconds/60);
        var partInSeconds = seconds%60;
        partInSeconds = partInSeconds.toString().padStart(2,"0");
        return `${minutes}:${partInSeconds}`;
    }
    onCount() //Decrements by 1 every second. If hits 30, offer learning button.
    {
        this.initialTime -= 1;
        this.timeLabel.text = "Time: " + this.timeFormat(this.initialTime);
        if(this.initialTime==30)
        {
            //offer learning time button. if selected, goes to learning time and timer is paused
            var r1 = this.add.rectangle(400, 400, 32, 32, 0xff22ff);
            r1.setInteractive();

            r1.on('pointerout',  (pointer) => {
                //this.goEasy.setFrame(0);
            }, this);
            r1.on('pointerup',  (pointer) => {
                this.learningTime();
            }, this);
            
        }
        if(this.initialTime == 0)
        {
            this.time.addEvent
                ({
                    delay: 2000,
                    callback: this.endPopUp,
                    callbackScope: this,
                    loop: false,
                    
                });
        }
    }

    
    
    newEasyQ()
    {
        //Resets UI, timer to 1 min, puts new question up 
        this.resetTimer();
        
        this.bottle = this.add.sprite(100,150,'bigBottle',this.numCorrectE)
        this.bottle.setScale(2)
        this.mangoEmote = this.add.sprite(100,400,'mangoEmote',Phaser.Math.Between(0,2))
        this.mangoEmote.setScale(6)
        this.goggles = this.add.sprite(300,100,"goggles",0)
        this.dancingMango = this.add.sprite(100, 250, "dancingMango", 0)
        this.dancingMango.anims.play("dancingMango_anim");


        var questionNum = Phaser.Math.Between(0, 7);
        this.question= this.add.text(230,30, this.easyBank[questionNum][0], { font: '12px Arial', color: '#ffffff', align: 'center', wordWrap: { width: 150 } });
        this.answerButtons = this.physics.add.group();

        this.A = this.answerButtons.create(300,150, "answerButton",0);
        this.answerA = this.add.text(250,140, this.easyBank[questionNum][1], { fontSize: '12px', font: 'Arial', color: '#ffffff', align: 'center', wordWrap: { width: 150 } });
        this.A.setInteractive().setScale(1.5);
        this.A.on('pointerup',  (pointer) => {
            if(Number(this.easyKey[questionNum]) == 1)
            {   
                this.numCorrectE+=1
                if(this.numCorrectE==4) //celebrate!
                {
                    this.tweens.add({
                        targets: this.mangoEmote,
                        y: 220,
                        duration: 1000,
                        ease: 'Sine.easeOut',
                        repeat: 0,
                        yoyo: true,
                        onComplete: () =>
                        {
                            this.numCorrectE = 0
                        }
                        
                    });
                }
                console.log("correct");
                this.A.setFrame(1);
                this.bottle.setFrame(this.numCorrectE)
                this.calculateEvos();
                this.time.addEvent
                ({
                    delay: 3000,
                    callback: this.newEasyQ,
                    callbackScope: this,
                    loop: false,
                    
                });
            }
            else
            {
                console.log("wrong! RED"); 
                this.A.setFrame(2)
                this.time.addEvent
                ({
                    delay: 3000,
                    callback: this.newEasyQ,
                    callbackScope: this,
                    loop: false
                });
            }

        }, this);
        this.B = this.answerButtons.create(300,200, "answerButton",0);
        this.answerB = this.add.text(250,190, this.easyBank[questionNum][2], { font: 'Arial', color: '#ffffff', align: 'center', wordWrap: { width: 200 } });
        this.B.setInteractive().setScale(1.5);
        this.B.on('pointerup',  (pointer) => {
            if(Number(this.easyKey[questionNum]) == 2)
            {
                console.log("correct");
                this.B.setFrame(1);
                this.calculateEvos();
                this.time.addEvent
                ({
                    delay: 2000,
                    callback: this.newEasyQ,
                    callbackScope: this,
                    loop: false,
                    
                });
            }
            else
            {
                console.log("wrong! RED"); 
                this.B.setFrame(2)
                this.time.addEvent
                ({
                    delay: 2000,
                    callback: this.newEasyQ,
                    callbackScope: this,
                    loop: false
                });
            }

        }, this);
        this.C = this.answerButtons.create(300,250, "answerButton",0);
        this.answerC = this.add.text(250,240, this.easyBank[questionNum][3], { font: 'Arial', color: '#ffffff', align: 'center', wordWrap: { width: 200 } });
        this.C.setInteractive().setScale(1.5);
        this.C.on('pointerup',  (pointer) => {
            if(Number(this.easyKey[questionNum]) == 3)
            {
                console.log("correct");
                this.C.setFrame(1);
                this.calculateEvos();
                this.time.addEvent
                ({
                    delay: 2000,
                    callback: this.newEasyQ,
                    callbackScope: this,
                    loop: false,
                    
                });
            }
            else
            {
                console.log("wrong! RED"); 
                this.C.setFrame(2)
                this.time.addEvent
                ({
                    delay: 2000,
                    callback: this.newEasyQ,
                    callbackScope: this,
                    loop: false
                });
            }

        }, this);
        
    }
    newMediumQ()
    {
    }
    newHardQ()
    {
    }

    learningTime() 
    {
        this.countDown.paused = true;
        this.learning = true;

        //give reccomendations to resources
        
    }

    calculateEvos() //If correct 
    {
        
        
        if(this.learning == true)
        {
            if(this.mode == "easy")
            {
                this.earnedEvos+=2;
            }
            else if (this.mode == "medium")
            {
                this.earnedEvos+=10;
            }
            else if (this.mode == "hard")
            {
                this.earnedEvos+=40;
            }
        }
        
        this.countDown.paused = true;

        
        if(this.initialTime >= 50 && this.initialTime <= 60)
        {
            if(this.mode == "easy")
            {
                
                this.earnedEvos+=5;
                this.evoText.text = "Evos X " + this.earnedEvos;
            }
            else if (this.mode == "medium")
            {
                this.earnedEvos+=30;
                this.evoText.text = "Evos X " + this.earnedEvos;
            }
            else if (this.mode == "hard")
            {
                this.earnedEvos+=100;
                this.evoText.text = "Evos X " + this.earnedEvos;
            }
        }
        else if(this.initialTime >=30 && this.initialTime<50) 
        {
            if(this.mode == "easy")
            {
                this.earnedEvos+=4;
                this.evoText.text = "Evos X " + this.earnedEvos;
            }
            else if (this.mode == "medium")
            {
                this.earnedEvos+= 20;
                this.evoText.text = "Evos X " + this.earnedEvos;
            }
            else if (this.mode == "hard")
            {
                this.earnedEvos+=90;
                this.evoText.text = "Evos X " + this.earnedEvos;
            }
        }
        else if(this.initialTime >= 10 && this.initialTime < 30)
        {
            if(this.mode == "easy")
            {
                this.earnedEvos+=3;
                this.evoText.text = "Evos X " + this.earnedEvos;
            }
            else if (this.mode == "medium")
            {
                this.earnedEvos+=15;
                this.evoText.text = "Evos X " + this.earnedEvos;
            }
            else if (this.mode == "hard")
            {
                this.earnedEvos+=70;
                this.evoText.text = "Evos X " + this.earnedEvos;
            }
        }
        else if(this.initialTime>0 && this.initialTime < 10)
        {
            if(this.mode == "easy")
            {
                this.earnedEvos+=3;
                this.evoText.text = "Evos X " + this.earnedEvos;
            }
            else if (this.mode == "medium")
            {
                this.earnedEvos+=15;
                this.evoText.text = "Evos X " + this.earnedEvos;
            }
            else if (this.mode == "hard")
            {
                this.earnedEvos+=50;
                this.evoText.text = "Evos X " + this.earnedEvos;
            }

        }

    }
    
    
    
}
