import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

class Card extends React.Component {
  static contextType = CurrentUserContext;
 
  handleClick = () => {
    this.props.onCardClick(this.props.data)
  }

  handleLikeClick = () => {
    this.props.onCardLike(this.props.data)
  }

  handleDeleteCard = () => {
    this.props.onCardDelete(this.props.data)
  }

  render() {
    const isOwn = this.props.data.ownerId === this.context._id;
    const isLiked = this.props.data.likes.some(i => i._id === this.context._id);
    const cardLikeButtonClassName = (`element__like ${isLiked && 'element__like_type_active'}`);
    return (
      <div className="element" key={this.props.data._id}>
        {isOwn && <button className="element__trash" type="button" onClick={this.handleDeleteCard}></button>}
        <img className="element__image" src={this.props.data.link} alt={this.props.data.name} onClick={this.handleClick} />
        <div className="element__title">
          <p className="element__text">{this.props.data.name}</p>
          <div className="element__block-like">
            <button className={cardLikeButtonClassName} type="button" onClick={this.handleLikeClick}
            ></button>
            <p className="element__count-like">{this.props.data.likesCount}</p>
          </div>
        </div>
      </div>
    )
  }
}
export default Card;
