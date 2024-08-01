import { useState, useEffect, useMemo } from "react";
import "./style/index.css";
import {
  Popover,
  PopoverHandler,
  PopoverContent,
  Typography,
} from "@material-tailwind/react";
import Deck from "./Components/Deck/Deck";
import Ornement from "./Components/Ornement/Ornement";
import FullScreenButton from "./Components/Fullscreen";
import OrnementLeft from "./Components/Ornement/OrnementLeft";
import OrnementRight from "./Components/Ornement/OrnementRight";
import useTranslations from "./hooks/useTranslations";
import TitleTranslation from "./../public/Data/TitleTranslation.json";

function App() {
  const { translations, languages } = useTranslations();
  const [language, setLanguage] = useState(
    localStorage.getItem("language") || "EN"
  );

  const [selectedDeck, setSelectedDeck] = useState("RMS TITANIC");

  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  const changeLanguage = (lang) => {
    setLanguage(lang);
  };

  const getTranslation = (key) => {
    const translation = TitleTranslation.find((item) =>
      item?.translation?.[key] ? item : null
    );
    return translation ? translation.translation[language] : "";
  };

  const handleSelectChange = (event) => {
    setSelectedDeck(event.target.value);
  };

  const data = useMemo(
    () => translations[language] || [],
    [language, translations]
  );

  return (
    <div className="p-4 relative">
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
            <p className="font-brygada">{getTranslation("FR")}</p>
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
                {languages.map((lang) => (
                  <div
                    key={lang}
                    onClick={() => changeLanguage(lang)}
                    className="mb-4 flex items-center gap-4 border-b border-blue-gray-50 pb-4 cursor-pointer"
                  >
                    <div
                      className={`fr border rounded-full bg-[#0d1625] w-[30px] h-[30px] flex items-center justify-center`}
                    >
                      <p className="text-white">{lang}</p>
                    </div>
                    <div>
                      <Typography variant="h6" color="blue-gray">
                        {lang}
                      </Typography>
                    </div>
                  </div>
                ))}
              </PopoverContent>
            </Popover>
          </div>
        </header>
      </div>
      <div className="flex justify-center">
        <div className="separator border mt-6 w-[80%]"></div>
      </div>
      <main className="p-10">
        <Deck
          selectedDeck={selectedDeck}
          setSelectedDeck={setSelectedDeck}
          data={data}
        />
      </main>
      <footer>
        <Ornement />
        <FullScreenButton />
      </footer>
    </div>
  );
}

export default App;
