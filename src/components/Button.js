import React from "react"

const Button = ({text , onClick, color}) => {
  return (
      <button className={`btn ${color}`}
       onClick={onClick}
       >
           {text}
           </button>
  )
  ;
}

export default Button;


