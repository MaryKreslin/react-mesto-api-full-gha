import React from "react";
import success from "../images/auth-success.png";
import failed from "../images/auth-failed.png";

const InfoTooltip = (props) => {

    const [infoImage, setinfoImage] = React.useState();

    React.useEffect(() => {
        if (props.type === "reg-success") {
            setinfoImage( success )
        } else {
            setinfoImage( failed )
        }
    }, [props.type])

    const handleClose = () => { props.onClose(props.type) }

    return (
        <div className={`popup popup_type_infoTooltip ${props.isOpen ? "popup_opened" : ""}`}>
            <form className="popup__content popup__content_type_info">
                <button aria-label="Закрыть" className="popup__close-button" type="button" onClick={handleClose}></button>
                <fieldset className="popup__fieldset popup__fielset_type_info">
                    <img src={infoImage} className="popup__infoImage" alt="" />
                    <p className="popup__title popup__title_type_info">{props.text}</p>
                </fieldset>
            </form>
        </div>
    )
}
export default InfoTooltip;