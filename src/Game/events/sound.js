export const playSound = "playSound";

export default {
  [playSound](data, { $state, $sound, $loader }) {
    return $sound.play(data);
  },
};
