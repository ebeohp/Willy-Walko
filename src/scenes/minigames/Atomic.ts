import Phaser from 'phaser'

export default class Atomic extends Phaser.Scene
{
    numEvos!: number;
    numCoins!: number;
    earnedCoins=0;
    earnedEvos=0;

    private initialTime!: number;
    private timeLabel!: Phaser.GameObjects.BitmapText;
    private countDown!: Phaser.Time.TimerEvent;
    private elementArray!: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody[];

    currentElement= 0; //starting with hydrogen
    private element1!: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
    private element2!: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
    private element3!: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
    private element4!: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
    private element5!: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
    private element6!: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
    private element7!: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
    private element8!: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
    private element9!: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
    private element10!: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
    private element11!: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
    private element12!: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
    private element13!: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
    private element14!: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
    private element15!: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
    private element16!: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
    private element17!: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
    private element18!: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
    cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
    dartFly = false;
    dart!: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
    spacebar!: Phaser.Input.Keyboard.Key;
    triggerGroup!: Phaser.Physics.Arcade.Group;
    bohrGroup!: any;

    
	constructor()
	{
		super('atomic')
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

    create() //block out bg with graphics. do as little art as possible
    {
        var graphics = this.add.graphics();
        var background = graphics.fillGradientStyle(0xa1542d, 0xa1542d,0xa1542d, 0xa1542d,  1);
        graphics.fillRect(0, 0, 400, 300);
        var inside = graphics.fillGradientStyle(0x7a4825, 0x7a4825,0x7a4825, 0x7a4825,  1);
        graphics.fillRect(0, 10, 290, 260);
        var rightPlank = graphics.fillGradientStyle(0xab672c, 0xab672c,0xab672c, 0xab672c,  1);
        graphics.fillRect(295, 0, 110, 300);
        

        this.dart = this.physics.add.sprite(200,280,"dart")
        this.dart.setScale(1.5)
        this.dart.setCollideWorldBounds(true); // collide with right plank later.
        this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        this.element1 = this.physics.add.sprite(350,80, "elements", 0)
        this.element1.setScale(0.2)
        this.element2 = this.physics.add.sprite(350,80, "elements", 1)
        this.element2.setScale(0.2)
        this.element3 = this.physics.add.sprite(350,80, "elements", 2)
        this.element3.setScale(0.2)
        this.element4 = this.physics.add.sprite(350,80, "elements", 3)
        this.element4.setScale(0.2)
        this.element5 = this.physics.add.sprite(350,80, "elements", 4)
        this.element5.setScale(0.2)
        this.element6 = this.physics.add.sprite(350,80, "elements", 5)
        this.element6.setScale(0.2)
        this.element7 = this.physics.add.sprite(350,80, "elements", 6)
        this.element7.setScale(0.2)
        this.element8 = this.physics.add.sprite(350,80, "elements", 7)
        this.element8.setScale(0.2)
        this.element9 = this.physics.add.sprite(350,80, "elements", 8)
        this.element9.setScale(0.2)
        this.element10 = this.physics.add.sprite(350,80, "elements", 9)
        this.element10.setScale(0.2)
        this.element11 = this.physics.add.sprite(350,80, "elements", 10)
        this.element11.setScale(0.2)
        this.element12 = this.physics.add.sprite(350,80, "elements", 11)
        this.element12.setScale(0.2)
        this.element13 = this.physics.add.sprite(350,80, "elements", 12)
        this.element13.setScale(0.2)
        this.element14 = this.physics.add.sprite(350,80, "elements", 13)
        this.element14.setScale(0.2)
        this.element15 = this.physics.add.sprite(350,80, "elements", 14)
        this.element15.setScale(0.2)
        this.element16 = this.physics.add.sprite(350,80, "elements", 15)
        this.element16.setScale(0.2)
        this.element17 = this.physics.add.sprite(350,80, "elements", 16)
        this.element17.setScale(0.2)
        this.element18 = this.physics.add.sprite(350,80, "elements", 17)
        this.element18.setScale(0.2)

        this.elementArray = [this.element1, this.element2, this.element3,this.element4,this.element5,this.element6,this.element7,this.element8,this.element9,this.element10,this.element11,this.element12,this.element13,this.element14,this.element15,this.element16,this.element17,this.element18];


        this.resetTimer();
        this.time.addEvent({  //45 seconds
            delay: 45000, 
            callback: this.resetTimer, 
            callbackScope: this, 
            loop: true
        });


        this.bohrGroup= this.physics.add.group();
        this.physics.add.overlap(this.dart, this.bohrGroup, this.hitBohr)
        this.time.addEvent({ //every call, new element in row appears
            delay: 1000, 
            callback: this.bohrChoices, 
            args: [50],
            callbackScope: this, 
            loop: true
        });
        this.time.addEvent({ //second row
            delay: 1500, 
            callback: this.bohrChoices, 
            args:[150],
            callbackScope: this, 
            loop: true
        });
        this.triggerGroup = this.physics.add.group();
        this.physics.add.collider(this.dart, this.triggerGroup, this.hitCorrectBohr)

        /*
            each time timer ends, destroy current element and timer and replace.
            how to know current element?
            -global variable containing number for current element
        */

            
    }

    update(time: number, delta: number): void 
    {
        this.dartMovementManager();
        if(this.dart.y <20)
        {
            this.dartRespawn();
        }
       
    }
    dartMovementManager()
    {
        if(!this.cursors || !this.dart)
        {
            return;
        }
        const speed = 400;
        if(this.cursors.left?.isDown && this.dartFly == false)
        {
            this.dart.setVelocity(-speed, 0);
        }
        else if(this.cursors.right?.isDown && this.dartFly == false)
        {
            this.dart.setVelocity(speed, 0);
        }
        else
        {
            this.dart.setVelocity(0,0);
        }
        if(Phaser.Input.Keyboard.JustDown(this.spacebar) && this.dartFly == false)
        {
            this.shootDart();
        }
    }
    shootDart() //limited amount of darts per round?
    {
        this.dartFly = true;
        this.tweens.add({
            targets: this.dart,
            y: 10,
            ease: "Linear",
            duration: 500,
            repeat: 0
        })
        
    }
    hitBohr(dart, bohrModel) // hit any bohr, deletes it
    {
        console.log("hit")
        bohrModel.destroy();
    }
    hitCorrectBohr(dart, trigger) // hit correct bohr, coutns for points
    {
        console.log("correct!")
        trigger.destroy();
        this.earnedEvos+=10;

    }
    dartRespawn() // when hit back or when hit target
    {
        this.dartFly = false;
        this.dart.x=200;
        this.dart.y = 280;
    }
    bohrChoices(row) //higher chance of current element
    {   
        var randomBohr = Phaser.Math.Between(0, 25);
        
        if(randomBohr == this.currentElement || randomBohr > 17)
        {
            var correctBohr = this.bohrGroup.create(300,row,"bohrtargets",this.currentElement)
            var trigger = this.triggerGroup.create(300,row,"trigger")
            trigger.setScale(.25).setVelocityX(-100)
            correctBohr.setVelocityX(-100);
            correctBohr.setScale(2)
        }
        else
        {
            var bohr = this.bohrGroup.create(300,row, "bohrtargets", randomBohr)
            bohr.setVelocityX(-100);
            bohr.setScale(2)
        }

        /*
        is random index and spawn w velocityX until timer stops
        -if a choice.x<0 destroy it
        -set collider with choice and dart
        */

    }
    resetTimer() //reset timer and put up new element
    {
        this.initialTime = 45;
        if (this.timeLabel != null) // destroy timelabel and current elent
        {
            this.timeLabel.destroy(true);
            this.countDown.destroy();
            this.elementArray[this.currentElement].setDepth(0)
            
        }
        this.currentElement = Phaser.Math.Between(0, 17); // element
        this.elementArray[this.currentElement].setDepth(10);//unhide
        this.timeLabel = this.add.bitmapText(300,7, "pixelFont", "Time: ",20);
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
        
        if(this.initialTime == 0)
        {
            //call new element
        }
    }









    endPopUp() //After winning, determine number of evos and coins won
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
