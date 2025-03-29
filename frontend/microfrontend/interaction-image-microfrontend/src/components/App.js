import React from "react";
import {Switch} from "react-router-dom";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import api from "../utils/api";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [cards, setCards] = React.useState([]);

  // Запрос к API за информацией о пользователе и массиве карточек выполняется единожды, при монтировании.
  React.useEffect(() => {
    api
      .getAppInfo()
      .then(([cardData]) => {
        setCards(cardData);
      })
      .catch((err) => console.log(err));
  }, []);

  function closeAllPopups() {
    setSelectedCard(null);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((cards) =>
          cards.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => console.log(err));
  }

  function handleCardDelete(card) {
    api
      .removeCard(card._id)
      .then(() => {
        setCards((cards) => cards.filter((c) => c._id !== card._id));
      })
      .catch((err) => console.log(err));
  }

  return (

      <div className="page__content">
        <Switch>
          <ProtectedRoute
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
          />

        </Switch>
        <Footer />

        <PopupWithForm title="Вы уверены?" name="remove-card" buttonText="Да" />

        <ImagePopup card={selectedCard} onClose={closeAllPopups} />

      </div>
  );
}

export default App;
