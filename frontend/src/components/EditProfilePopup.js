import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [saveButtonText, setSaveButtonText] = React.useState("");

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]
  );

  React.useEffect(() => {
    changeSaveButtonText(props.isLoading)
  }, [props.isLoading]
  );

  function changeSaveButtonText(ButtonState) {
    if (ButtonState) { setSaveButtonText("Сохранение...") }
    else { setSaveButtonText("Сохранить") }
  }

  function handleChangeName(event) {
    setName(event.target.value)
  }

  function handleChangeDescription(event) {
    setDescription(event.target.value)
  }

  function handleSubmit(event) {
    event.preventDefault();
    props.onUpdateUser(name, description);
  }

  return (
    <PopupWithForm title="Редактировать профиль" name="edit"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      saveButtonText={saveButtonText}
      children={
        <>
          <div className="popup__field">
            <input
              type="text"
              className="popup__item popup__item_el_name"
              id="avatar-name"
              name="name"
              placeholder="Имя"
              minLength="2"
              maxLength="40"
              required
              value={name || ""}
              onChange={handleChangeName} />
            <p className="popup__error avatar-name-error"></p>
          </div>
          <div className="popup__field">
            <input
              type="text"
              className="popup__item popup__item_el_about"
              id="avatar-about"
              name="description"
              placeholder="Вид деятельности"
              minLength="2" maxLength="200"
              required
              value={description || ""}
              onChange={handleChangeDescription} />
            <p className="popup__error avatar-about-error"></p>
          </div>
        </>}
    />)
}

export default EditProfilePopup;

