import * as React from "react"
import Svg, { Path } from "react-native-svg"

function BackSvg(props) {
    return (
        <Svg
            width={20}
            height={20}
            style={{ bottom: 2 }}
            viewBox="0 0 13 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <Path
                d="M10.947 23.211a.681.681 0 00.998-.055.773.773 0 00-.053-1.052l-10.16-9.686a.566.566 0 010-.858l10.16-9.355a.804.804 0 00.08-1.052.707.707 0 00-.998-.083L.813 10.453a2.097 2.097 0 00-.027 3.072l10.16 9.686z"
                fill="#000"
            />
        </Svg>
    )
}

export default BackSvg
