'use client'

import { useState } from "react"


export default function TextForm(
    {setResults: setResults}: {setResults: (results: number) => void}) {
    const [text , setText] = useState('')
    const [detecting , setDetecting] = useState(false)

    function handleSubmit(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault()
        setResults(-1)
        setDetecting(true)
        fetch('http://ec2-18-133-180-144.eu-west-2.compute.amazonaws.com:8080/api/detect', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({text})
        })
        .then(res => res.json())
        .then(data => {
            setResults(data.prediction)
            console.log(data)
            setDetecting(false)
        })
        .catch(err => {
            alert('An error occurred. Please try again.')
            console.log(err)
            setDetecting(false)
        })
    }

    return (
        <form className="flex flex-col p-4 md:w-1/2" >
            <label className="text-lg">Enter text to detect:</label>
            <textarea
                className="border p-2 rounded mt-2 text-black"
                placeholder="Enter text here"
                rows={5}
                cols={50}
                onChange={(e) => setText(e.target.value)}
                value={text}
            />
            <div className="flex gap-2 items-center w-full justify-between">
                {detecting?
                    // spinner
                    <div className="border border-t-4 border-gray-200 rounded-full w-6 h-6 animate-spin"></div>
                    : 
                <button 
                    className="bg-blue-500 text-white rounded p-2 mt-2"
                    onClick={handleSubmit}>Detect</button>
                }
                {/* clear button */}
                <div 
                    className="bg-red-500 text-white rounded p-2 mt-2 cursor-pointer"
                    onClick={() => setText('')}>Clear</div>
            </div>
        </form>
    )
}