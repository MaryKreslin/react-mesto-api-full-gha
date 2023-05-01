import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
  const [avatar, setAvatar] = React.useState('');
  const [saveButtonText, setSaveButtonText] = React.useState('');

  const avatarRef = React.useRef();

  function changeSaveButtonText(ButtonState) {
    if (ButtonState) { setSaveButtonText('Сохранение...') }
    else { setSaveButtonText('Сохранить') }
  }

  React.useEffect(() => { changeSaveButtonText(props.isLoading) }, [props.isLoading])

  function handleChangeAvatar(event) {
    setAvatar(event.target.value)
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    setAvatar('');
    props.onUpdateAvatar(avatarRef.current.defaultValue)
  }

  return (
    <PopupWithForm title='Обновить аватар' name='editAvatarPhoto'
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      saveButtonText={saveButtonText}
      children={<>
        <div className="popup__field">
          <input ref={avatarRef} type="url" className="popup__item popup__item_el_about" id="avatar" name="avatar"
            placeholder="Ссылка на картинку" value={avatar} onChange={handleChangeAvatar} required />
          <p className="popup__error avatar-error"></p>
        </div>
      </>}
    />
  )

}
export default EditAvatarPopup;
