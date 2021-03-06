import Phaser from 'phaser'

import Preloader from './scenes/Preloader'
import Title from './scenes/Title'
import Home from './scenes/Home'
import Trivia from './scenes/minigames/Trivia'
import Atomic from './scenes/minigames/Atomic'
import MicroShip from './scenes/minigames/MicroShip'
import PhilHelios from './scenes/minigames/PhilHelios'
import PhilHeliosB from './scenes/minigames/PhilHeliosB'
import StartingGame from './scenes/transitions/StartingGame'
import QuittingGame from './scenes/transitions/QuittingGame'
import AwardGame from './scenes/transitions/AwardGame'

const config: Phaser.Types.Core.GameConfig = {
	type: Phaser.AUTO,
	width: 400, //400
	height: 300, //300
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 0 },
			debug: false
		}
	},
	scene: [Preloader, Title, Home, StartingGame, Trivia, Atomic, MicroShip, PhilHelios, PhilHeliosB, QuittingGame, AwardGame],
	scale: 
	{
		zoom: 2 //Scales up all images 2 times
	}
}

export default new Phaser.Game(config)
