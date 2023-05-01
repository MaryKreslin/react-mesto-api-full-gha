import React from "react";
import { Link } from 'react-router-dom';

const Register = (props) => {
    const [formValue, setFormValue] = React.useState({
        email: '',
        password: '',
    })

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormValue({
            ...formValue,
            [name]: value
        });
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        props.onSubmit(formValue.password, formValue.email)
    }

    return (
        <div className="form">
            <form onSubmit={handleSubmit} className="form__content" name="register">
                <h2 className="popup__title popup__title_theme_black">Регистрация</h2>
                <fieldset className="popup__fieldset">
                    <div className="popup__field">
                        <input
                            type="email"
                            className="popup__item popup__item_el_name popup__item_theme_black"
                            id="email"
                            name="email"
                            placeholder="Email"
                            value={formValue.email}
                            onChange={handleChange}
                            required
                        />
                        <p className="popup__error email-error popup__error_theme_black"></p>
                    </div>
                    <div className="popup__field">
                        <input
                            type="password"
                            className="popup__item popup__item_el_about popup__item_theme_black"
                            id="password"
                            name="password"
                            placeholder="Пароль"
                            minLength="8" maxLength="200"
                            value={formValue.password}
                            onChange={handleChange}
                            required
                        />
                        <p className="popup__error password-error popup__error_theme_black"></p>
                    </div>
                    <button type="submit" className="popup__save-button popup__save-button_theme_black">Зарегистрироваться</button>
                    <div className="form__link">
                        <p className="form__text">Уже зарегистрированы?</p>
                        <Link to="/sign-in" className="form__text">Войти</Link>
                    </div>
                </fieldset>
            </form>
        </div>
    )
}
export default Register;