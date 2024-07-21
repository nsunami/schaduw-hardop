import {
  FastForward,
  LucideVolume2,
  Pause,
  PlayIcon,
  Rewind,
} from "lucide-react"
import { useEffect, useMemo, useRef, useState } from "react"
import { playText } from "./utils/speechHelpers"
import { mingMing } from "./stories/ming-ming"
import { Sentence } from "./components/Sentence"

function App() {
  const SPEECH_RATE_OPTIONS = [0.5, 0.75, 1, 1.25, 1.5, 2]
  const [speechRate, setSpeechRate] = useState(1)
  const [playing, setPlaying] = useState(false)
  const story = useRef(mingMing)
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState<number>(0)
  const [sentences] = useState<Array<string>>(
    getSentences(story.current) || ["hello"]
  )
  const [currentSentence, setCurrentSentence] = useState<string>(sentences[0])
  const currentTextRef = useRef<HTMLParagraphElement>(null)
  const utterance = useMemo<SpeechSynthesisUtterance>(() => {
    const u = new SpeechSynthesisUtterance()
    u.lang = "nl"
    u.addEventListener("end", () => {
      setCurrentSentence(sentences[currentSentenceIndex + 1])
      setCurrentSentenceIndex((c) => c + 1)
    })

    return u
  }, [currentSentenceIndex, sentences])

  useEffect(() => {
    speechSynthesis.cancel()
  }, [])

  useEffect(() => {
    speechSynthesis.cancel()
    playText({ text: currentSentence, utterance: utterance, speechRate })
  }, [currentSentence, utterance, speechRate])

  function handlePlayButtonClick() {
    setPlaying((v) => !v)
    if (!speechSynthesis.paused && speechSynthesis.speaking)
      return speechSynthesis.pause()
    if (speechSynthesis.paused && speechSynthesis.speaking)
      return speechSynthesis.resume()
    playText({
      text: currentSentence,
      utterance: utterance,
      speechRate,
    })
  }

  function getSentences(text: string) {
    return text.match(/[^\\.!\\?]+[\\.!\\?]+/g)
  }

  function handleRewind() {
    if (currentSentenceIndex >= 1) {
      speechSynthesis.cancel()
      setCurrentSentenceIndex((e) => e - 1)
      setCurrentSentence(sentences[currentSentenceIndex - 1])
    }
    setPlaying(true)
  }

  function handleForward() {
    if (currentSentenceIndex < sentences.length) {
      speechSynthesis.cancel()
      setCurrentSentenceIndex((e) => e + 1)
      setCurrentSentence(sentences[currentSentenceIndex + 1])
    }
    setPlaying(true)
  }

  return (
    <main className="flex flex-col h-screen bg-gradient-to-b from-yellow-600 via-accent-darker to-black text-slate-300">
      <div className="flex items-end justify-center h-1/6 mt-6 mx-4 p-4 rounded-3xl bg-verhalen-photo-cover bg-cover bg-center relative">
        <div className="absolute inset-0 rounded-3xl bg-yellow-500 opacity-30"></div>
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-transparent to-black opacity-100"></div>
        <h2 className="text-2xl text-gray brightness-150 drop-shadow-lg z-10">
          Verhalen Titel
        </h2>
      </div>
      <div
        className="h-4/6 mt-4 mx-4 p-6 rounded-3xl
        overflow-y-auto bg-black bg-opacity-75 text-2xl text-gray leading-relaxed"
        ref={currentTextRef}
      >
        <div className="m-auto max-w-3xl">
          {getSentences(story.current)?.map((sentence, index) => {
            return (
              <Sentence
                key={index}
                highlighted={index === currentSentenceIndex}
              >
                {sentence}
              </Sentence>
            )
          })}
        </div>
      </div>
      <div className="flex justify-between mt-8 mx-8 text-sm text-accent-darker">
        <span>02:07</span>
        <span>04:25</span>
      </div>
      <div className="relative">
        <div className="h-1 mt-2 mx-8 bg-black"></div>
        <div className="absolute h-1 w-40 -mt-1 mx-8 bg-slate-300"></div>
        <div className="absolute h-4 w-4 -mt-2 ml-48 rounded-full bg-slate-300"></div>
      </div>
      <div className="flex items-center justify-between mt-6 mx-8 pb-10">
        <LucideVolume2 />
        <Rewind className="hover:cursor-pointer" onClick={handleRewind} />
        <div className="hover:cursor-pointer" onClick={handlePlayButtonClick}>
          {playing ? <Pause /> : <PlayIcon />}
        </div>
        <FastForward className="hover:cursor-pointer" onClick={handleForward} />

        <select
          className="h-6 rounded-full bg-black text-slate-100 text-xs text-center p-1 hover:cursor-pointer"
          name="speed"
          defaultValue={speechRate}
          onChange={(e) => {
            setPlaying(true)
            setSpeechRate(Number.parseFloat(e.target.value))
          }}
        >
          {SPEECH_RATE_OPTIONS.map((rate) => (
            <option key={rate} value={rate}>
              {rate}x
            </option>
          ))}
        </select>
      </div>
    </main>
  )
}

export default App
