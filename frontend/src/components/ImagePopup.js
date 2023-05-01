import React from "react";

function ImagePopup(props) {
  const [classOpen, setClassOpen] = React.useState("")

  React.useEffect(() => {
    if (Object.entries(props.card).length !== 0) {
      setClassOpen("popup_opened")
    } else { setClassOpen("") }
  }, [props.card])

  return (
    <div className={`popup popup_type_image ${classOpen}`}>
      <form className="popup__content-image" name="ImageCard">
        <button className="popup__close-button" type="button" aria-label="Закрыть"
          onClick={props.onClose}></button>
        <figure className="popup__figure">
          <img className="popup__image" src={props.card.link} alt={props.card.name} />
          <figcaption className="popup__caption">{props.card.name}</figcaption>
        </figure>
      </form>
    </div>
  )
}

export default ImagePopup;
