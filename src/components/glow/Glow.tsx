import { StyleSheet, useWindowDimensions, View } from 'react-native'
import React from 'react'
import Svg, { Defs, RadialGradient, Rect, Stop } from 'react-native-svg';

const Glow = () => {
    const {width, height} = useWindowDimensions()
  return (
    <View style = {styles.container}>
      <Svg height={height} width={width} viewBox={`0 0 ${width} ${height}`}>
        <Defs>
          <RadialGradient
            id="grad"
            cx="150"
            cy="150"
            rx="150"
            ry= "150"
            fx="150"
            fy="150"
            gradientUnits="userSpaceOnUse"
          >
            <Stop offset="0%" stopColor="#082B60" stopOpacity="0.9" />
            <Stop offset="50%" stopColor="#082B60" stopOpacity="0.6" />
            <Stop offset="100%" stopColor="#010407" stopOpacity="1" />
          </RadialGradient>
        </Defs>
        <Rect x="0" y="0" width={width} height={height} fill="url(#grad)" />
      </Svg>
    </View>
  );
}

export default Glow

const styles = StyleSheet.create({
  container: {
    height: 381,
    width: '100%',
   
    // backgroundColor: '#010507',
  },
});