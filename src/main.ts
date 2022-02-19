import Phaser from 'phaser'

import Preloader from './scenes/Preloader'
import Title from './scenes/Title'
import Home from './scenes/Home'
import Trivia from './scenes/minigames/Trivia'
import Atomic from './scenes/minigames/Atomic'
import MicroShip from './scenes/minigames/MicroShip'
import Parkour from './scenes/minigames/Parkour'
import PhilHelios from './scenes/minigames/PhilHelios'

const config: Phaser.Types.Core.GameConfig = {
	type: Phaser.AUTO,
	width: 400,
	height: 300,
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 0 },
			debug: true
		}
	},
	scene: [Preloader, Title, Home, Trivia, Atomic, MicroShip, Parkour, PhilHelios],
	scale: 
	{
		zoom: 2 //Scales up all images 2 times
	}
}

export default new Phaser.Game(config)
