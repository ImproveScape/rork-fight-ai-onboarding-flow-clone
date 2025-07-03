import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Svg, { Polygon, Circle, Line, Text as SvgText } from 'react-native-svg';
import Colors from '@/constants/colors';
import { theme } from '@/constants/theme';

const skills = ['Footwork', 'Defense', 'Conditioning', 'Speed', 'Technique'];
const traditionalData = [3, 4, 3, 3, 4]; // Out of 10
const fightAIData = [8, 9, 7, 8, 9]; // Out of 10

export default function RadarChart() {
  const size = 280;
  const center = size / 2;
  const maxRadius = 100;
  const levels = 5;

  const angleStep = (2 * Math.PI) / skills.length;

  const getPoint = (value: number, index: number) => {
    const angle = index * angleStep - Math.PI / 2;
    const radius = (value / 10) * maxRadius;
    return {
      x: center + radius * Math.cos(angle),
      y: center + radius * Math.sin(angle),
    };
  };

  const getLabelPoint = (index: number) => {
    const angle = index * angleStep - Math.PI / 2;
    const radius = maxRadius + 30;
    return {
      x: center + radius * Math.cos(angle),
      y: center + radius * Math.sin(angle),
    };
  };

  const traditionalPoints = traditionalData.map((value, index) => getPoint(value, index));
  const fightAIPoints = fightAIData.map((value, index) => getPoint(value, index));

  const traditionalPath = traditionalPoints.map(p => `${p.x},${p.y}`).join(' ');
  const fightAIPath = fightAIPoints.map(p => `${p.x},${p.y}`).join(' ');

  return (
    <View style={styles.container}>
      <Svg width={size} height={size}>
        {/* Grid circles */}
        {Array.from({ length: levels }, (_, i) => (
          <Circle
            key={i}
            cx={center}
            cy={center}
            r={(maxRadius / levels) * (i + 1)}
            fill="none"
            stroke={Colors.dark.border}
            strokeWidth="1"
            opacity="0.3"
          />
        ))}

        {/* Grid lines */}
        {skills.map((_, index) => {
          const angle = index * angleStep - Math.PI / 2;
          const endX = center + maxRadius * Math.cos(angle);
          const endY = center + maxRadius * Math.sin(angle);
          return (
            <Line
              key={index}
              x1={center}
              y1={center}
              x2={endX}
              y2={endY}
              stroke={Colors.dark.border}
              strokeWidth="1"
              opacity="0.3"
            />
          );
        })}

        {/* Traditional training polygon */}
        <Polygon
          points={traditionalPath}
          fill={Colors.dark.inactive + '40'}
          stroke={Colors.dark.inactive}
          strokeWidth="2"
        />

        {/* Fight AI polygon */}
        <Polygon
          points={fightAIPath}
          fill={Colors.dark.primary + '40'}
          stroke={Colors.dark.primary}
          strokeWidth="3"
        />

        {/* Data points */}
        {traditionalPoints.map((point, index) => (
          <Circle
            key={`traditional-${index}`}
            cx={point.x}
            cy={point.y}
            r="4"
            fill={Colors.dark.inactive}
          />
        ))}

        {fightAIPoints.map((point, index) => (
          <Circle
            key={`fightai-${index}`}
            cx={point.x}
            cy={point.y}
            r="5"
            fill={Colors.dark.primary}
          />
        ))}

        {/* Labels */}
        {skills.map((skill, index) => {
          const labelPoint = getLabelPoint(index);
          return (
            <SvgText
              key={skill}
              x={labelPoint.x}
              y={labelPoint.y}
              fontSize="12"
              fill={Colors.dark.text}
              textAnchor="middle"
              alignmentBaseline="middle"
            >
              {skill}
            </SvgText>
          );
        })}
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});