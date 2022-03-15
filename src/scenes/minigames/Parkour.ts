import Phaser from 'phaser'

export default class Parkour extends Phaser.Scene
{
    numEvos!: number;
    earnedEvos=0;
    
	constructor()
	{
		super('parkour')
	} 

    init(data) //Gets initial num evos and coins from home
    {
        this.numEvos = data.evos;
    }

	preload()
    {
       // this.cursors = this.input.keyboard.createCursorKeys();
    }

    create() //block out bg with graphics. do as little art as possible
    {
            
    }

    update(time: number, delta: number): void 
    {
       this.playerMovementManager() 
       
    }
    playerMovementManager()
    {
       
    }
}

