import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SettingsSvg(props) {
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
                d="M15 18.75a3.75 3.75 0 100-7.5 3.75 3.75 0 000 7.5z"
                stroke={props.color || "#797A7C"}
                strokeWidth={1.5}
            />
            <Path
                d="M17.207 2.69c-.46-.19-1.042-.19-2.207-.19-1.165 0-1.747 0-2.207.19a2.5 2.5 0 00-1.353 1.353c-.115.28-.16.605-.178 1.08-.027.697-.384 1.342-.988 1.69-.604.35-1.342.336-1.959.01-.42-.221-.724-.345-1.024-.384a2.5 2.5 0 00-1.848.495c-.394.303-.686.807-1.268 1.816-.583 1.009-.874 1.513-.939 2.006a2.5 2.5 0 00.496 1.848c.184.24.443.442.845.695.59.371.97 1.003.97 1.701 0 .698-.38 1.33-.97 1.701-.402.253-.661.454-.846.695a2.5 2.5 0 00-.495 1.848c.065.493.356.997.939 2.006.582 1.009.873 1.513 1.268 1.816a2.5 2.5 0 001.848.495c.3-.04.605-.163 1.024-.384.617-.326 1.355-.34 1.959.01.604.348.961.993.988 1.69.017.475.063.8.178 1.08a2.5 2.5 0 001.353 1.353c.46.19 1.042.19 2.207.19 1.165 0 1.747 0 2.207-.19a2.5 2.5 0 001.353-1.353c.116-.28.161-.605.179-1.08.026-.697.383-1.342.987-1.69.605-.35 1.342-.337 1.959-.01.42.221.724.345 1.024.384a2.5 2.5 0 001.848-.495c.395-.303.686-.807 1.268-1.816.583-1.009.874-1.513.939-2.006a2.5 2.5 0 00-.495-1.849c-.185-.24-.444-.442-.845-.694-.591-.371-.971-1.004-.971-1.701 0-.698.38-1.33.97-1.701.403-.253.662-.454.846-.695a2.5 2.5 0 00.495-1.848c-.065-.493-.356-.997-.939-2.006-.582-1.009-.873-1.513-1.268-1.816a2.5 2.5 0 00-1.848-.495c-.3.04-.604.163-1.024.385-.617.325-1.354.339-1.958-.01-.605-.35-.962-.994-.988-1.692-.018-.474-.063-.8-.18-1.079a2.5 2.5 0 00-1.352-1.353z"
                stroke={props.color || "#797A7C"}
                strokeWidth={1.5}
            />
        </Svg>
    )
}

export default SettingsSvg
