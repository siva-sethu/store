import * as React from "react"
import Svg, { G, Path, Defs } from "react-native-svg"


function ClearBackSpace(props) {
    return (
        <Svg
            width={39}
            height={28}
            viewBox="0 0 39 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <G filter="url(#filter0_d_1_3193)">
                <Path
                    d="M10.79 1.496A3 3 0 0113.024.5H31.54a3 3 0 013 3v13.35a3 3 0 01-3 3H13.023a3 3 0 01-2.232-.996l-5.992-6.675a3 3 0 010-4.008l5.992-6.675z"
                    fill={props.color || "#E76F51"}
                />
                <Path
                    d="M18.263 14a.6.6 0 000 .84.595.595 0 00.836 0l8.303-8.491a.6.6 0 000-.84.595.595 0 00-.836 0l-8.303 8.492z"
                    fill={"#fff"}
                />
                <Path
                    d="M26.566 14.84a.595.595 0 00.836 0 .6.6 0 000-.84L19.1 5.51a.595.595 0 00-.836 0 .6.6 0 000 .839l8.303 8.492z"
                    fill="#fff"
                />
            </G>
            <Defs></Defs>
        </Svg>
    )
}

export default ClearBackSpace
