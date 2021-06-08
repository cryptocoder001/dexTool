import React from 'react';

function CircleToken(props){
    const {img, text, border} = props;
    return(
            <span  className = "m-5 text-center">
                <div>
                    <img src = {img} width = "80px" height = "80px" alt = "token" className = "x-circleToken"/>
                </div>
                <span className = "x-font1">{text}</span>
            </span>
    )
}

export default CircleToken;