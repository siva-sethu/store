import * as React from "react"
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg"

function OrderSvg(props) {
    return (
        <Svg
            width={31}
            height={30}
            viewBox="0 0 31 30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <G clipPath="url(#clip0_933_168)">
                <G
                    clipPath="url(#clip1_933_168)"
                    stroke={props.color || "#797A7C"}
                    strokeWidth={1.5}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <Path d="M4.083 19.355v10.8M4.083 21.154h6.3a3.6 3.6 0 013.6 3.6h4.5a3.6 3.6 0 013.6 3.6h-18M10.384 24.754h3.6M5.884 15.754h25.2M18.486 3.154v1.8M29.285 15.755a10.8 10.8 0 10-21.6 0M16.685 19.355h8.58a3.6 3.6 0 003.215-1.985l.759-1.522" />
                </G>
            </G>
            <Defs>
                <ClipPath id="clip0_933_168">
                    <Path fill="#fff" transform="translate(.333)" d="M0 0H30V30H0z" />
                </ClipPath>
                <ClipPath id="clip1_933_168">
                    <Path
                        fill="#fff"
                        transform="translate(3.333 2.25)"
                        d="M0 0H28.5V30H0z"
                    />
                </ClipPath>
            </Defs>
        </Svg>
    )
}

export default OrderSvg
