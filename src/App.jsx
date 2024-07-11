import { useState, useEffect } from "react";
import "./style/index.css";
import {
  Popover,
  PopoverHandler,
  PopoverContent,
  Typography,
} from "@material-tailwind/react";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import deckDataEN from "./Data/galerieEN.json";
import deckDataFR from "./Data/galerieFR.json";
import Deck from "./Components/Deck/Deck";
import Ornement from "./Components/Ornement/Ornement";
import FullScreenButton from "./Components/Fullscreen";
import OrnementLeft from "./Components/Ornement/OrnementLeft";
import OrnementRight from "./Components/Ornement/OrnementRight";

function App() {
  const [data, setData] = useState([]);
  const [language, setLanguage] = useState(
    localStorage.getItem("language") || "EN"
  );
  const [selectedDeck, setSelectedDeck] = useState("D-DECK");

  useEffect(() => {
    const loadData = () => {
      if (language === "FR") {
        setData(deckDataFR);
      } else {
        setData(deckDataEN);
      }
    };
    loadData();
  }, [language]);

  const changeLanguage = (lang) => {
    setLanguage(lang);
    localStorage.setItem("language", lang);
  };

  const getTranslation = (key) => {
    const translations = {
      EN: {
        subTitle: "TITANIC BLUESCREEN LAYOUT",
      },
      FR: {
        subTitle: "TITANIC PLAN DE BLUESCREEN",
      },
    };
    return translations[language][key];
  };

  const handleSelectChange = (event) => {
    setSelectedDeck(event.target.value);
  };

  return (
    <div className="p-4">
      <OrnementLeft />
      <OrnementRight />
      <div className="flex justify-center">
        <header className="flex  sm:flex-row justify-center items-center gap-4 w-[65%]">
          <div className="deck-selector">
            <select
              value={selectedDeck}
              onChange={handleSelectChange}
              className="text-black p-4 border rounded-full w-50 focus:outline-none focus:border-transparent"
            >
              {data.map((deck) => (
                <option key={deck.name} value={deck.name}>
                  {deck.name}
                </option>
              ))}
            </select>
          </div>
          <div className="grade flex flex-col gap-1 justify-center w-full text-4xl items-center">
            <h1 className="benchnine-bold">{selectedDeck}</h1>
            <p className="font-brygada">{getTranslation("subTitle")}</p>
          </div>
          <div className="language flex gap-6">
            <Popover placement="bottom-end">
              <PopoverHandler>
                <button>
                  <div className="fr border rounded-full bg-white w-[60px] h-[60px] flex items-center justify-center">
                    <p className="text-black">{language}</p>
                  </div>
                </button>
              </PopoverHandler>
              <PopoverContent className="w-72 pb-0">
                <div
                  onClick={() => changeLanguage("FR")}
                  className="mb-4 flex items-center gap-4 border-b border-blue-gray-50 pb-4 cursor-pointer"
                >
                  <div className="fr border rounded-full bg-[#0d1625] w-[30px] h-[30px] flex items-center justify-center">
                    <p className="text-white">FR</p>
                  </div>
                  <div>
                    <Typography variant="h6" color="blue-gray">
                      Français
                    </Typography>
                  </div>
                </div>
                <div
                  onClick={() => changeLanguage("EN")}
                  className="flex items-center gap-4 border-b border-blue-gray-50 pb-4 cursor-pointer"
                >
                  <div className="fr border rounded-full bg-[#0d1625] w-[30px] h-[30px] flex items-center justify-center">
                    <p className="text-white">EN</p>
                  </div>
                  <div>
                    <Typography variant="h6" color="blue-gray">
                      English
                    </Typography>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </header>
      </div>
      <div className="flex justify-center">
        <div className="separator border mt-6 w-[80%]"></div>
      </div>
      <main className="p-10">
        <TransitionGroup>
          {/* <CSSTransition key={selectedDeck} timeout={500} classNames="bounce"> */}
          <Deck
            selectedDeck={selectedDeck}
            setSelectedDeck={setSelectedDeck}
            data={data}
          />
          {/* </CSSTransition> */}
        </TransitionGroup>
      </main>
      <Ornement />
      <FullScreenButton />
    </div>
  );
}

export default App;
