import React from 'react';
import { Player } from '@lottiefiles/react-lottie-player';

const LottieBicycle: React.FC = () => {
	return (
		<Player
			autoplay
			loop 
			src="./assets/bicycle.json" 
			style={{ width: '100%', }}
		/>
	);
};

export default LottieBicycle;
