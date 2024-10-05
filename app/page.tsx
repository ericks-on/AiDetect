'use client'
import { useState } from "react";
import TextForm from "./ui/text-form";

export default function Home() {
  const [results , setResults] = useState(-1)
  return (
    <main className="flex flex-col w-screen items-center pt-20">
      <header className="flex flex-col justify-center items-center h-20 bg-gray-800 text-white fixed top-0 w-screen">
        <h1 className="text-3xl">AI-Generated Text Detection</h1>
        <div className="flex gap-2 text-sm">
          <p>Accuracy: 98%</p>
          <p>Recall: 97%</p>
          <p>Precision: 98%</p>
        </div>
      </header>
      <TextForm setResults={setResults}/>
      {/* results either ai generated or not */}
      <div className="flex flex-col w-1/2 mt-8">
        <h2 className="text-xl">Results:</h2>
        <div className="border p-4 mt-2 rounded">
          {results === 0? <p className="text-green-500">Not AI generated</p> : results === 1? <p className="text-red-500">AI generated</p> : <p>Results will appear here</p>}
        </div>
      </div>
    </main>
  );
}
