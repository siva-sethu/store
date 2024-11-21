import * as React from "react"
import Svg, { Path } from "react-native-svg"

function LayoutSvg(props) {
    return (
        <Svg
            width={16}
            height={16}
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <Path
                d="M5.5 1.334H3c-.92 0-1.667.746-1.667 1.667v10c0 .92.746 1.666 1.667 1.666h2.5m0-13.333H13c.92 0 1.667.746 1.667 1.667v4.166M5.5 1.334v5.833m0 7.5v-7.5m0 7.5h4.583m4.584-7.5v5.834c0 .92-.747 1.666-1.667 1.666h-2.917m4.584-7.5h-4.584m-4.583 0h4.583m0 7.5v-7.5"
                stroke={props.color || "#939393"}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </Svg>
    )
}

export default LayoutSvg
