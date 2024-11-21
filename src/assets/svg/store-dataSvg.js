import * as React from "react"
import Svg, { Path } from "react-native-svg"

function StoreDataSvg(props) {
    return (
        <Svg
            width={20}
            height={20}
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <Path
                d="M15 10v4.167c0 1.381-2.239 2.5-5 2.5s-5-1.119-5-2.5v-4.166m10 0V5.834m0 4.167c0 1.38-2.239 2.5-5 2.5S5 11.38 5 10m0 0V5.834m10 0c0-1.38-2.239-2.5-5-2.5s-5 1.12-5 2.5m10 0c0 1.38-2.239 2.5-5 2.5s-5-1.12-5-2.5"
                stroke={props.color || "#939393"}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </Svg>
    )
}

export default StoreDataSvg
