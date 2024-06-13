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
import { getIntervals } from "./utils/getIntervals"
import { getRunningSums } from "./utils/getRunningSums"

function App() {
  const [playing, setPlaying] = useState(false)
  const story = useRef(mingMing)
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0)
  const currentTextRef = useRef<HTMLParagraphElement>(null)
  const utterance = useMemo<SpeechSynthesisUtterance>(() => {
    const u = new SpeechSynthesisUtterance()
    u.lang = "nl"
    u.addEventListener("boundary", (e) => {
      const boundaryEnd = e.charIndex + e.charLength
      const sentences = u.text.match(/[^\\.!\\?]+[\\.!\\?]+/g)
      const sentencesLengthsRunningSum = getRunningSums(
        sentences as RegExpMatchArray
      )
      const intervals = getIntervals(sentencesLengthsRunningSum)

      const foundIndex = intervals.findIndex((i) => {
        const [min, max] = i
        if (boundaryEnd >= min && boundaryEnd <= max) return true
        return false
      })

      if (foundIndex >= 0) {
        setCurrentSentenceIndex(foundIndex + 1)
      }
    })
    u.addEventListener("end", () => {
      setPlaying(false)
    })
    return u
  }, [])

  useEffect(() => {
    speechSynthesis.cancel()
  }, [])

  function handlePlayButtonClick() {
    setPlaying((v) => !v)
    if (!speechSynthesis.paused && speechSynthesis.speaking)
      return speechSynthesis.pause()
    if (speechSynthesis.paused && speechSynthesis.speaking)
      return speechSynthesis.resume()
    playText({
      text: currentTextRef.current?.innerText as string,
      utterance: utterance,
      speechRate: 1,
    })
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
        className="*:mr-1 h-4/6 mt-4 mx-4 p-6 rounded-3xl
        overflow-y-auto bg-black bg-opacity-75 text-gray leading-7"
        ref={currentTextRef}
      >
        {story.current
          .match(/[^\\.!\\?]+[\\.!\\?]+/g)
          ?.map((sentence, index) => {
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
        <Rewind />
        <div className="hover:cursor-pointer" onClick={handlePlayButtonClick}>
          {playing ? <Pause /> : <PlayIcon />}
        </div>
        <FastForward />
        <div className="h-6 w-10 rounded-full bg-black text-slate-100 text-xs text-center p-1">
          1.5x
        </div>
      </div>
    </main>
  )
}

export default App
