const ITEMS = ['JAVA', 'NODE.JS', 'REACT', 'BACKEND', 'APIs', 'CLEAN CODE']

export default function Marquee() {
  const track = [...ITEMS, ...ITEMS]

  return (
    <div className="border-y border-line bg-bgAlt overflow-hidden py-[18px]">
      <div className="flex w-max animate-marquee motion-reduce:animate-none">
        {track.map((item, i) => (
          <span
            key={i}
            className="font-mono text-sm text-muted whitespace-nowrap px-7 flex items-center gap-7 after:content-['/'] after:text-accent"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}
