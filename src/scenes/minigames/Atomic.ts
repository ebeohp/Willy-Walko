import Phaser from 'phaser'

export default class Atomic extends Phaser.Scene
{
    numEvos!: number;
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
    notif!: any;

    
	constructor()
	{
		super('atomic')
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
        
        this.music = this.sound.add("bounty_theme");  
        var musicConfig = 
        { //optional
            mute: false,
            volume: 0.5,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: true,
            delay: 0
        }
        this.music.play(musicConfig); 
        this.earnedEvos = 0;
        var xButton = this.add.image(380,20, "xButton")
        xButton.setDepth(100).setAlpha(0.3);
        xButton.setInteractive();
        xButton.setScrollFactor(0,0);
        
        xButton.on('pointerover',  (pointer) => {
            xButton.setAlpha(1);
        }, this);
        xButton.on('pointerout',  (pointer) => {
            xButton.setAlpha(0.5);
        }, this);
        xButton.on('pointerup',  (pointer) => {
            var totalEvos = this.earnedEvos;
            this.scene.launch('quittingGame', {currentGameKey: 'atomic', earnedEvos: totalEvos, numEvos: this.numEvos, gameTitle: "Bohr's Bounty", currentMusicKey: 'bounty_theme'});
            this.scene.pause();
        }, this);

        var graphics = this.add.graphics();
        var outside = graphics.fillGradientStyle(0x8d4c1b, 0x8d4c1b,0x8d4c1b, 0x8d4c1b,  1);
        graphics.fillRect(0, 0, 400, 300);
        
        var sepgraphics = this.add.graphics();
        var rightside = sepgraphics.fillGradientStyle(0x8d4c1b, 0x8d4c1b,0x8d4c1b, 0x8d4c1b,  1);
        sepgraphics.fillRect(300, 0, 400, 300);
        
        var paper = sepgraphics.fillStyle(0xffffff,  1);
        sepgraphics.fillRect(310, 100, 80, 120);
            var wantedSign =  this.add.text(313,110, 'WANTED', { font: 'bold 17px Oswald', color: '#000000', align: 'center', wordWrap: { width: 200 } });
            wantedSign.setDepth(2.1);
            var bountyamt = this.add.text(330, 206, '10 EVOS', { font: 'bold 10px Oswald', color: '#000000', align: 'center', wordWrap: { width: 200 } });
            bountyamt.setDepth(2.1);
        
        

        var leftside = sepgraphics.fillGradientStyle(0x8d4c1b, 0x8d4c1b,0x8d4c1b, 0x8d4c1b,  1);
        sepgraphics.fillRect(0, 0, 10, 200);
        rightside.setDepth(2);

        var inside = graphics.fillGradientStyle(0x1f3518, 0x1f3518,0x091c09, 0x091c09,  1);
        graphics.fillRect(10, 0, 290, 260);
        var inside2 = graphics.fillGradientStyle(0x091c09, 0x091c09,0x091c09, 0x091c09,  1);
        graphics.fillRect(10, 45, 300, 30);
        var inside3 = graphics.fillGradientStyle(0x091c09, 0x091c09,0x091c09, 0x091c09,  1);
        graphics.fillRect(10, 105, 300, 30);

        var sepgraphics2 = this.add.graphics();
        var front = sepgraphics2.fillGradientStyle(0xdd6517, 0xdd6517,0xdd6517, 0xdd6517,  1);
        sepgraphics2.fillRect(0, 240, 330, 300);
        front.setDepth(2.25)
        var slant =  sepgraphics2.fillGradientStyle(0xdd6517, 0xdd6517, 0xdd6517, 0xdd6517, 1);
        sepgraphics2.fillTriangle(330, 240, 350, 285, 250, 285);
        slant.setDepth(2.75)

        var sepgraphics3 = this.add.graphics();
        var frontshad = sepgraphics3.fillGradientStyle(0xd05001, 0xd05001,0xd05001, 0xd05001,  1);
        sepgraphics3.fillRect(0, 285, 348, 300);
        sepgraphics3.setDepth(2.8)
        
        var decor = this.add.image(160,0,"atomicflaps")
        decor.setDepth(4).setScale(2.2)
        //outlines of booth
        var lineRectangle = this.add.graphics({x: 11, y: 1}); //for inside box
        lineRectangle.lineStyle(2, 0x000000, 1.0);
        lineRectangle.strokeRect(0, 0, 288, 238);
        lineRectangle.setDepth(1.5)
        var lineRectangle3 = this.add.graphics({x: 318, y: 138}); // for box around elements
        lineRectangle3.lineStyle(2, 0x000000, 1.0);
        lineRectangle3.strokeRect(0, 0, 64, 64);
        lineRectangle3.setDepth(15)
        var lineRectangle4 = this.add.graphics({x: 310, y: 100}); // for box around paper
        lineRectangle4.lineStyle(1, 0x000000, 1.0);
        lineRectangle4.strokeRect(0, 0, 80, 120);
        lineRectangle4.setDepth(15)
        var line = new Phaser.Geom.Line(0, 239, 330, 239);
        sepgraphics2.lineStyle(2, 0x000000);
        sepgraphics2.strokeLineShape(line);
        var line2 = new Phaser.Geom.Line(330, 239, 350, 285);
        sepgraphics2.lineStyle(2, 0x000000);
        sepgraphics2.strokeLineShape(line2);
        var line3 = new Phaser.Geom.Line(350, 285, 350, 300);
        sepgraphics2.lineStyle(2, 0x000000);
        sepgraphics2.strokeLineShape(line3);
        

        this.dart = this.physics.add.sprite(200,260,"dart")
        this.dart.setScale(1.5).setDepth(3);
        this.dart.body.setSize(5,5)
        this.dart.setCollideWorldBounds(true); 
        this.dart.body.setBoundsRectangle(new Phaser.Geom.Rectangle(20, 0, 270, 280));

        this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        //These are the wanted posters
        var elementx = 350;
        var elementy = 170;
        this.element1 = this.physics.add.sprite(elementx,elementy, "elements", 0)
        this.element1.setScale(0.2)
        this.element2 = this.physics.add.sprite(elementx,elementy, "elements", 1)
        this.element2.setScale(0.2)
        this.element3 = this.physics.add.sprite(elementx,elementy, "elements", 2)
        this.element3.setScale(0.2)
        this.element4 = this.physics.add.sprite(elementx,elementy, "elements", 3)
        this.element4.setScale(0.2)
        this.element5 = this.physics.add.sprite(elementx,elementy, "elements", 4)
        this.element5.setScale(0.2)
        this.element6 = this.physics.add.sprite(elementx,elementy, "elements", 5)
        this.element6.setScale(0.2)
        this.element7 = this.physics.add.sprite(elementx,elementy, "elements", 6)
        this.element7.setScale(0.2)
        this.element8 = this.physics.add.sprite(elementx,elementy, "elements", 7)
        this.element8.setScale(0.2)
        this.element9 = this.physics.add.sprite(elementx,elementy, "elements", 8)
        this.element9.setScale(0.2)
        this.element10 = this.physics.add.sprite(elementx,elementy, "elements", 9)
        this.element10.setScale(0.2)
        this.element11 = this.physics.add.sprite(elementx,elementy, "elements", 10)
        this.element11.setScale(0.2)
        this.element12 = this.physics.add.sprite(elementx,elementy, "elements", 11)
        this.element12.setScale(0.2)
        this.element13 = this.physics.add.sprite(elementx,elementy, "elements", 12)
        this.element13.setScale(0.2)
        this.element14 = this.physics.add.sprite(elementx,elementy, "elements", 13)
        this.element14.setScale(0.2)
        this.element15 = this.physics.add.sprite(elementx,elementy, "elements", 14)
        this.element15.setScale(0.2)
        this.element16 = this.physics.add.sprite(elementx,elementy, "elements", 15)
        this.element16.setScale(0.2)
        this.element17 = this.physics.add.sprite(elementx,elementy, "elements", 16)
        this.element17.setScale(0.2)
        this.element18 = this.physics.add.sprite(elementx,elementy, "elements", 17)
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
            args: [60,90],
            callbackScope: this, 
            loop: true
        });
        this.time.addEvent({ //second row
            delay: 2000, 
            callback: this.bohrChoices, 
            args: [120,50],
            callbackScope: this, 
            loop: true
        });
        this.triggerGroup = this.physics.add.group();
        //this.physics.add.collider(this.dart, this.triggerGroup, this.hitCorrectBohr)
        this.physics.add.collider(
            this.dart,
            this.triggerGroup,
            function(dart, trigger) {
             
                console.log("correct!")
                trigger.destroy();
                this.earnedEvos+=10;
        
                this.plusEvoSfx(trigger.x, trigger.y);
            },
            null,
            this
          )

        /*
            each time timer ends, destroy current element and timer and replace.
            how to know current element?
            -global variable containing number for current element
        */
 
        
    }

    update(time: number, delta: number): void 
    {
        this.dartMovementManager();
        if(this.dart.y <15)
        {
            this.dartRespawn(this.dart.x);
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
    plusEvoSfx(x,y)
    {
        var notif = this.add.bitmapText(x,y, "pixelFont", "+10",20);
        notif.setAlpha(0);
        this.tweens.add
        ({
            targets: notif,
            alpha: { from: 0, to: 1 },
            y: y-10,
            ease: 'Linear',
            duration: 200,
            onComplete: () => {
                this.time.addEvent
                ({
                    delay: 10,
                    callback: this.removeSfx,
                    args: [notif],
                    callbackScope: this
                });
            },
            callbackScope: this
        });  
    }
    removeSfx(notif)
    {
        this.tweens.add
        ({
            targets: notif,
            alpha: { from: 1, to: 0},
            y: 60,
            ease: 'Linear',
            duration: 1000,
            onComplete: () =>
            {
                notif.destroy();
            },
            callbackScope: this
        }); 
    }
    dartRespawn(x) // when hit back or when hit target
    {
        this.dartFly = false;
        this.dart.x=x;
        this.dart.y = 260;
    }
    bohrChoices(row, speed) //higher chance of current element
    {   
        var randomBohr = Phaser.Math.Between(0, 25);
        
        if(randomBohr == this.currentElement || randomBohr > 17)
        {
            var correctBohr = this.bohrGroup.create(350,row,"bohrtargets",this.currentElement)
            var trigger = this.triggerGroup.create(350,row,"trigger")
            trigger.setScale(.3).setVelocityX(-speed)
            correctBohr.setVelocityX(-speed);
            correctBohr.body.setSize(20,20);
            correctBohr.setScale(1.75)
            correctBohr.setDepth(1)
            trigger.setDepth(1)
        }
        else
        {
            var bohr = this.bohrGroup.create(350,row, "bohrtargets", randomBohr)
            bohr.setVelocityX(-speed);
            bohr.body.setSize(20,20)
            bohr.setScale(1.75)
            bohr.setDepth(1)
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
        this.timeLabel = this.add.bitmapText(320,80, "pixelFont", "Time: ",15);
        this.timeLabel.text = "Time: " + this.timeFormat(this.initialTime);
        this.timeLabel.setDepth(3)
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
        
    
    }

    
}
