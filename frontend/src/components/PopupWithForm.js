import React from "react";
import FormValidator from "../utils/FormValidator";
import { validationConfig } from "../utils/utils";
function PopupWithForm(props) {
  const popupRef = React.useRef();
 
  React.useEffect(() => {
    const PopupValidator = new FormValidator(validationConfig, popupRef.current);
    PopupValidator.enableValidation();
  }, [props.isOpen])

  return (
    <div className={`popup popup_type_${props.name} ${props.isOpen ? "popup_opened": ""}`}>
      <form ref={popupRef} className="popup__content" name={props.name} onSubmit={props.onSubmit}>
        <button aria-label="Закрыть" className="popup__close-button" type="button" onClick={props.onClose}></button>
        <h2 className="popup__title">{props.title}</h2>
        <fieldset className="popup__fieldset">
          {props.children}
          <button type="submit" className="popup__save-button">{props.saveButtonText}</button>
        </fieldset>
      </form>
    </div>
  )
}

export default PopupWithForm;
