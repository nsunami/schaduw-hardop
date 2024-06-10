const playButton = document.getElementById("play-button")
const pauseButton = document.getElementById("pause-button")
const stopButton = document.getElementById("stop-button")
const textInput = document.getElementById("text")
const speedInput = document.getElementById("speed")
const textOutput = document.getElementById("text-output")

let currentCharacter

playButton.addEventListener("click", () => {
  playText(textInput.value)
})

pauseButton.addEventListener("click", pauseText)

stopButton.addEventListener("click", stopText)

const utterance = new SpeechSynthesisUtterance()
utterance.lang = "nl"
utterance.addEventListener("end", () => {
  textInput.disabled = false
})
utterance.addEventListener("boundary", (e) => {
  currentCharacter = e.charIndex
  const currentWord = textInput.value.substring(
    e.charIndex,
    e.charIndex + e.charLength
  )

  const beforeText = textInput.value.substring(0, e.charIndex)
  const afterText = textInput.value.substring(
    e.charIndex + e.charLength,
    textInput.value.length
  )

  const beforeTextSpan = document.createElement("span")
  const currentWordSpan = document.createElement("span")
  currentWordSpan.style.backgroundColor = "red"
  const afterTextSpan = document.createElement("span")

  beforeTextSpan.innerText = beforeText
  currentWordSpan.innerText = currentWord
  afterTextSpan.innerText = afterText

  textOutput.replaceChildren(beforeTextSpan, currentWordSpan, afterText)
})

speedInput.addEventListener("input", () => {
  stopText()
  playText(utterance.text.substring(currentCharacter))
})

textInput.addEventListener("input", () => {
  textOutput.innerText = textInput.value
})

function playText(text) {
  if (speechSynthesis.pause && speechSynthesis.speaking)
    return speechSynthesis.resume()
  if (speechSynthesis.speaking) return

  utterance.text = text
  utterance.rate = speedInput.value || 1
  textInput.disabled = true
  speechSynthesis.speak(utterance)
}

function pauseText() {
  if (speechSynthesis.speaking) speechSynthesis.pause()
}

function stopText() {
  speechSynthesis.resume()
  speechSynthesis.cancel()
  textInput.disabled = false
}
