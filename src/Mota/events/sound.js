const config = {
  play(data, { $state, $sound, $loader }) {
    return $sound.play(data);
  },
};

export default config;
