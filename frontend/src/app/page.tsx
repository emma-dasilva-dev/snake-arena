import Link from "next/link";

export default function Home() {
  return <main className="home">
    <div className="jungleMist" /><div className="sunDisc" />
    <div className="vine vineLeft" /><div className="vine vineRight" />
    <section className="hero">
      <p className="eyebrow">THE LOST TEMPLE AWAITS</p>
      <h1><span>SNAKE</span><span className="outline">QUEST</span></h1>
      <p className="chapter">CHAPTER I · THE SUNKEN RUINS</p>
      <p className="intro">Guide the serpent through an ancient maze. Recover the golden relics. Grow longer. One wrong turn ends the expedition.</p>
      <div className="actions"><Link className="button primary" href="/game">Begin adventure <span>→</span></Link><Link className="button secondary" href="/leaderboard">Hall of explorers</Link></div>
      <div className="questSeal" aria-label="Solo expedition"><i>◆</i><span>SOLO<br/>EXPEDITION</span></div>
    </section>
    <section className="how"><div><b>01</b><span>Follow the trail using keys or touch.</span></div><div><b>02</b><span>Recover relics hidden in the ruins.</span></div><div><b>03</b><span>Never strike the temple walls.</span></div></section>
  </main>;
}
