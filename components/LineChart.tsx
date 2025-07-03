import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Path, Circle, Line, Text as SvgText } from 'react-native-svg';
import Colors from '@/constants/colors';

const traditionalData = [20, 25, 30, 35, 40, 45, 50, 55, 60];
const fightAIData = [20, 35, 50, 65, 75, 85, 90, 95, 98];
const weeks = [0, 1, 2, 3, 4, 5, 6, 7, 8];

export default function LineChart() {
  const width = 280;
  const height = 200;
  const padding = 40;
  const chartWidth = width - padding * 2;
  const chartHeight = height - padding * 2;

  const maxValue = 100;
  const maxWeeks = 8;

  const getX = (week: number) => padding + (week / maxWeeks) * chartWidth;
  const getY = (value: number) => height - padding - (value / maxValue) * chartHeight;

  const createPath = (data: number[]) => {
    return data
      .map((value, index) => {
        const x = getX(weeks[index]);
        const y = getY(value);
        return index === 0 ? `M ${x} ${y}` : `L ${x} ${y}`;
      })
      .join(' ');
  };

  const traditionalPath = createPath(traditionalData);
  const fightAIPath = createPath(fightAIData);

  return (
    <View style={styles.container}>
      <Svg width={width} height={height}>
        {/* Grid lines */}
        {[0, 25, 50, 75, 100].map((value) => (
          <Line
            key={value}
            x1={padding}
            y1={getY(value)}
            x2={width - padding}
            y2={getY(value)}
            stroke={Colors.dark.border}
            strokeWidth="1"
            opacity="0.3"
          />
        ))}

        {/* Y-axis labels */}
        {[0, 25, 50, 75, 100].map((value) => (
          <SvgText
            key={value}
            x={padding - 10}
            y={getY(value)}
            fontSize="10"
            fill={Colors.dark.subtext}
            textAnchor="end"
            alignmentBaseline="middle"
          >
            {value}
          </SvgText>
        ))}

        {/* X-axis labels */}
        {weeks.map((week) => (
          <SvgText
            key={week}
            x={getX(week)}
            y={height - padding + 15}
            fontSize="10"
            fill={Colors.dark.subtext}
            textAnchor="middle"
          >
            {week}
          </SvgText>
        ))}

        {/* Traditional line */}
        <Path
          d={traditionalPath}
          fill="none"
          stroke={Colors.dark.inactive}
          strokeWidth="3"
        />

        {/* Fight AI line */}
        <Path
          d={fightAIPath}
          fill="none"
          stroke={Colors.dark.primary}
          strokeWidth="3"
        />

        {/* Data points */}
        {traditionalData.map((value, index) => (
          <Circle
            key={`traditional-${index}`}
            cx={getX(weeks[index])}
            cy={getY(value)}
            r="4"
            fill={Colors.dark.inactive}
          />
        ))}

        {fightAIData.map((value, index) => (
          <Circle
            key={`fightai-${index}`}
            cx={getX(weeks[index])}
            cy={getY(value)}
            r="5"
            fill={Colors.dark.primary}
          />
        ))}
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