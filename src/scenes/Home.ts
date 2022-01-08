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
    numCoins?: string | number | null;
  
    
    private cursors!: Phaser.Types.Input.Keyboard.CursorKeys
    private willy?: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
    private myCam!: Phaser.Cameras.Scene2D.Camera;
    //Scale of all images
    private s = 2;

    

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
        var g1 = this.add.grid(0, 0, 256, 192, 32, 32, 0x00b9f2).setAltFillStyle(0x016fce).setOutlineStyle();
        g1.setScale(this.s);

        //Player setup
        this.willy = this.physics.add.sprite(0,0,'willy',0);
        this.willy.setScale(this.s);
        this.myCam = this.cameras.main.startFollow(this.willy, true);
        //Ease in/out effects later

        //Local storage. May need to restart game instance to update evos after each minigame
        this.numEvos= Number( localStorage.getItem("savedEvos") == null ? 0 : localStorage.getItem("savedEvos"));
        this.numCoins=  Number(localStorage.getItem("savedCoins") == null ? 0 : localStorage.getItem("savedCoins"));
           
        var evoCounter = this.add.bitmapText(10,80, "pixelFont", this.numEvos + " Evos", 40);
        var coinCounter = this.add.bitmapText(10,100, "pixelFont",  this.numCoins + " Coins", 40);
        evoCounter.setScrollFactor(0,0);
        coinCounter.setScrollFactor(0,0);
        
        //Buttons to each minigame ------------------------------------------------------------------------
        this.buttons = this.physics.add.group();

        this.goAtomic = this.buttons.create(50,50, "level_buttons");
        this.goAtomic.setInteractive().setScale(this.s);;
        this.goAtomic.on('pointerout',  (pointer) => {
          //this.goAtomic.setFrame(0);
        }, this);
        this.goAtomic.on('pointerover',  (pointer) => {
          //this.goParkour.setFrame(1);
        }, this);
        this.goAtomic.on('pointerup',  (pointer) => {
            this.scene.start('atomic', {evos: this.numEvos, coins: this.numCoins});
        }, this);

        this.goClaw = this.buttons.create(100,50, "level_buttons");
        this.goClaw.setInteractive().setScale(this.s);;
        this.goClaw.on('pointerout',  (pointer) => {
          //this.goClaw.setFrame(0);
        }, this);
        this.goClaw.on('pointerover',  (pointer) => {
          //this.goClaw.setFrame(1);
        }, this);
        this.goClaw.on('pointerup',  (pointer) => {
            this.scene.start('claw', {evos: this.numEvos, coins: this.numCoins});
        }, this);
        
        this.goMicro = this.buttons.create(150,50, "level_buttons");
        this.goMicro.setInteractive().setScale(this.s);;
        this.goMicro.on('pointerout',  (pointer) => {
          //this.goMicro.setFrame(0);
        }, this);
        this.goMicro.on('pointerover',  (pointer) => {
          //this.goMicro.setFrame(1);
        }, this);
        this.goMicro.on('pointerup',  (pointer) => {
            this.scene.start('microship', {evos: this.numEvos, coins: this.numCoins});
        }, this);

        this.goParkour = this.buttons.create(200,50, "level_buttons");
        this.goParkour.setInteractive().setScale(this.s);;
        this.goParkour.on('pointerout',  (pointer) => {
          //this.goParkour.setFrame(0);
        }, this);
        this.goParkour.on('pointerover',  (pointer) => {
          //this.goParkour.setFrame(1);
        }, this);
        this.goParkour.on('pointerup',  (pointer) => {
            this.scene.start('parkour', {evos: this.numEvos, coins: this.numCoins});
        }, this);

        this.goPhil = this.buttons.create(250,50, "level_buttons");
        this.goPhil.setInteractive().setScale(this.s);;
        this.goPhil.on('pointerout',  (pointer) => {
          //this.goPhil.setFrame(0);
        }, this);
        this.goPhil.on('pointerover',  (pointer) => {
          //this.goPhil.setFrame(1);
        }, this);
        this.goPhil.on('pointerup',  (pointer) => {
            this.scene.start('philHelios', {evos: this.numEvos, coins: this.numCoins});
        }, this);
        
        this.goTrivia = this.buttons.create(300,50, "level_buttons");
        this.goTrivia.setInteractive().setScale(this.s);;
        this.goTrivia.on('pointerout',  (pointer) => {
          //this.goTrivia.setFrame(0);
        }, this);
        this.goTrivia.on('pointerover',  (pointer) => {
          //this.goPhil.setFrame(1);
        }, this);
        this.goTrivia.on('pointerup',  (pointer) => {
            this.scene.start('trivia', {evos: this.numEvos, coins: this.numCoins});
        }, this);

        
    
        
    
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
            this.willy.body.offset.x = 32
        }
        else if(this.cursors.right?.isDown)
        {
            this.willy.anims.play('willy_walk',true);
            this.willy.setVelocity(speed, 0);
            this.willy.scaleX = -this.s
            this.willy.body.offset.x = 0
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
             
    }
}
