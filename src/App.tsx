import { FastForward, LucideVolume2, PlayIcon, Rewind } from "lucide-react"

function App() {
  return (
    <main className="flex flex-col h-screen bg-gradient-to-b from-yellow-600 via-accent-darker to-black text-slate-300">
      <div className="flex items-end justify-center h-1/6 mt-6 mx-4 p-4 rounded-3xl bg-verhalen-photo-cover bg-cover bg-center relative">
        <div className="absolute inset-0 rounded-3xl bg-yellow-500 opacity-30"></div>
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-transparent to-black opacity-100"></div>
        <h2 className="text-2xl text-gray brightness-150 drop-shadow-lg z-10">
          Verhalen Titel
        </h2>
      </div>
      <div className="flex flex-col h-4/6 mt-4 mx-4 p-6 rounded-3xl overflow-y-auto bg-black bg-opacity-75 text-gray leading-7">
        <p className="brightness-50">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iusto magni
          nostrum optio dolores reiciendis assumenda magnam suscipit maiores,
          perspiciatis dolore odio numquam, accusantium dignissimos molestiae
          eos molestias hic fugit quas?
        </p>
        <br />
        <span className="text-accent saturate-200">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit.{" "}
        </span>
        <p className="brightness-50">
          Laboriosam sunt quos enim quidem dignissimos ab quis qui illo cum
          dolorem, dolorum, cupiditate id quia et. Maiores, officia eaque
          eligendi provident quod eos neque minima inventore expedita molestias
          ex, at deserunt? Aliquid doloribus deserunt non quia alias delectus
          laboriosam totam maxime, debitis accusantium voluptate omnis
          necessitatibus tempore, est nemo suscipit placeat culpa a, libero
          perspiciatis minima! Repellendus impedit id tempora. Neque.
        </p>
        <br />
        <p className="brightness-50">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi, nisi et! Minus assumenda animi perspiciatis quas nobis, quos reprehenderit ipsum.</p>
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
        <PlayIcon />
        <FastForward />
        <div className="h-6 w-10 rounded-full bg-black text-slate-100 text-xs text-center p-1">
          1.5x
        </div>
      </div>
    </main>
  )
}

export default App
