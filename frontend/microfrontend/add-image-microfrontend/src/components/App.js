import api from "../utils/api";
import React from "react";
import AddPlacePopup from "../../../../src/components/AddPlacePopup";

function App() {

  const [cards, setCards] = React.useState([]);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);

  function handleAddPlaceSubmit(newCard) {
    api
      .addCard(newCard)
      .then((newCardFull) => {
        setCards([newCardFull, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function closeAllPopups() {
    setIsAddPlacePopupOpen(false);
  }


  return (
        <div className="page__content">
          <AddPlacePopup
              isOpen={isAddPlacePopupOpen}
              onAddPlace={handleAddPlaceSubmit}
              onClose={closeAllPopups}
          />
        </div>
  );

}

export default App;
