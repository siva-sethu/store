import * as React from "react"
import Svg, { Path } from "react-native-svg"

function HomeSvg(props) {
  return (
    <Svg
      width={30}
      height={30}
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M2.5 15.255c0-2.86 0-4.29.649-5.477.649-1.185 1.835-1.921 4.206-3.393l2.5-1.551C12.362 3.278 13.615 2.5 15 2.5c1.385 0 2.638.778 5.145 2.334l2.5 1.551c2.371 1.472 3.557 2.208 4.206 3.393.649 1.186.649 2.616.649 5.477v1.901c0 4.876 0 7.314-1.465 8.83C24.572 27.5 22.214 27.5 17.5 27.5h-5c-4.714 0-7.071 0-8.536-1.515C2.5 24.47 2.5 22.032 2.5 17.156v-1.901z"
        stroke={props.color || "#797A7C"}
        strokeWidth={1.5}
      />
      <Path
        d="M18.75 22.5h-7.5"
        stroke={props.color || "#797A7C"}
        strokeWidth={1.5}
        strokeLinecap="round"
      />
    </Svg>
  )
}

export default HomeSvg
