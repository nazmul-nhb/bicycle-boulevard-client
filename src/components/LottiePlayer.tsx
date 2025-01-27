import React from 'react';
import { Player } from '@lottiefiles/react-lottie-player';

const LottiePlayer: React.FC<{ lottie: string }> = ({ lottie }) => {
	return <Player autoplay loop speed={0.8} src={lottie} style={{ width: '100%' }} />;
};

export default LottiePlayer;
