import React, { useCallback } from 'react';
interface SliderProps {
    sliderValue: number;
    setSliderValue: (value: number) => void;
    isDarkMode: boolean;
  }

const Slider: React.FC<SliderProps> = ({ sliderValue, setSliderValue, isDarkMode }) => {
    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
      setSliderValue(Number(e.target.value));
    }, [setSliderValue]);
  

    return (
        <div className="my-4 w-full max-w-xl">
            <input 
                type="range" 
                id="time-slider"
                min="0" 
                max="2"  
                step="0.01" 
                value={sliderValue} 
                onChange={handleChange}
                className={`slider h-2 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-300'} appearance-none cursor-pointer`}
                style={{
                    background: `linear-gradient(to right, ${isDarkMode ? '#3b82f6' : '#2563eb'} ${sliderValue * 100 / 2}%, ${isDarkMode ? '#4b5563' : '#d1d5db'} ${sliderValue * 100 / 2}%)`
                }}
            />
        </div>
    );
};

export default React.memo(Slider);


