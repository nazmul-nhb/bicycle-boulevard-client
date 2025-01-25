/**
 * Play a short sound effect.
 * - It is wise to put the sound file in `public` folder and use absolute path like `"/sounds/success.wav"`.
 * @param src Source of audio file as `string`.
 */
export const playSound = (src: string): void => {
	const audio = new Audio(src);
	audio.play();
};
