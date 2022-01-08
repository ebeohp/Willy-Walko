import Phaser from 'phaser'

export default class Trivia extends Phaser.Scene
{
    private buttons?: Phaser.Physics.Arcade.Group;
    goEasy: any;
    goMedium: any;
    goHard: any;

    numEvos!: number;
    numCoins!: number;
    earnedCoins!: number;
    earnedEvos!: number;


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
        //Q&A Banks
        var easyBank = 
        [
            ["?","A","B","C"],
            ["??","A","B","C"],
            ["??","A","B","C"]
        ];
        var easyKey = 
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
        
        
        


        //If kid selects the end codon button
        //this.endPopUp();   
    }

    update(time: number, delta: number): void 
    {
    }

    challengePopUp() 
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

        this.buttons = this.physics.add.group();
        this.goEasy = this.buttons.create(100,50, "level_buttons");
        this.goEasy.setInteractive().setScale();
        this.goEasy.on('pointerout',  (pointer) => {
          //this.goEasy.setFrame(0);
        }, this);
        this.goEasy.on('pointerup',  (pointer) => {
            this.newEasyQ();
            text.destroy(true);
            this.goEasy.destroy(true);
            this.goMedium.destroy(true);
            this.goHard.destroy(true);
        }, this);

        this.goMedium = this.buttons.create(200,50, "level_buttons");
        this.goMedium.setInteractive().setScale();
        this.goMedium.on('pointerout',  (pointer) => {
          //this.goMedium.setFrame(0);
        }, this);
        this.goMedium.on('pointerup',  (pointer) => {
            this.newMediumQ();
            text.destroy(true);
            this.goEasy.destroy(true);
            this.goMedium.destroy(true);
            this.goHard.destroy(true);
        }, this);

        this.goHard = this.buttons.create(300,50, "level_buttons");
        this.goHard.setInteractive().setScale();
        this.goHard.on('pointerout',  (pointer) => {
          //this.goHard.setFrame(0);
        }, this);
        this.goHard.on('pointerup',  (pointer) => {
            this.newHardQ();
            text.destroy(true);
            this.goEasy.destroy(true);
            this.goMedium.destroy(true);
            this.goHard.destroy(true);
        }, this);
    }

    newEasyQ()
    {
        //Resets UI, timer to 1 min, puts new question up 
    }
    newMediumQ()
    {
        
    }
    newHardQ()
    {
        
    }
    resetTimer()
    {
        
    }

    endPopUp() //Determine number of evos and coins won
    {
        this.earnedEvos = 1;
        this.earnedCoins = 1;
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
