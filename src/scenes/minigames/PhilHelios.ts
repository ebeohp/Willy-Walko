import Phaser from 'phaser'

export default class PhilHelios extends Phaser.Scene
{
//Recycling world but vertical
 
    numEvos!: number;
    numCoins!: number;
    private earnedCoins=0;
    private earnedEvos=0;
    private plant!: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
    private cloudGroup!: Phaser.Physics.Arcade.Group;
    private cloudVelX!: number;
    private cursors!: Phaser.Types.Input.Keyboard.CursorKeys | undefined;
    



	constructor()
	{
		super('philHelios')
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
    create()
    {
        var graphics = this.add.graphics();
        graphics.fillGradientStyle(0x79ced9, 0x79ced9,0x65a2ba, 0x3287a8,  1);
        graphics.fillRect(0, 0, 400, 300);
        this.plant = this.physics.add.sprite(150,20,"willy"); //spawn on top of a cloud. so have one cloud at beginning fs
        //this.plant.body.gravity.y = 1000;
        //this.physics.world.gravity.y = 500;
        var plantAcc = 5000;
        var plantLeft = -200;
        var plantRight = 200;
        var r1 = this.add.rectangle(200, 150, 100, 20, 0x6666ff);

        this.physics.add.existing(r1);
        
        
        this.physics.add.collider(this.plant, r1);
        /*
        this.cloudGroup = this.physics.add.group(); // clouds, platforms
        this.cloudVelX = -150;
        let cloudX = 700;
        for(let i = 0; i < 10; i++){
            let cloud = this.cloudGroup.create(cloudX, 450, "cloud");
            cloud.setOrigin(0.5, 1).setScale(.6);
            cloud.setImmovable(true).setScale(.3);
            cloudX += Phaser.Math.Between(450, 550);
        }
        */
    }

    update(time: number, delta: number): void {
        if(!this.cursors || !this.plant)
        {
            return;
        }
        const speed = 50;
        if(this.cursors.left?.isDown)
        {
            this.plant.setVelocity(-speed, 0);
        }
        else if(this.cursors.right?.isDown)
        {
            this.plant.setVelocity(speed, 0);
        }
        else
        {
            this.plant.setVelocity(0,0);
        }

        if(this.plant.body.touching.down)
        {
            this.time.addEvent({  
                delay: 100, 
                callback: this.jump, 
                callbackScope: this, 
                loop: false
            });
        }
    }
    jump(){
        this.plant.setAcceleration(0,-100);
        this.plant.setVelocityY(-600);
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
    //scene transition back to home
}
