import * as React from "react"
import Svg, { Path } from "react-native-svg"

function CartSvg(props) {
  return (
    <Svg
      width={25}
      height={24}
      viewBox="0 0 25 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M5.541 3.25h18.376l-2.5 8.75H6.887m15.78 5h-15L5.167.75h-3.75M8.917 22a1.25 1.25 0 11-2.5 0 1.25 1.25 0 012.5 0zm13.75 0a1.25 1.25 0 11-2.5 0 1.25 1.25 0 012.5 0z"
        stroke={props.color || "#797A7C"}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default CartSvg
