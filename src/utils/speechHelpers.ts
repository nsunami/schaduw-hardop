type PlayTextProps = {
  text: string
  utterance: SpeechSynthesisUtterance | undefined
  speechRate: number
}

export function playText(
  { text, utterance, speechRate }: PlayTextProps,
  callbackfn: () => void = () => {}
) {
  if (utterance == null) return
  if (speechSynthesis.paused && speechSynthesis.speaking)
    return speechSynthesis.resume()
  utterance.text = text
  utterance.rate = speechRate
  speechSynthesis.speak(utterance)
  return callbackfn
}

export function pauseText() {
  if (speechSynthesis.speaking) return speechSynthesis.pause()
}
