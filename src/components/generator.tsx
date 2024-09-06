'use client'
import { Input } from "@/components/ui/input"
import { generateImage } from "@/app/actions";
import { useState } from "react";
import Image from "next/image";
const api_Status = process.env.NEXT_PUBLIC_API_STATUS

export function Generator() {
  const [url, setUrl] = useState('');
  const action = async (formData: FormData) => {
    const imageData  = await generateImage(formData)
    setUrl(imageData.data[0].url) 
    
  }
  return (
    <main className="flex flex-col items-center justify-center h-screen" style={
      {
        backgroundImage: `url("/animated1.webp")`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }
    }>
      <form action={action} className="max-w-md w-full space-y-4 p-10 bg-black/50 rounded">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Changing Times</h1>
          <p className="text-gray-200">
            Enter a prompt to generate an image!
          </p>
          <p>API status: {api_Status}</p>
        </div>
        <div className="flex space-x-2">
          <Input
            className="flex-1 px-4 py-2 rounded-md border border-gray-200  dark:bg-gray-800 dark:text-gray-100 dark:border-gray-800"
            placeholder="Enter a text prompt"
            name="prompt"
            type="text"
          />
          <button type="submit" className="text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
            Generate
          </button>

        </div>
        <div className="bg-white dark:bg-gray-800 rounded-md shadow-md overflow-hidden">
          <Image
            alt="Generated Image"
            className="w-full h-auto"
            height="512"
            src={url === '' ? `/placeholder.svg` : url}
            style={{
              aspectRatio: "1:1",
              objectFit: "cover",
            }}
            width="512"
          />
        </div>
      </form>
    </main>
  )
}
