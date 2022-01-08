import Phaser from 'phaser'

export default class Trivia extends Phaser.Scene
{
    private modeButtons?: Phaser.Physics.Arcade.Group;
    private mode!: string;
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
        this.evoText = this.add.bitmapText(100,10, "pixelFont", "Evos X 0", 40); //Add image later

        
        //Q&A Banks
        this.easyBank = 
        [
            ["?","A","B","C"],
            ["??","A","B","C"],
            ["??","A","B","C"]
        ];
        this.easyKey = 
        [
            [1],
            [2],
            [3]
        ]

        var mediumBank = 
        [
            ["?","A","B","C"],
            ["??","A","B","C"],
            ["??","A","B","C"]
        ];
        var mediumKey = 
        [
            [1],
            [2],
            [3]
        ]

        var hardBank = 
        [
            ["?","A","B","C"],
            ["??","A","B","C"],
            ["??","A","B","C"]
        ];
        var hardKey = 
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
    resetTimer()
    {
        this.initialTime = 60;
        if (this.timeLabel != null)
        {
            this.timeLabel.destroy(true);
        }
        this.timeLabel = this.add.bitmapText(300,7, "pixelFont", "Time: ",40);
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
    onCount()
    {
        this.initialTime -= 1;
        this.timeLabel.text = "Time: " + this.timeFormat(this.initialTime);
    }

    update(time: number, delta: number): void 
    {
    }

    
    newEasyQ()
    {
        //Resets UI, timer to 1 min, puts new question up 
        this.resetTimer();
        var questionNum = 0 //Phaser.Math.Between(0, 2);
        var question= this.add.bitmapText(300,100, "pixelFont", this.easyBank[questionNum][0],40);
        
        this.answerButtons = this.physics.add.group();
        this.A = this.answerButtons.create(200,200, "level_buttons");
        this.A.setInteractive().setScale();
        this.A.on('pointerout',  (pointer) => {
          //this.goEasy.setFrame(0);
        }, this);
        this.A.on('pointerup',  (pointer) => {
            if(Number(this.easyKey[questionNum]) == 1)
            {
                console.log("correct");
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

    calculateEvos() //If correct without learning
    {
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
    learningTime() //Better than getting 0 for incorrect
    {
        this.countDown.paused = true; 
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
    
    challengePopUp() //Popup, destroyed after selection
    {
        var text = this.add.bitmapText(10,80, "pixelFont","Select your challenge!", 50);
            //UI
        var r6 = this.add.rectangle(100, 400, 500, 300, 0xff66ff);
        this.tweens.add({

            targets: r6,
            angle: 90,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
    
        });

        this.modeButtons = this.physics.add.group();
        this.goEasy = this.modeButtons.create(100,50, "level_buttons");
        this.goEasy.setInteractive().setScale();
        this.goEasy.on('pointerout',  (pointer) => {
          //this.goEasy.setFrame(0);
        }, this);
        this.goEasy.on('pointerup',  (pointer) => {
            this.newEasyQ();
            text.destroy(true);
            r6.destroy(true);
            this.goEasy.destroy(true);
            this.goMedium.destroy(true);
            this.goHard.destroy(true);
            this.mode = "easy";
            return;
        }, this);

        this.goMedium = this.modeButtons.create(200,50, "level_buttons");
        this.goMedium.setInteractive().setScale();
        this.goMedium.on('pointerout',  (pointer) => {
          //this.goMedium.setFrame(0);
        }, this);
        this.goMedium.on('pointerup',  (pointer) => {
            this.newMediumQ();
            text.destroy(true);
            r6.destroy(true);
            this.goEasy.destroy(true);
            this.goMedium.destroy(true);
            this.goHard.destroy(true);
            this.mode = "medium";
            return;
        }, this);

        this.goHard = this.modeButtons.create(300,50, "level_buttons");
        this.goHard.setInteractive().setScale();
        this.goHard.on('pointerout',  (pointer) => {
          //this.goHard.setFrame(0);
        }, this);
        this.goHard.on('pointerup',  (pointer) => {
            this.newHardQ();
            text.destroy(true);
            r6.destroy(true);
            this.goEasy.destroy(true);
            this.goMedium.destroy(true);
            this.goHard.destroy(true);
            this.mode = "hard";
            return;
        }, this);
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
}
