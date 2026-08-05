"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
type Lang = "en" | "fr";
type Stage = "awakening" | "naming" | "story" | "map" | "chapter";
const words = {
  en: {
    settings: "Settings",
    close: "Return to world",
    language: "Language",
    guardianName: "Guardian name",
    save: "Save changes",
    reset: "Awaken another guardian",
    awakeningKicker: "BENEATH THE SUNKEN RUINS",
    awakeningTitle: "A power long forgotten",
    awakeningBody:
      "For centuries, the last Guardian slept beneath roots and broken stone—its name erased, its power divided among four relics. Now the corruption has reached the chamber where it was bound. The world has not come to rescue the Guardian. The Guardian has awakened to rescue the world.",
    awaken: "Awaken the Guardian",
    nameKicker: "THE RELICS ARE LISTENING",
    nameTitle: "Name the awakened",
    nameBody:
      "Every Guardian carried a true name: a word the relics could remember even when history could not. Speak yours, and the first bond will be restored.",
    placeholder: "Guardian name",
    bind: "Seal the bond",
    storyTitle: "The night the world broke",
    storyPages: [
      "Before the kingdoms raised walls between one another, four relics kept the living world in balance. Teal carried memory through root and river. Blue commanded the deep currents. Gold held the light of the open sky. Red guarded the fire beneath the earth. Together, they were not weapons. They were a promise: no single power would rule the rest.",
      "Then came the Silent Eclipse. The relics vanished in a single night, and each realm accused the others of betrayal. Forests swallowed roads. Oceans climbed temple stairs. Deserts erased entire cities. The Ember Citadel sealed its gates and burned every record of what happened. In the panic, four guardians were sent to recover the relics. None returned.",
      "You awaken where the last expedition ended. Teal light moves beneath your fur like an old memory searching for its name. Beyond the chamber, something enormous drags its claws across the ruined stone. It has been guarding the first relic for centuries—but the relic is no longer calling to it. It is calling to you.",
      "Three fragments lie scattered across the Sunken Ruins. Recover them, awaken the Spirit Dash, and enter the chamber of the corrupted Guardian. But remember this warning, carved by the vanished expedition: the relics were not stolen. Someone hid them from each other.",
    ],
    continue: "Continue",
    enterWorld: "Enter the fractured world",
    mapKicker: "THE FRACTURED WORLD",
    mapTitle: "Choose your path",
    mapBody:
      "Four realms remain bound to four broken relics. Only the Sunken Ruins answer your call. The others will awaken when their bonds are restored.",
    available: "AVAILABLE",
    locked: "SEALED",
    chapter: "CHAPTER I",
    ruins: "The Sunken Ruins",
    ruinsDesc:
      "A drowned kingdom strangled by ancient roots. Recover the Teal Relic before its corrupted guardian wakes completely.",
    temple: "The Drowned Temple",
    wastes: "The Golden Wastes",
    citadel: "The Ember Citadel",
    descend: "Descend into the ruins",
    history: "Expedition history",
    noHistory:
      "No expedition has been recorded yet. Your first descent will begin the archive.",
  },
  fr: {
    settings: "Paramètres",
    close: "Retourner au monde",
    language: "Langue",
    guardianName: "Nom du Gardien",
    save: "Enregistrer",
    reset: "Réveiller un autre Gardien",
    awakeningKicker: "SOUS LES RUINES ENGLOUTIES",
    awakeningTitle: "Un pouvoir oublié",
    awakeningBody:
      "Pendant des siècles, le dernier Gardien a dormi sous les racines et les pierres brisées — son nom effacé, son pouvoir divisé entre quatre reliques. La corruption atteint maintenant la chambre où il était enchaîné. Le monde n’est pas venu sauver le Gardien. Le Gardien s’est réveillé pour sauver le monde.",
    awaken: "Réveiller le Gardien",
    nameKicker: "LES RELIQUES ÉCOUTENT",
    nameTitle: "Nomme l’éveillé",
    nameBody:
      "Chaque Gardien portait un vrai nom : un mot que les reliques pouvaient retenir même lorsque l’histoire l’oubliait. Prononce le tien, et le premier lien sera restauré.",
    placeholder: "Nom du Gardien",
    bind: "Sceller le lien",
    storyTitle: "La nuit où le monde s’est brisé",
    storyPages: [
      "Avant que les royaumes n’élèvent des murs entre eux, quatre reliques maintenaient l’équilibre du monde vivant. Le turquoise transportait la mémoire à travers les racines et les rivières. Le bleu commandait les courants profonds. L’or retenait la lumière du ciel ouvert. Le rouge gardait le feu sous la terre. Ensemble, elles n’étaient pas des armes. Elles étaient une promesse : aucun pouvoir ne dominerait les autres.",
      "Puis vint l’Éclipse Silencieuse. Les reliques disparurent en une seule nuit, et chaque royaume accusa les autres de trahison. Les forêts engloutirent les routes. Les océans montèrent les marches des temples. Les déserts effacèrent des villes entières. La Citadelle de Braise ferma ses portes et brûla chaque trace de ce qui s’était passé. Quatre Gardiens furent envoyés à la recherche des reliques. Aucun ne revint.",
      "Tu t’éveilles là où la dernière expédition s’est terminée. Une lumière turquoise court sous ta fourrure, comme un ancien souvenir à la recherche de son nom. Au-delà de la chambre, une créature immense traîne ses griffes sur la pierre. Elle protège la première relique depuis des siècles — mais la relique ne l’appelle plus. Elle t’appelle, toi.",
      "Trois fragments sont dispersés dans les Ruines Englouties. Retrouve-les, éveille la Ruée Spirituelle et pénètre dans la chambre du Gardien corrompu. Mais souviens-toi de l’avertissement gravé par l’expédition disparue : les reliques n’ont pas été volées. Quelqu’un les a cachées les unes des autres.",
    ],
    continue: "Continuer",
    enterWorld: "Entrer dans le monde fracturé",
    mapKicker: "LE MONDE FRACTURÉ",
    mapTitle: "Choisis ton chemin",
    mapBody:
      "Quatre royaumes restent liés à quatre reliques brisées. Seules les Ruines Englouties répondent à ton appel. Les autres s’éveilleront lorsque leurs liens seront restaurés.",
    available: "DISPONIBLE",
    locked: "SCELLÉ",
    chapter: "CHAPITRE I",
    ruins: "Les Ruines Englouties",
    ruinsDesc:
      "Un royaume noyé, étranglé par des racines anciennes. Retrouve la Relique Turquoise avant le réveil complet de son gardien corrompu.",
    temple: "Le Temple Noyé",
    wastes: "Les Terres Dorées",
    citadel: "La Citadelle de Braise",
    descend: "Descendre dans les ruines",
    history: "Histoire des expéditions",
    noHistory:
      "Aucune expédition n’a encore été enregistrée. Ta première descente ouvrira les archives.",
  },
};
const chapterCopy = {
  en: {
    kicker: "CHAPTER I",
    title: "The Sunken Ruins",
    body: "Long before the waters rose, this kingdom guarded the oldest road in the fractured world. Its towers now sleep beneath black water, and ancient roots have forced their way through every hall. The Teal Relic still remembers what happened here—but its corrupted guardian is waking, and every step deeper into the ruins strengthens its hold.",
    mission:
      "Follow the relic's call through the drowned passage. Recover all three fragments, awaken Spirit Dash, and reach the guardian chamber before the roots seal the kingdom forever.",
    back: "Return to the world map",
  },
  fr: {
    kicker: "CHAPITRE I",
    title: "Les Ruines Englouties",
    body: "Bien avant la montée des eaux, ce royaume protégeait la plus ancienne route du monde fracturé. Ses tours dorment désormais sous une eau noire, tandis que des racines ancestrales traversent chaque salle. La Relique Turquoise se souvient encore de ce qui s'est passé ici — mais son gardien corrompu s'éveille, et chaque pas vers les profondeurs renforce son emprise.",
    mission:
      "Suis l'appel de la relique à travers le passage noyé. Retrouve les trois fragments, éveille la Ruée Spirituelle et atteins la chambre du gardien avant que les racines ne condamnent le royaume pour toujours.",
    back: "Retourner à la carte du monde",
  },
};
export default function ExpeditionFlow() {
  const [lang, setLang] = useState<Lang>("en");
  const [stage, setStage] = useState<Stage>("awakening");
  const [name, setName] = useState("");
  const [draft, setDraft] = useState("");
  const [storyPage, setStoryPage] = useState(0);
  const [settings, setSettings] = useState(false);
  const [history, setHistory] = useState(false);
  const t = words[lang];
  const chapter = chapterCopy[lang];
  useEffect(() => {
    const l = localStorage.getItem("relicbound-language");
    const n = localStorage.getItem("relicbound-guardian");
    if (l === "fr") setLang("fr");
    if (n) {
      setName(n);
      setDraft(n);
      setStage("map");
    }
    const q = new URLSearchParams(location.search);
    if (q.get("settings")) setSettings(true);
    if (q.get("history")) {
      setHistory(true);
      setStage("map");
    }
  }, []);
  function chooseLanguage(next: Lang) {
    setLang(next);
    localStorage.setItem("relicbound-language", next);
    document.documentElement.lang = next;
  }
  function bindName() {
    const clean = draft.trim().slice(0, 18);
    if (!clean) return;
    setName(clean);
    localStorage.setItem("relicbound-guardian", clean);
    setStage("story");
  }
  function saveSettings() {
    const clean = draft.trim().slice(0, 18);
    if (clean) {
      setName(clean);
      localStorage.setItem("relicbound-guardian", clean);
    }
    setSettings(false);
  }
  return (
    <main className={`relicWorld stage-${stage}`}>
      <div className="worldFog" />
      <div className="runeField" aria-hidden="true">
        <i>◆</i>
        <i>◇</i>
        <i>✦</i>
        <i>◈</i>
        <i>◆</i>
      </div>
      <header className="gameNav">
        <Link href="/" className="wordmark">
          RELIC<span>BOUND</span>
        </Link>
        <button
          className="gearButton"
          onClick={() => {
            setDraft(name);
            setSettings(true);
          }}
          aria-label={t.settings}
        >
          ⚙ <span>{t.settings}</span>
        </button>
      </header>
      {stage === "awakening" && (
        <section className="awakening scene">
          <div className="guardianStage" aria-label="Ancient fox guardian">
            <div className="halo haloOne" />
            <div className="halo haloTwo" />
            <div className="fox">
              <i className="ear leftEar" />
              <i className="ear rightEar" />
              <i className="face">
                <b />
                <b />
              </i>
              <i className="chestMark">◆</i>
              <i className="tail tailOne" />
              <i className="tail tailTwo" />
            </div>
            <div className="stonePlinth" />
          </div>
          <div className="sceneCopy">
            <p className="eyebrow">{t.awakeningKicker}</p>
            <h1>{t.awakeningTitle}</h1>
            <p>{t.awakeningBody}</p>
            <button
              className="button primary"
              onClick={() => setStage("naming")}
            >
              {t.awaken}
              <b>→</b>
            </button>
          </div>
        </section>
      )}
      {stage === "naming" && (
        <section className="naming scene">
          <div className="guardianClose">
            <div className="foxEye left" />
            <div className="foxEye right" />
            <span>◆</span>
          </div>
          <div className="sceneCopy">
            <p className="eyebrow">{t.nameKicker}</p>
            <h1>{t.nameTitle}</h1>
            <p>{t.nameBody}</p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                bindName();
              }}
            >
              <input
                autoFocus
                maxLength={18}
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                placeholder={t.placeholder}
                aria-label={t.placeholder}
              />
              <button className="button primary" disabled={!draft.trim()}>
                {t.bind}
                <b>→</b>
              </button>
            </form>
          </div>
        </section>
      )}
      {stage === "story" && (
        <section className="storyScene">
          <div className="storyNumber">
            0{storyPage + 1}
            <span>/ 04</span>
          </div>
          <div className="storyRelic">◆</div>
          <p className="eyebrow">
            {name.toUpperCase()} · {t.storyTitle}
          </p>
          <h1>
            {storyPage === 0
              ? "THE FOURFOLD OATH"
              : storyPage === 1
                ? "THE SILENT ECLIPSE"
                : storyPage === 2
                  ? "THE LAST AWAKENING"
                  : "THE CARTOGRAPHER’S WARNING"}
          </h1>
          <p className="longStory">{t.storyPages[storyPage]}</p>
          <div className="storyProgress">
            {t.storyPages.map((_, i) => (
              <i key={i} className={i <= storyPage ? "active" : ""} />
            ))}
          </div>
          <button
            className="button primary"
            onClick={() =>
              storyPage < 3 ? setStoryPage((v) => v + 1) : setStage("map")
            }
          >
            {storyPage < 3 ? t.continue : t.enterWorld}
            <b>→</b>
          </button>
        </section>
      )}
      {stage === "map" && (
        <section className="mapScene">
          <div className="mapHeader">
            <p className="eyebrow">{t.mapKicker}</p>
            <h1>{t.mapTitle}</h1>
            <p>{t.mapBody}</p>
          </div>
          <div className="worldMap">
            <div className="path pathOne" />
            <div className="path pathTwo" />
            <button className="region ruins active">
              <span className="regionPulse" />
              <i>◆</i>
              <b>{t.ruins}</b>
              <small>{t.available}</small>
            </button>
            <button className="region temple" disabled>
              <i>◇</i>
              <b>{t.temple}</b>
              <small>{t.locked}</small>
            </button>
            <button className="region wastes" disabled>
              <i>✦</i>
              <b>{t.wastes}</b>
              <small>{t.locked}</small>
            </button>
            <button className="region citadel" disabled>
              <i>◈</i>
              <b>{t.citadel}</b>
              <small>{t.locked}</small>
            </button>
            <div className="mapGuardian">
              <div className="miniFox">◆</div>
              <span>{name}</span>
            </div>
          </div>
          <article className="missionReveal">
            <span>{t.chapter}</span>
            <h2>{t.ruins}</h2>
            <p>{t.ruinsDesc}</p>
            <button className="button primary" onClick={() => setStage("chapter")}>
              {t.descend}
              <b>→</b>
            </button>
            <button className="textButton" onClick={() => setHistory(true)}>
              {t.history}
            </button>
          </article>
        </section>
      )}
      {stage === "chapter" && (
        <section className="chapterIntro">
          <div className="chapterDepth" aria-hidden="true">
            <i>◆</i>
            <span />
            <span />
            <span />
          </div>
          <div className="chapterCopy">
            <p className="eyebrow">{chapter.kicker}</p>
            <h1>{chapter.title}</h1>
            <p className="chapterLore">{chapter.body}</p>
            <div className="chapterMission">
              <b>{lang === "en" ? "THE DESCENT" : "LA DESCENTE"}</b>
              <p>{chapter.mission}</p>
            </div>
            <button className="button secondary" onClick={() => setStage("map")}>
              <b>←</b>
              {chapter.back}
            </button>
          </div>
        </section>
      )}
      {settings && (
        <div className="modalBackdrop" onClick={() => setSettings(false)}>
          <section
            className="settingsPanel"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="modalClose" onClick={() => setSettings(false)}>
              ×
            </button>
            <p className="eyebrow">RELICBOUND</p>
            <h2>{t.settings}</h2>
            <label>
              {t.guardianName}
              <input
                maxLength={18}
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                placeholder={t.placeholder}
              />
            </label>
            <fieldset>
              <legend>{t.language}</legend>
              <button
                className={lang === "en" ? "selected" : ""}
                onClick={() => chooseLanguage("en")}
              >
                ENGLISH
              </button>
              <button
                className={lang === "fr" ? "selected" : ""}
                onClick={() => chooseLanguage("fr")}
              >
                FRANÇAIS
              </button>
            </fieldset>
            <button className="button primary" onClick={saveSettings}>
              {t.save}
            </button>
            {name && (
              <button
                className="dangerButton"
                onClick={() => {
                  localStorage.removeItem("relicbound-guardian");
                  setName("");
                  setDraft("");
                  setStage("awakening");
                  setSettings(false);
                }}
              >
                {t.reset}
              </button>
            )}
          </section>
        </div>
      )}
      {history && (
        <div className="modalBackdrop" onClick={() => setHistory(false)}>
          <section
            className="historyPanel"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="modalClose" onClick={() => setHistory(false)}>
              ×
            </button>
            <p className="eyebrow">THE ARCHIVE</p>
            <h2>{t.history}</h2>
            <div className="emptyHistory">
              <i>◇</i>
              <p>{t.noHistory}</p>
            </div>
            <button
              className="button secondary"
              onClick={() => setHistory(false)}
            >
              {t.close}
            </button>
          </section>
        </div>
      )}
    </main>
  );
}
