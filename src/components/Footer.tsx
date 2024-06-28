

type Props = {}

const Footer = (props: Props) => {
  return (
    <footer>
      <section className="h-[200px] dark:bg-slate-900 bg-slate-950 flex flex-col items-center justify-center">
        <p className="text-white w-max">Triviathon is developed by <span className="text-emerald-500 underline">Dan Chanivet</span> ♥</p>
        <br />
        <p className="text-white w-max">Powered by OpenAI</p>
      </section>
    </footer>
  )
}

export default Footer