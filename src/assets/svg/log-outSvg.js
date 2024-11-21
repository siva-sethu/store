import * as React from "react"
import Svg, { Path } from "react-native-svg"

function LogoutSvg(props) {
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
                d="M7.502 5.833c.01-1.813.09-2.794.73-3.435.733-.732 1.911-.732 4.268-.732h.834c2.357 0 3.535 0 4.267.732.733.732.733 1.911.733 4.268v6.667c0 2.357 0 3.535-.733 4.267-.732.733-1.91.733-4.267.733H12.5c-2.357 0-3.535 0-4.268-.733-.64-.64-.72-1.622-.73-3.434"
                stroke={props.color || "#939393"}
                strokeLinecap="round"
            />
            <Path
                d="M12.833 10.5H2m0 0L4.917 8M2 10.5L4.917 13"
                stroke={props.color || "#939393"}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </Svg>
    )
}

export default LogoutSvg
