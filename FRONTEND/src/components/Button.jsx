import React from 'react'

function Button({
    children,
    type="button",
    bgColor="red",
    textColor="black",
    className="",
    ...props
}) {
  return (
    <button className={`${bgColor} ${textColor} ${className}`} {...props} type={type}>
        {children}
    </button>
  )
}

export default Button
