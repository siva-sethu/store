import * as React from "react"
import Svg, { Path } from "react-native-svg"

function AcceptanceSvg(props) {
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
                d="M14.956 1.25H5.044A1.75 1.75 0 003.294 3v14a1.75 1.75 0 001.75 1.75h9.912a1.75 1.75 0 001.75-1.75V3a1.75 1.75 0 00-1.75-1.75zM15.544 17a.587.587 0 01-.588.581H5.044A.587.587 0 014.456 17V3a.588.588 0 01.588-.581h9.912a.587.587 0 01.588.581v14z"
                fill={props.color || "#939393"}
            />
            <Path
                d="M13.125 7.212l-4.631 4.375-1.62-1.5a.582.582 0 10-.774.85l1.969 1.875a.588.588 0 00.8 0l5-4.725a.581.581 0 10-.744-.875z"
                fill={props.color || "#939393"}
            />
        </Svg>
    )
}

export default AcceptanceSvg
