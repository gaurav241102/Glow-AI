import React, { useEffect, useRef } from 'react';
import { ProgressPoint } from '../../types';

interface ProgressChartProps {
  data: ProgressPoint[];
  height?: number;
  width?: number;
  className?: string;
}

const ProgressChart: React.FC<ProgressChartProps> = ({
  data,
  height = 200,
  width = 600,
  className = '',
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const formatDate = (date: Date): string => {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };
  
  const findMinMaxScore = (): [number, number] => {
    if (data.length === 0) return [0, 100];
    
    let min = data[0].score;
    let max = data[0].score;
    
    data.forEach(point => {
      if (point.score < min) min = point.score;
      if (point.score > max) max = point.score;
    });
    
    // Add some padding
    min = Math.max(0, min - 5);
    max = Math.min(100, max + 5);
    
    return [min, max];
  };
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || data.length < 2) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, rect.width, rect.height);
    
    const padding = { top: 20, right: 20, bottom: 40, left: 40 };
    const chartWidth = rect.width - padding.left - padding.right;
    const chartHeight = rect.height - padding.top - padding.bottom;
    
    const [minScore, maxScore] = findMinMaxScore();
    const scoreRange = maxScore - minScore;
    
    // Draw axes
    ctx.beginPath();
    ctx.strokeStyle = '#e5e7eb';
    ctx.lineWidth = 1;
    
    // X-axis
    ctx.moveTo(padding.left, rect.height - padding.bottom);
    ctx.lineTo(rect.width - padding.right, rect.height - padding.bottom);
    
    // Y-axis
    ctx.moveTo(padding.left, padding.top);
    ctx.lineTo(padding.left, rect.height - padding.bottom);
    ctx.stroke();
    
    // Draw horizontal grid lines
    const gridLineCount = 5;
    ctx.textAlign = 'right';
    ctx.textBaseline = 'middle';
    ctx.font = '10px Inter, sans-serif';
    ctx.fillStyle = '#6b7280';
    
    for (let i = 0; i <= gridLineCount; i++) {
      const y = padding.top + (chartHeight * i) / gridLineCount;
      const score = maxScore - (i / gridLineCount) * scoreRange;
      
      ctx.beginPath();
      ctx.strokeStyle = '#e5e7eb';
      ctx.moveTo(padding.left, y);
      ctx.lineTo(rect.width - padding.right, y);
      ctx.stroke();
      
      ctx.fillText(Math.round(score).toString(), padding.left - 5, y);
    }
    
    // Plot data points
    const pointWidth = chartWidth / (data.length - 1);
    
    // Draw the line
    ctx.beginPath();
    ctx.strokeStyle = '#0ea5e9';
    ctx.lineWidth = 2;
    
    data.forEach((point, index) => {
      const x = padding.left + index * pointWidth;
      const y = padding.top + chartHeight - ((point.score - minScore) / scoreRange) * chartHeight;
      
      if (index === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });
    
    ctx.stroke();
    
    // Create gradient fill
    const gradient = ctx.createLinearGradient(0, padding.top, 0, rect.height - padding.bottom);
    gradient.addColorStop(0, 'rgba(14, 165, 233, 0.2)');
    gradient.addColorStop(1, 'rgba(14, 165, 233, 0)');
    
    // Draw area below the line
    ctx.beginPath();
    ctx.fillStyle = gradient;
    
    data.forEach((point, index) => {
      const x = padding.left + index * pointWidth;
      const y = padding.top + chartHeight - ((point.score - minScore) / scoreRange) * chartHeight;
      
      if (index === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });
    
    ctx.lineTo(padding.left + (data.length - 1) * pointWidth, rect.height - padding.bottom);
    ctx.lineTo(padding.left, rect.height - padding.bottom);
    ctx.closePath();
    ctx.fill();
    
    // Draw data points
    data.forEach((point, index) => {
      const x = padding.left + index * pointWidth;
      const y = padding.top + chartHeight - ((point.score - minScore) / scoreRange) * chartHeight;
      
      // Draw the point
      ctx.beginPath();
      ctx.fillStyle = point.note ? '#0ea5e9' : '#bae6fd';
      ctx.arc(x, y, 4, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.beginPath();
      ctx.fillStyle = '#ffffff';
      ctx.arc(x, y, 2, 0, Math.PI * 2);
      ctx.fill();
      
      // Draw x-axis label
      if (index % Math.ceil(data.length / 6) === 0 || index === data.length - 1) {
        ctx.fillStyle = '#6b7280';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';
        ctx.fillText(formatDate(point.date), x, rect.height - padding.bottom + 5);
      }
      
      // Draw note indicator
      if (point.note) {
        ctx.beginPath();
        ctx.fillStyle = '#0ea5e9';
        ctx.arc(x, y - 12, 2, 0, Math.PI * 2);
        ctx.fill();
      }
    });
    
  }, [data, width, height]);
  
  return (
    <div className={`w-full overflow-hidden ${className}`}>
      {data.length < 2 ? (
        <div className="flex items-center justify-center h-48 bg-gray-50 rounded-lg border border-gray-200">
          <p className="text-gray-500 text-sm">Not enough data to display chart</p>
        </div>
      ) : (
        <canvas
          ref={canvasRef}
          height={height}
          className="w-full"
          style={{ height: `${height}px` }}
        />
      )}
    </div>
  );
};

export default ProgressChart;