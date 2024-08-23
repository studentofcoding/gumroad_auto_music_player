"use client"

import Image from 'next/image'
import Link from 'next/link'
// import { Play, Stop } from 'lucide-react'
import { FaPlay, FaStop } from 'react-icons/fa'
import { useState, useRef, useEffect } from 'react'

const products = [
  {
    id: 1,
    title: "JUSTICE - DIGITAL: Instant Download: Full Synthwave Album Inspired by '80s Action Films",
    price: "CAD$10.99",
    rating: 5.0,
    reviews: 8,
    author: "ARCADE KNIGHTS",
    gumroad_link: "https://arcadeknights.gumroad.com/l/arcadeknightsjustice?layout=discover&recommended_by=staff_picks",
    image_placeholder: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202024-08-23%20at%2016.31.27-oj5vxFTpCzvSiUzMu1bW6Yn3UND32X.png",
    sound_preview: "/sound/test_1.mp3"
  },
  {
    id: 2,
    title: "Lyric 8 - Lyric Writing Templates",
    price: "€8",
    rating: 5.0,
    reviews: 4,
    author: "Songwriter's Chop Shop",
    gumroad_link: "https://songwritertony.gumroad.com/l/rbemv?layout=discover&recommended_by=staff_picks",
    image_placeholder: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202024-08-23%20at%2016.31.39-QdHe8dyRGC4IHOwRXagw3flkqtuAhS.png",
    sound_preview: "/sound/test_1.mp3"
  },
  {
    id: 3,
    title: "Music for Babes Series - Bach for Babies",
    price: "$15",
    rating: 0,
    reviews: 0,
    author: "Greg Sudmeier",
    gumroad_link: "https://musicforbabes.gumroad.com/l/yrLnI?layout=discover&recommended_by=staff_picks",
    image_placeholder: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202024-08-23%20at%2016.31.49-EmuF0hpyXJS0ZXJI7aXKtvjjMQAHVT.png",
    sound_preview: "/sound/test_1.mp3"
  },
  {
    id: 4,
    title: "The Slacker's Guitar Bible - Book 1: The Major Scale (Non-Published Manuscript Version)",
    price: "$20+",
    rating: 5.0,
    reviews: 1,
    author: "Alexander Sanchez",
    gumroad_link: "https://alexsanchezmusic.gumroad.com/l/TheSlackersGuitarBible?layout=discover&recommended_by=staff_picks",
    image_placeholder: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202024-08-23%20at%2016.31.58-CeBoxWLzrxgCxGVfnstHwwKzfumu73.png",
    sound_preview: "/sound/test_1.mp3"
  },
  {
    id: 5,
    title: "DRUMMING ABC",
    price: "$12.99",
    rating: 5.0,
    reviews: 4,
    author: "Aslak",
    gumroad_link: "https://jimiaslak.gumroad.com/l/blkjm?layout=discover&recommended_by=staff_picks",
    image_placeholder: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202024-08-23%20at%2016.32.08-DQVdWtBAIxwtsfO6PBoBndsZzR9WCa.png",
    sound_preview: "/sound/test_1.mp3"
  },
]

export default function ProductList() {
    const [hoveredId, setHoveredId] = useState(null)
    const [playingId, setPlayingId] = useState(null)
    const audioRef = useRef(null)

    useEffect(() => {
        audioRef.current = new Audio()
    }, [])

    const handlePlay = (product) => {
        if (!audioRef.current) return // Exit if Audio is not initialized
    
        if (playingId === product.id) {
            audioRef.current.pause()
            audioRef.current.currentTime = 0 // Reset the audio to the beginning
            setPlayingId(null)
        } else {
            if (playingId) {
                audioRef.current.pause()
                audioRef.current.currentTime = 0 // Reset the previous audio
            }
            audioRef.current.src = product.sound_preview
            audioRef.current.play().catch(error => console.error("Error playing audio:", error))
            setPlayingId(product.id)
        }
    }
  
    return (
      <div className="p-6 max-w-7xl mx-auto">
        <h2 className="mb-6">Staff picks</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {products.map((product) => (
            <article 
            key={product.id} 
            className="product-card border rounded-md overflow-hidden border-gray-950 hover:shadow-xl transition-shadow"
          >
            <figure
              onMouseEnter={() => setHoveredId(product.id)}
              onMouseLeave={() => setHoveredId(null)}
            className="relative h-48 w-full">
              <Image
                src={product.image_placeholder}
                alt={product.title}
                layout="fill"
                objectFit="cover"
              />
              {(hoveredId === product.id || playingId === product.id) && (
                <button 
                  className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent the click from propagating to the parent elements
                    handlePlay(product);
                  }}
                >
                  {playingId === product.id ? (
                    <FaStop className="text-white w-12 h-12" />
                  ) : (
                    <FaPlay className="text-white w-12 h-12" />
                  )}
                </button>
              )}
            </figure>
            <header className="grid grid-cols-1 gap-2 p-4">
                <h4 className="text-sm mb-1" style={{ height: '105px', overflow: 'hidden', textOverflow: 'ellipsis', }}>
                  <Link href={product.gumroad_link} target="_blank" rel="noopener noreferrer">
                    {product.title}
                  </Link>
                </h4>
              <a
                href={product.gumroad_link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-xs text-gray-600 hover:underline"
                >
                <img 
                    src={product.image_placeholder} 
                    alt={product.author} 
                    className="w-5 h-5 rounded-full mr-2"
                />
                <span className="underline">{product.author}</span>
              </a>
              <div className="flex items-center text-sm text-black">
              <span>★</span>
              {' '}
              {product.rating === 0 ? (
                <span>No ratings</span>
              ) : (
                <>
                  <span>{product.rating.toFixed(1)}</span>
                  {' '}
                  <span>({product.reviews})</span>
                </>
              )}
              </div>
            </header>
            <footer className="bg-[rgb(255,144,232)] text-black border text-xs border-gray-950 font-light p-2 m-4 inline-block">
                {product.price}
            </footer>
          </article>
          ))}
        </div>
      </div>
    )
}