import { useState, useEffect, useRef } from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

const Deck = ({ selectedDeck, data }) => {
  const [details, setDetails] = useState([]);
  const [firstClass, setFirstClass] = useState("");
  const [secondClass, setSecondClass] = useState("");
  const [thirdClass, setThirdClass] = useState("");
  const [room, setRoom] = useState("");

  const transformComponentRef = useRef(null);

  useEffect(() => {
    const deckDetails = data?.find((deck) => deck.name === selectedDeck);
    setDetails(deckDetails ? deckDetails.details : []);
    setFirstClass(deckDetails ? deckDetails.firstClass : "");
    setSecondClass(deckDetails ? deckDetails.secondClass : "");
    setThirdClass(deckDetails ? deckDetails.thirdClass : "");
    setRoom(deckDetails ? deckDetails.room : "");
  }, [selectedDeck, data]);

  const divideDetailsIntoColumns = (details, columns) => {
    const itemsPerColumn = Math.ceil(details.length / columns);
    return Array.from({ length: columns }, (v, i) =>
      details.slice(i * itemsPerColumn, i * itemsPerColumn + itemsPerColumn)
    );
  };

  const detailColumns = divideDetailsIntoColumns(details, 3);

  const handleZoomIn = () => {
    if (transformComponentRef.current) {
      transformComponentRef.current.zoomIn();
    }
  };

  const handleZoomOut = () => {
    if (transformComponentRef.current) {
      transformComponentRef.current.zoomOut();
    }
  };

  return (
    <div>
      <div className="deck-view mt-10 p-10">
        <TransformWrapper ref={transformComponentRef}>
          <TransformComponent>
            <img
              src={`/deck/${selectedDeck}.gif`}
              alt={`${selectedDeck} plan`}
            />
          </TransformComponent>
        </TransformWrapper>
      </div>
      <div className="zoom flex gap-6 items-center justify-center mt-4">
        <div className="zoom-in" onClick={handleZoomIn}>
          <i className="fa-solid fa-magnifying-glass-plus text-2xl cursor-pointer"></i>
        </div>
        <div className="zoom-out" onClick={handleZoomOut}>
          <i className="fa-solid fa-magnifying-glass-minus text-2xl cursor-pointer"></i>
        </div>
      </div>
      <div className="deck-details mt-10 flex justify-between p-10 gap-10">
        <div className="detail-item w-[40%] flex flex-col gap-4">
          <h3>{selectedDeck}</h3>
          <div className="class-room flex flex-col gap-4">
            <p className="text-xs w-[70%]">{firstClass}</p>
            <p className="text-xs w-[70%]">{room}</p>
            <p className="text-xs w-[70%]">{secondClass}</p>
            <p className="text-xs w-[70%]">{thirdClass}</p>
          </div>
        </div>
        <div className="details-deck-space w-[60%] h-full border border-white p-4">
          <div className="detail-room flex justify-between w-full">
            {detailColumns.map((column, columnIndex) => (
              <div className="detail-column w-[30%]" key={columnIndex}>
                {column.map((detail, index) => (
                  <p className="text-xs" key={index}>
                    {detail.title} - <span>{detail.description}</span>
                  </p>
                ))}
              </div>
            ))}
            <div className="comodities text-xs">
              <p className="p-1">DUTCH DOOR</p>
              <p className="p-1">LAVATORY SINK</p>
              <p className="p-1">SINK</p>
              <p className="p-1">UPHOLSTERY</p>
              <p className="p-1">URINALS</p>
              <p className="p-1">WALL SEAT TEAKS</p>
              <p className="p-1">WALL SEAT UPHOLSTERED</p>
              <p className="p-1">WASH BASIN</p>
              <p className="p-1">WATER CLOSED</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Deck;
