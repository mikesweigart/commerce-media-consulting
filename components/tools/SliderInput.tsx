"use client";

interface Benchmark {
  value: number;
  label: string;
}

interface SliderInputProps {
  label: string;
  sublabel?: string;
  value: number;
  onChange: (v: number) => void;
  min: number;
  max: number;
  step?: number;
  formatValue: (v: number) => string;
  benchmarks?: Benchmark[];
  colorFn?: (v: number) => string;
}

export default function SliderInput({
  label, sublabel, value, onChange, min, max, step = 1,
  formatValue, benchmarks, colorFn,
}: SliderInputProps) {
  const pct = ((value - min) / (max - min)) * 100;
  const color = colorFn ? colorFn(value) : "#C9A84C";

  return (
    <div className="w-full select-none">
      <div className="flex items-end justify-between mb-3 gap-4">
        <div>
          <div className="font-semibold text-navy-900 text-sm leading-tight">{label}</div>
          {sublabel && <div className="text-gray-400 text-xs mt-1 leading-tight">{sublabel}</div>}
        </div>
        <div
          className="font-heading font-bold text-4xl leading-none flex-shrink-0 tabular-nums transition-colors duration-300"
          style={{ color }}
        >
          {formatValue(value)}
        </div>
      </div>

      {/* Slider track */}
      <div className="py-3">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={e => onChange(Number(e.target.value))}
          className="tool-slider"
          style={{
            background: `linear-gradient(to right, ${color} 0%, ${color} ${pct}%, #e5e7eb ${pct}%, #e5e7eb 100%)`,
          }}
        />
      </div>

      {/* Benchmark labels */}
      {benchmarks && benchmarks.length > 0 && (
        <div className="relative h-7 mt-1">
          {benchmarks.map(b => {
            const bpct = ((b.value - min) / (max - min)) * 100;
            return (
              <div
                key={b.value}
                className="absolute flex flex-col items-center pointer-events-none"
                style={{ left: `${bpct}%`, transform: "translateX(-50%)" }}
              >
                <div className="w-px h-2 bg-gray-300 mb-0.5" />
                <span className="text-[10px] text-gray-400 whitespace-nowrap leading-none text-center">
                  {b.label}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
