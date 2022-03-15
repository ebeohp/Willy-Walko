import Phaser from 'phaser'

export default class Home extends Phaser.Scene 
//Carnival map. Player can walk around and select games to play. If coming from title screen, give welcome back and spawn at entrance, if from any other scene, fade back in front of og place. 
{
    
    private buttons?: Phaser.Physics.Arcade.Group;
    private goAtomic?: any;
    private goClaw?: any;
    private goMicro?: any;
    private goParkour?: any;
    private goPhil?: any;
    private goTrivia?: any;

    numEvos?: string | number | null;
  
    
    private cursors!: Phaser.Types.Input.Keyboard.CursorKeys
    private willy?: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
    private myCam!: Phaser.Cameras.Scene2D.Camera;
    //Scale of all images
    private s = 1;
    private shipcarn?: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
    private philcarn?: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
    private bountycarn?: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
    private triviacarn?: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;

    

	constructor()
	{
		super('home')
	}

	preload()
    {
        this.cursors = this.input.keyboard.createCursorKeys();
    }

    create()
    {   
        //Map setup
        var g1 = this.add.grid(150, 200, 480, 320, 32, 25, 0x00b9f2).setAltFillStyle(0x016fce).setOutlineStyle();

        this.shipcarn = this.physics.add.sprite(100,200, 'shipcarn', 0);
        this.shipcarn.anims.play('shipcarn_anim');
        this.philcarn = this.physics.add.sprite(200, 150, 'philcarn', 0);
        this.philcarn.anims.play('philcarn_anim');
        this.triviacarn = this.physics.add.sprite(300,250, 'triviacarn', 0);
        this.triviacarn.anims.play('triviacarn_anim');
        this.bountycarn = this.physics.add.sprite(0,150, 'bountycarn', 0);

        var attractionsArray = [this.shipcarn, this.philcarn, this.triviacarn, this.bountycarn]

        //Player setup
        this.willy = this.physics.add.sprite(50,300,'willy',0);
        this.willy.setScale(this.s);
        this.myCam = this.cameras.main.startFollow(this.willy, true);
        //this.willy.setCollideWorldBounds(true);

        for(let i = 0; i<attractionsArray.length; i++)
        {
            attractionsArray[i].setImmovable();
            this.physics.add.collider(this.willy, attractionsArray[i]);
        }

        //Local storage. May need to restart game instance to update evos after each minigame
        this.numEvos= Number( localStorage.getItem("savedEvos") == null ? 0 : localStorage.getItem("savedEvos"));
        
        var name= this.add.bitmapText(15,14, "pixelFont", "Willy", 20);
        name.setScrollFactor(0,0)
        var evoCounter = this.add.bitmapText(35,34, "pixelFont", "X " + this.numEvos, 20);
        var evoimg = this.add.image(20,40,'evoimg');
        evoimg.setScrollFactor(0,0);
        evoCounter.setScrollFactor(0,0);
        
        //Buttons to each minigame ------------------------------------------------------------------------

        this.bountycarn.setInteractive();
        this.bountycarn.body.setSize(70,65).offset.y = -2;
        this.bountycarn.on('pointerup',  (pointer) => {
            this.scene.pause();
            this.scene.launch('startingGame',{gameTitle: "Bohr's Bounty", evos: this.numEvos, gameKey: 'atomic'});
        }, this);
       
        this.shipcarn.setInteractive().setScale(this.s);
        this.shipcarn.body.setSize(75,45)
        this.shipcarn.on('pointerup',  (pointer) => {
            this.scene.pause();
            this.scene.launch('startingGame',{gameTitle: "Micro-Ship", evos: this.numEvos, gameKey: 'microship'});
        }, this);

        this.philcarn.setInteractive();
        this.philcarn.body.setSize(100,60).offset.y = -1;
        this.philcarn.on('pointerup',  (pointer) => {
            this.scene.pause();
            this.scene.launch('startingGame',{gameTitle: "Legend of Phil Helios", evos: this.numEvos, gameKey: 'philHelios'});
        }, this);
        
        this.triviacarn.setInteractive();
        this.triviacarn.body.setSize(60,110).offset.y = -1
        this.triviacarn.on('pointerup',  (pointer) => {
            this.scene.pause();
            this.scene.launch('startingGame',{gameTitle: "Chem Trivia", evos: this.numEvos, gameKey: 'trivia'});
        }, this);
        
        /*this.goParkour = this.buttons.create(200,50, "level_buttons");
        this.goParkour.setInteractive().setScale(this.s);;
        this.goParkour.on('pointerup',  (pointer) => {
            this.scene.start('parkour', {evos: this.numEvos});
        }, this);
        */
    
    }
    

    update(time: number, delta: number): void 
    {
        //Player movement
        if(!this.cursors || !this.willy)
        {
            return;
        }
        const speed = 150;
        if(this.cursors.left?.isDown)
        {
            this.willy.anims.play('willy_walk',true);
            this.willy.setVelocity(-speed, 0);
            this.willy.scaleX = this.s
            this.willy.body.offset.x = 0
        }
        else if(this.cursors.right?.isDown)
        {
            this.willy.anims.play('willy_walk',true);
            this.willy.setVelocity(speed, 0);
            this.willy.scaleX = -this.s
            this.willy.body.offset.x = 32
        }
        else if (this.cursors.up?.isDown)
        {
            this.willy.anims.play('willy_walk',true);
            this.willy.setVelocity(0,-speed);
        }
        else if(this.cursors.down?.isDown)
        {
            this.willy.anims.play('willy_walk',true);
            this.willy.setVelocity(0,speed);
        }
        else
        {   
            this.willy.anims.play('willy_idle',true);
            this.willy.setVelocity(0,0);
        }
        //for animations of evolution sprites, have if else inside based on number evos
             
    }
}
