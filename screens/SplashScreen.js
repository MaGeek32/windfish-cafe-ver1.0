//A splash page shows an animation before entering the home page

import React, { useEffect, useRef } from 'react'
import { Animated, Dimensions, Image, Text, View, StyleSheet } from "react-native"
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { GlobalStyles } from '../constants/styles'

// Logo....
import Logo from '../assets/logo.png'
import Home from './Home'

const BGColor = GlobalStyles.colors.primary500

export default function SplashScreen () {

    // SafeArea Value...
    const edges = useSafeAreaInsets()

    // Animation Values....
    const startAnimation = useRef(new Animated.Value(0)).current

    // Scaling Down Both logo and Title...
    const scaleLogo = useRef(new Animated.Value(1)).current
    const scaleTitle = useRef(new Animated.Value(1)).current

    // Offset Animation....
    const moveLogo = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current
    const moveTitle = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current

    // Animating COntent...
    const contentTransition = useRef(new Animated.Value(Dimensions.get('window').height)).current

    // Animation Done....
    useEffect(() => {

        // Starting Animation after 500ms....
        setTimeout(() => {

            // Parallel Animation...
            Animated.parallel([
                Animated.timing(
                    startAnimation,
                    {
                        // For same Height for non safe Area Devices...
                        toValue: -Dimensions.get('window').height + (edges.top + 65),
                        useNativeDriver: true
                    }
                ),
                Animated.timing(
                    scaleLogo,
                    {
                        // Scaling to 0.35
                        toValue: 0.5,
                        useNativeDriver: true
                    }
                ),
                Animated.timing(
                    scaleTitle,
                    {
                        // Scaling to 0.8
                        toValue: 0.8,
                        useNativeDriver: true
                    }
                ),
                Animated.timing(
                    moveLogo,
                    {
                        // Moving to Right Most...
                        toValue: {
                            // x: (Dimensions.get("window").width / 2) - 50,
                            x: 0,
                            y: (Dimensions.get('window').height / 2) - 5
                        },
                        useNativeDriver: true
                    }
                ),
                Animated.timing(
                    moveTitle,
                    {
                        // Moving to Right Most...
                        toValue: {
                            x: 0,
                            // Since image size is 100...
                            y: (Dimensions.get('window').height / 2) - 90
                        },
                        useNativeDriver: true
                    }
                ),
                Animated.timing(
                    contentTransition,
                    {
                        toValue: 0,
                        useNativeDriver: true
                    }
                )
            ])
                .start()

        }, 800)

    }, [])

    // Going to Move Up like Nav Bar...
    return (

        <View style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
        }}>

            <Animated.View style={{
                flex: 1,
                backgroundColor: BGColor,
                // zIndex: 1,
                transform: [
                    { translateY: startAnimation }
                ],
                // display: 'none'
            }}>
                {/* <ImageBackground source={require("../assets/background.png")} resizeMode="cover" style={styles.image}> */}

                <Animated.View style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',

                }}>
                    <Animated.Image source={Logo} style={{
                        width: 100,
                        height: 100,
                        marginBottom: 20,

                        transform: [
                            { translateX: moveLogo.x },
                            { translateY: moveLogo.y },
                            { scale: scaleLogo },

                        ]
                    }}></Animated.Image>
                    <Animated.Text style={{
                        fontSize: 25,
                        fontWeight: 'bold',
                        color: 'white',
                        transform: [
                            { translateY: moveTitle.y },
                            { scale: scaleTitle }
                        ]
                    }}>Windfish Cafe</Animated.Text>

                </Animated.View>
                {/* </ImageBackground> */}

            </Animated.View>

            <Animated.View style={{
                position: 'absolute',
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                backgroundColor: 'rgba(0,0,0,0.04)',
                zIndex: 0,
                transform: [
                    { translateY: contentTransition }
                ]
            }}>


                <Home></Home>

            </Animated.View>

        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        flex: 1,
        justifyContent: "center"
    },
    text: {
        color: "white",
        fontSize: 42,
        lineHeight: 84,
        fontWeight: "bold",
        textAlign: "center",
        backgroundColor: "#000000c0"
    }
})