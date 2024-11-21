import * as React from "react"
import Svg, { G, Mask, Path, Defs, ClipPath } from "react-native-svg"

function SoundSvg(props) {
  return (
    <Svg
      width={20}
      height={20}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <G clipPath="url(#clip0_948_1034)">
        <Mask
          id="a"
          style={{
            maskType: "luminance"
          }}
          maskUnits="userSpaceOnUse"
          x={0}
          y={0}
          width={20}
          height={20}
        >
          <Path d="M20 0H0v20h20V0z" fill={props.color || "#939393"} />
        </Mask>
        <G
          mask="url(#a)"
          stroke={props.color || "#939393"}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <Path d="M2.5 13.334V6.667H5l4.167-3.333v13.333L5 13.334H2.5zM10.833 7.5S12.5 7.917 12.5 10s-1.667 2.5-1.667 2.5M12.5 5.834s2.5.694 2.5 4.167c0 3.472-2.5 4.166-2.5 4.166" />
          <Path d="M14.167 4.166s3.333.972 3.333 5.833c0 4.861-3.333 5.834-3.333 5.834" />
        </G>
      </G>
      <Defs>
        <ClipPath id="clip0_948_1034">
          <Path fill={props.color || "#939393"} d="M0 0H20V20H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  )
}

export default SoundSvg
