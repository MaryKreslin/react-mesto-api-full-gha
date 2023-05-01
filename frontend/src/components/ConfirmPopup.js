import React from "react";
import PopupWithForm from "./PopupWithForm";

function ConfirmPopup(props) {

  const [saveButtonText, setSaveButtonText] = React.useState('');

  function changeSaveButtonText(ButtonState) {
    if (ButtonState) { setSaveButtonText('Удаление...') }
    else { setSaveButtonText('Да') }
  }
  React.useEffect(() => { changeSaveButtonText(props.isLoading) }, [props.isLoading])


  function onConfirm(event) {
    event.preventDefault();
    props.onConfirmSubmit(props.cardToDelete)
  }

  return (
    <PopupWithForm title='Вы уверены?' name='confirm'
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={onConfirm}
      saveButtonText={saveButtonText}
    />
  )
}
export default ConfirmPopup;
