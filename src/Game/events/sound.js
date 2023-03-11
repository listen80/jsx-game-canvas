export default {
  play (data, { $state, $sound, $loader }) {
    return $sound.play(data)
  },
}
