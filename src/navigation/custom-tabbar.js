import { View, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import HomeSvg from '../assets/svg/homeSvg';
import SettingsSvg from '../assets/svg/settingsSvg';
import OrderSvg from '../assets/svg/orderSvg';
import CartSvg from '../assets/svg/cartSvg';

const CustomTabBar = ({ state, descriptors, navigation }) => {

    return (
        <View style={[styles.naveContainer, {
            backgroundColor: '#ffff',
        }]}>
            {state.routes.map((route, index) => {

                const { options } = descriptors[route.key];
                const label = options.tabBarLabel !== undefined ? options.tabBarLabel : options.title !== undefined ? options.title : route.name;
                const isFocused = state.index === index;

                const onPress = (ey) => {

                    var event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });


                    // if (!isFocused && !event.defaultPrevented) {
                       
                    //     if(route?.name=="pos"||route?.name=="settings"){
                    //         navigation.navigate(route.name, route.params);

                    //     }
                    // }

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name, route.params);
                    }
                    

                };

                const onLongPress = () => {
                    navigation.emit({
                        type: 'tabLongPress',
                        target: route.key,
                    });
                };

                let tabBarIcon = () => {
                    let IconComponent;
                    if (route.name === 'pos') {
                        IconComponent = HomeSvg;
                    } else if (route.name === 'cart') {
                        IconComponent = CartSvg;
                    }
                    else if (route.name === 'orders') {
                        IconComponent = OrderSvg;
                    } else {
                        IconComponent = SettingsSvg;

                    }
                    const iconColor = isFocused ? '#37A196' : '#797A7C';
                    return IconComponent ? (
                        <IconComponent
                            width={26}
                            height={26}
                            color={iconColor}
                        />
                    ) : null;
                }


                return (
                    <TouchableOpacity
                        key={route.key}
                        testID={options.tabBarTestID}
                        accessibilityRole="button"
                        accessibilityState={isFocused ? { selected: true } : {}}
                        accessibilityLabel={options.tabBarAccessibilityLabel}
                        onPress={() => { onPress(route?.name) }}
                        onLongPress={onLongPress}
                        style={styles.naveitemContainer}
                        activeOpacity={0.5}
                    >
                        <View style={{ height: '100%', width: '100%', justifyContent: 'flex-end', alignItems: 'center', gap: 5 }}>
                            <View style={route.name === 'cart' && { marginRight: 5 }}>

                                {tabBarIcon()}

                            </View>

                            {
                                isFocused ?
                                    <View style={{ height: 5, width: '35%', backgroundColor: '#44B9B1', borderRadius: 10 }}>

                                    </View> :
                                    <View style={{ height: 5, width: 10, }} />
                            }

                        </View>
                    </TouchableOpacity>
                );
            })}
        </View>
    )
}

export default CustomTabBar

const styles = StyleSheet.create({
    naveContainer: {
        flexDirection: 'row',
        height: '6%',
        alignItems: 'center',
        justifyContent: 'center',
        bottom: 0,
        width: '100%',
        shadowColor: '#37A19680',
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 50,
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        position: 'absolute',
        borderTopWidth: 1,
        borderColor: '#B8B8B8'
    },
    naveitemContainer: {
        flex: 1,
        alignItems: 'center',
        height: '100%',
        justifyContent: 'flex-start'
    },
    naveTextContainer: {
        color: '#333333',
        alignItems: 'center',
        flexDirection: 'column',
        fontSize: 16
    },
})