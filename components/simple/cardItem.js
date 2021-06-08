import React from 'react';

function CardItem(props){
    const {img, text, backColor} = props;
    return(
        <div className = "x-cardItem" style = {{backgroundColor: `#${backColor}`}}>
            <div><img src = {img} alt = "icons" style = {{color: "white"}} /></div>
            <div className = "x-font3">{text}</div>
        </div>
    )
}

export default CardItem;