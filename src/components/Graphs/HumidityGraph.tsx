import { ReactElement } from 'react';
import {
  Bar,
  CartesianGrid,
  ComposedChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { Paper, Stack, Typography } from '@mui/material';
import { GraphProps } from './TemperatureGraph';

export const HumidityGraph = ({ next24h }: GraphProps): ReactElement => {
  const chartData = next24h.map((item) => {
    const date = new Date(item.dt * 1000);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    return {
      time: `${hours}:${minutes}`,
      humidity: item.main.humidity,
      pop: item.pop * 100,
    };
  });

  return (
    <ResponsiveContainer width="100%" height={300}>
      <ComposedChart data={chartData}>
        <defs>
          <linearGradient id="humidityGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#4fc3f7" stopOpacity={0.8} />
            <stop offset="100%" stopColor="#4fc3f7" stopOpacity={0.3} />
          </linearGradient>
          <linearGradient id="popGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0288d1" stopOpacity={0.8} />
            <stop offset="100%" stopColor="#0288d1" stopOpacity={0.3} />
          </linearGradient>
        </defs>

        <CartesianGrid stroke="#e0e0e0" strokeDasharray="" vertical={false} />
        <XAxis dataKey="time" />
        <YAxis unit="%" />
        <Tooltip
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              const data = payload[0].payload;
              return (
                <Paper
                  elevation={3}
                  sx={{
                    padding: 1.5,
                    borderRadius: 2,
                    backgroundColor: 'background.paper',
                    color: 'text.primary',
                  }}
                >
                  <Stack spacing={0.5}>
                    <Typography variant="subtitle2">{data.time}</Typography>
                    <Typography variant="body2">
                      Humidity: {data.humidity}%
                    </Typography>
                    <Typography variant="body2">
                      Chance of rain: {data.pop}%
                    </Typography>
                  </Stack>
                </Paper>
              );
            }
            return null;
          }}
        />

        <Bar
          dataKey="humidity"
          fill="url(#humidityGradient)"
          barSize={60}
          radius={[4, 4, 0, 0]}
        />

        <Line
          type="monotone"
          dataKey="pop"
          stroke="url(#popGradient)"
          strokeWidth={2}
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
};
