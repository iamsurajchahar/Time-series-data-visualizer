"use client"; 
import { ChartOptions,TooltipItem } from 'chart.js';

import Slider from '../component/slider';
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation'; 
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import zoomPlugin from 'chartjs-plugin-zoom';
import { useDebounce } from 'use-debounce';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend, zoomPlugin);

export default function ChartPage() {
  const searchParams = useSearchParams(); 
  const dataString = searchParams.get('data') || '[]';
  const parsedData = JSON.parse(decodeURIComponent(dataString));

  const [isDarkMode, setIsDarkMode] = useState(true);
  const [granularity, setGranularity] = useState(10000);
  const [sliderValue, setSliderValue] = useState(0); 
  const [visibleData, setVisibleData] = useState([]);
  const [debouncedGranularity] = useDebounce(granularity, 200);

  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
  };


  const handleGranularityChange = (newGranularity: number) => {
    setGranularity(newGranularity);
  };
  

  const updateVisibleData = (granularity: number, sliderValue: number) => {
    const totalDuration = 10; 
    const totalSamples = parsedData.length; 
    
   
    const numSamplesToDisplay = Math.floor((totalDuration * 1000) / granularity);
    
   
    console.log("Granularity (ms):", granularity);
    console.log("Num Samples to Display:", numSamplesToDisplay);
    
   
    const adjustedSliderValue = Math.min(sliderValue, totalDuration);
    
    
    const startIndex = Math.floor((adjustedSliderValue / totalDuration) * totalSamples);
    const adjustedStartIndex = Math.max(startIndex, 0); 
    
    
    const endIndex = Math.min(adjustedStartIndex + numSamplesToDisplay, totalSamples);
    
    
    console.log("Total Samples:", totalSamples);
    console.log("Start Index:", adjustedStartIndex);
    console.log("End Index:", endIndex);
    
    
    if (adjustedStartIndex < endIndex) {
      const filteredData = parsedData.slice(adjustedStartIndex, endIndex);
      
      
      console.log("Filtered Data:", filteredData);
      
      
      if (filteredData.length > 0) {
        setVisibleData(filteredData);
      } else {
        console.warn("No data to display for the selected range.");
        setVisibleData([]); 
      }
    } else {
      console.warn("No data to display for the selected range.");
      setVisibleData([]); 
    }
  };
  
  

  useEffect(() => {
    updateVisibleData(debouncedGranularity, sliderValue); 
  }, [debouncedGranularity, sliderValue]);

  const chartData = {
    labels: visibleData.map((_, index) => {
      const timeOffset = sliderValue; 
      return (timeOffset + (index * (granularity / 1000))).toFixed(2); 
    }),
    datasets: [
      {
        label: 'Signal Amplitude',
        data: visibleData.map(dataPoint => dataPoint), 
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 2,
        pointRadius: 0,
        fill: false,
      },
    ],
  };
  
  
  console.log("Chart Data:", chartData);
  
  const options: ChartOptions<'line'> = {
    scales: {
      x: {
        grid: { display: false },
        title: {
          display: true,
          text: 'Time (seconds)', 
          color: isDarkMode ? '#fff' : '#000',
        },
      },
      y: {
        grid: { color: isDarkMode ? '#555' : '#e2e8f0' },
        title: {
          display: true,
          text: 'Signal Amplitude', 
          color: isDarkMode ? '#fff' : '#000',
        },
      },
    },
    plugins: {
      title: {
        display: true,
        text: 'Signal Amplitude Over Time',
        color: isDarkMode ? '#fff' : '#000',
        font: { size: 18 },
      },
      tooltip: {
        callbacks: {
          label: function (context: TooltipItem<'line'>) {
            return `Time: ${context.label} sec, Amplitude: ${context.raw}`;
          },
        },
        backgroundColor: isDarkMode ? '#333' : '#fff',
        borderColor: '#ddd',
        borderWidth: 1,
        titleColor: isDarkMode ? '#fff' : '#000',
        bodyColor: isDarkMode ? '#fff' : '#000',
      },
      zoom: {
        pan: {
          enabled: true,
          mode: 'x' as const,
        },
        zoom: {
          wheel: {
            enabled: true,
          },
          pinch: {
            enabled: true,
          },
          mode: 'x' as const, 
        },
      },
    },
  };
  return (
    <div className={`min-h-screen flex flex-col items-center justify-center ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
      <h1 className={`mb-4 mt-8 text-2xl font-extrabold leading-none tracking-tight ${isDarkMode ? 'text-white' : 'text-gray-900'} md:text-3xl lg:text-5xl`}>
          Visualize 
          <mark className={`px-2 text-white ${isDarkMode ? 'bg-blue-500' : 'bg-blue-600'} rounded`}>Time</mark> 
          Series 
          <mark className={`px-2 text-white ${isDarkMode ? 'bg-blue-500' : 'bg-blue-600'} rounded`}>Data</mark> 
          Effortlessly
      </h1>
      <p className={`text-lg font-normal lg:text-xl ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          Here, we empower users with efficient and precise data visualization tools to unlock valuable insights.
      </p>

      <button
        onClick={() => window.history.back()}
        className="fixed top-4 left-4 bg-blue-500 text-white px-4 py-2 rounded-full shadow-lg 
                   hover:bg-blue-800 transform transition-all duration-300 ease-in-out hover:scale-105 active:scale-95"
      >
        Back
      </button>
      
      <button
        onClick={toggleDarkMode}
        className={`fixed top-4 right-4 p-2 rounded-lg transform transition duration-300 
                    ${isDarkMode ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-blue-500 hover:bg-blue-700'}
                    shadow-lg hover:shadow-xl active:scale-95`}
      >
        {isDarkMode ? '🌞' : '🌙'}
      </button>

      <div className="my-4">
        <label htmlFor="granularity" className="mr-2">Select Granularity:</label>
        <select
          id="granularity"
          onChange={(e) => handleGranularityChange(Number(e.target.value))} // Use the newly defined function
          className={`p-2 border rounded ${isDarkMode ? 'bg-gray-800 text-white border-gray-600' : 'bg-white text-black border-gray-300'}`}
        >
          <option value={10000}>10 seconds</option>
          <option value={1000}>1 second</option>
          <option value={100}>100 ms</option>
          <option value={10}>10 ms</option>
          <option value={1}>1 ms</option>
        </select>
      </div>

      <Slider sliderValue={sliderValue} setSliderValue={setSliderValue} isDarkMode={isDarkMode} />

      {parsedData.length > 0 ? (
        <div className="w-full max-w-4xl h-[500px] mx-auto">
          <Line data={chartData} options={options} />
        </div>
      ) : (
        <p className={`text-lg font-semibold ${isDarkMode ? 'text-gray-400' : 'text-gray-800'}`}>No Data Available</p>
      )}
    </div>
  );
}














































