import React, { useState, useEffect, useRef } from 'react'
import { useForm } from "react-hook-form"
import axios from "axios"
import getBaseUrl from '../utils/baseURL'
import { useNavigate } from 'react-router-dom'

const AdminLogin = () => {
    const [message, setMessage] = useState("")
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()

    const navigate = useNavigate()
    const vantaRef = useRef(null)
    const [vantaEffect, setVantaEffect] = useState(null)

    useEffect(() => {
        if (typeof window !== 'undefined' && !vantaEffect) {
            const loadScripts = async () => {
                try {
                    // Check if scripts are already loaded
                    if (!window.THREE) {
                        await loadScript('https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js')
                    }
                    if (!window.VANTA) {
                        await loadScript('https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.birds.min.js')
                    }

                    const effect = window.VANTA.BIRDS({
                        el: vantaRef.current,
                        mouseControls: true,
                        touchControls: true,
                        gyroControls: false,
                        minHeight: 200.00,
                        minWidth: 200.00,
                        scale: 1.00,
                        scaleMobile: 1.00,
                        backgroundColor: 0xfefae0,
                        color1: 0x4361ee,
                        color2: 0x3a0ca3,
                        colorMode: "lerp",
                        birdSize: 0.8,
                        quantity: 4,
                        separation: 40,
                        alignment: 30,
                        cohesion: 25,
                        speedLimit: 5,
                        backgroundAlpha: 0.9,
                        wingSpan: 25,
                    })

                    setVantaEffect(effect)
                } catch (error) {
                    console.error('Error loading Vanta.js:', error)
                }
            }

            const loadScript = (src) => new Promise((resolve, reject) => {
                const script = document.createElement('script')
                script.src = src
                script.async = true
                script.onload = resolve
                script.onerror = reject
                document.body.appendChild(script)
            })

            loadScripts()
        }

        return () => {
            if (vantaEffect) {
                vantaEffect.destroy()
                // Clean up the global namespace if needed
                if (window.VANTA && Object.keys(window.VANTA.instances).length === 0) {
                    delete window.VANTA
                }
            }
        }
    }, [vantaEffect])

    const onSubmit = async (data) => {
        try {
            const response = await axios.post(`${getBaseUrl()}/api/auth/admin`, data, {
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            const auth = response.data
            if (auth.token) {
                localStorage.setItem('token', auth.token)
                setTimeout(() => {
                    localStorage.removeItem('token')
                    alert('Token has been expired!, Please login again.')
                    navigate("/")
                }, 3600 * 1000)
            }

            alert("Admin Login successful!")
            navigate("/dashboard")

        } catch (error) {
            setMessage("Please provide a valid email and password")
            console.error(error)
        }
    }

    return (
        <div className='h-screen flex justify-center items-center relative'>
            {/* Vanta.js Background */}
            <div
                ref={vantaRef}
                className="fixed top-0 left-0 w-full h-full -z-50 pointer-events-none"
                style={{
                    backgroundColor: '#fefae0', // Fallback color
                }}
            />

            {/* Login Form */}
            <div className='w-full max-w-sm mx-auto bg-white/90 shadow-md rounded px-8 pt-6 pb-8 mb-4 backdrop-blur-sm'>
                <h2 className='text-xl font-semibold mb-4'>Admin Dashboard Login</h2>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='mb-4'>
                        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor="username">Username</label>
                        <input
                            {...register("username", { required: true })}
                            type="text" name="username" id="username" placeholder='username'
                            className='shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow'
                        />
                    </div>
                    <div className='mb-4'>
                        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor="password">Password</label>
                        <input
                            {...register("password", { required: true })}
                            type="password" name="password" id="password" placeholder='Password'
                            className='shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow'
                        />
                    </div>
                    {
                        message && <p className='text-red-500 text-xs italic mb-3'>{message}</p>
                    }
                    <div className='w-full'>
                        <button className='bg-blue-500 w-full hover:bg-blue-700 text-white font-bold py-2 px-8 rounded focus:outline-none'>Login</button>
                    </div>
                </form>

                <p className='mt-5 text-center text-gray-500 text-xs'>©2025 Book Store. All rights reserved.</p>
            </div>
        </div>
    )
}

export default AdminLogin