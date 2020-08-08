import React from 'react';
import { PanelProps } from '@grafana/data';
import { SimpleOptions } from 'types';
// import { css } from 'emotion';
import { useTheme } from '@grafana/ui';
import * as d3 from 'd3';

interface Props extends PanelProps<SimpleOptions> { }

export const SimplePanel: React.FC<Props> = ({ options, data, width, height }) => {
  const theme = useTheme();
  const values = [4, 8, 15, 16, 23, 42];
  const padding = 20;
  const chartHeight = height - padding;
  const barHeight = chartHeight / values.length;
  const scale = d3
    .scaleLinear()
    .domain([0, d3.max(values) || 0.0])
    .range([0, width]);
  const axis = d3.axisBottom(scale);
  return (
    <svg width={width} height={height}>
      <g>
        {values.map((value, i) => (
          <rect x={0} y={i * barHeight} width={scale(value)} height={barHeight - 1} fill={theme.palette.greenBase} />
        ))}
      </g>
      <g
        transform={`translate(0, ${chartHeight})`}
        ref={node => {
          d3.select(node).call(axis as any);
        }}
      />
    </svg>
  );
};

// const getStyles = stylesFactory(() => {
//   return {
//     wrapper: css`
//       position: relative;
//     `,
//     svg: css`
//       position: absolute;
//       top: 0;
//       left: 0;
//     `,
//     textBox: css`
//       position: absolute;
//       bottom: 0;
//       left: 0;
//       padding: 10px;
//     `,
//   };
// });
