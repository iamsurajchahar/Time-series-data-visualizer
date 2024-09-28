"use client";
import React, { useState } from 'react';
import Papa from 'papaparse';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const [file, setFile] = useState<File | null>(null);
  const [parsedData, setParsedData] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(false); 
  const router = useRouter();
  const [isDarkMode, setIsDarkMode] = useState(true);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setParsedData([]); 
      parseCSV(selectedFile);
    }
  };

  const parseCSV = (file: File) => {
    const chunkSize = 1024 * 1024;
    const reader = new FileReader();
    let offset = 0;

    const readNextChunk = () => {
      if (offset < file.size) {
        const slice = file.slice(offset, offset + chunkSize);
        reader.readAsText(slice);
        offset += chunkSize;
      }
    };

    reader.onload = (event) => {
      const text = event.target?.result;
      if (typeof text === 'string') {
        const results = Papa.parse(text, {
          header: false,
          skipEmptyLines: true,
          complete: (parsedResults) => {
            const data = parsedResults.data.flat().map((row: unknown) => {
             
              const value = row as string; 
              return parseFloat(value);
            }).filter(value => !isNaN(value));
            setParsedData(prevData => [...prevData, ...data]); 
          },
          error: (error: Error) => {
            console.error("Error parsing CSV file:", error);
            alert("Failed to parse the CSV file. Please check the format.");
          },
        });
      }
  
      
      readNextChunk();
    };

    reader.onerror = (error) => {
      console.error("Error reading file:", error);
      alert("An error occurred while reading the file.");
    };

  
    readNextChunk();
  };

  const handleNavigateToChart = () => {
    if (parsedData.length > 0) {
      setIsLoading(true); 
      const dataString = encodeURIComponent(JSON.stringify(parsedData));
      router.push(`/chart?data=${dataString}`);
    } else {
      alert("Please select a valid CSV file first.");
    }
  };

  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
  };

  return (
    <main className={`flex min-h-screen flex-col items-center justify-center p-8 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
      <button
        onClick={toggleDarkMode}
        className={`absolute top-4 right-4 p-2 rounded-lg transition-all duration-300 
                    ${isDarkMode ? 'bg-yellow-300 shadow-lg glow-yellow-500' : 'bg-gray-800 hover:bg-gray-600'}
                    shadow-lg hover:shadow-xl active:scale-95 animate-bounce`}
      >
        {isDarkMode ? '💡' : '🔦'}
      </button>

      
      <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight md:text-5xl lg:text-6xl">
        <span className="text-blue-600 dark:text-blue-400">Time </span>
        <span className={`text-gray-900 ${isDarkMode ? 'text-white' : 'text-black'}`}>Series </span>
        <span className="text-blue-600 dark:text-blue-400">Data </span>
        <span className={`text-gray-900 ${isDarkMode ? 'text-white' : 'text-black'}`}>Visualization</span>.
      </h1>
      <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400 mb-4">
        We empower users to transform complex data into meaningful insights through innovative visualization techniques.
      </p>

      <input
        type="file"
        accept=".csv"
        onChange={handleFileChange}
        className="mb-4 p-2 border border-gray-300 rounded-lg"
      />

      {file && <p className="text-sm">File selected: {file.name}</p>}

      <button
        onClick={handleNavigateToChart}
        className={`mt-4 p-2 rounded-lg transform transition-all duration-300 
                    bg-blue-500 text-white hover:bg-blue-700 shadow-lg hover:shadow-xl active:scale-95 animate-pulse`}
      >
        View Chart
      </button>

      
      {isLoading && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
          <div className="loader"></div>
        </div>
      )}
      <style jsx>{`
        .loader {
          border: 8px solid rgba(255, 255, 255, 0.1);
          border-left: 8px solid #ffffff;
          border-radius: 50%;
          width: 60px;
          height: 60px;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </main>
  );
}



































