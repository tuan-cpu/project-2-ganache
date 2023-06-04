import React from 'react'

const Button = ({bgColor,color,size,text,borderRadius, customFunction}) => {
  return (
    <button type='button' style={{backgroundColor:bgColor, color, borderRadius}} className={`text-${size} p-3 hover:drop-shadow-xl`} onClick={customFunction}>
      {text}
    </button>
  )
}

export default Button;