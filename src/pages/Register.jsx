import React from 'react'
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useNavigate, Link } from 'react-router-dom'
import { register } from '@/services/authService'
import Logo from "@/assets/logo.png"


function Register() {

    const [formData, setFormData] = useState({ username: "", email: "", password: "", confirmPassword: "" })
    const [error, setError] = useState("")
    const navigate = useNavigate()

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await register(formData.username, formData.email, formData.password, formData.confirmPassword)
            alert(res.data?.message)
            navigate("/login")

        } catch (error) {
            setError(error)
        }
    }


    return (
        <div className="min-h-screen bg-white flex flex-col">
            {/* Topbar */}
            <header className="w-full bg-[#fffff4]" >
                <div className="container mx-auto px-4 py-4 flex justify-between">

                    <Link to="/" className="flex items-center gap-2">
                        <img src={Logo} alt="Tiszta Város logó" className="h-15 w-auto" />
                        <span className="text-3xl font-semibold sm:inline">Tiszta Város</span>
                    </Link>


                </div>
            </header>

            {/* Form */}
            <main className="flex flex-1 justify-center items-center px-4">
                <form
                    onSubmit={handleSubmit}
                    className="bg-white p-8 rounded-md shadow-md w-full max-w-lg"
                >
                    <h2 className="text-2xl font-semibold mb-6 text-center">Fiók létrehozása</h2>

                    <label className="block mb-2 font-medium">Felhasználónév</label>
                    <Input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        className="mb-4 h-12 text-base focus-visible:ring-[#009688]/30 focus-visible:ring-2 focus-visible:border-none rounded"
                        placeholder="pl. kovacsjoci123"
                        required
                    />

                    <label className="block mb-2 font-medium">Email cím</label>
                    <Input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="mb-4 h-12 text-base focus-visible:ring-[#009688]/30 focus-visible:ring-2 focus-visible:border-none rounded"
                        placeholder="email@pelda.hu"
                        required
                    />

                    <label className="block mb-2 font-medium">Jelszó</label>
                    <Input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="mb-6 h-12 text-base focus-visible:ring-[#009688]/30 focus-visible:ring-2 focus-visible:border-none rounded"
                        placeholder="••••••••"
                        required
                    />
                    <label className="block mb-2 font-medium">Jelszó újból</label>
                    <Input
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className="mb-6 h-12 text-base focus-visible:ring-[#009688]/30 focus-visible:ring-2 focus-visible:border-none rounded"
                        placeholder="••••••••"
                        required
                    />

                    {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

                    <Button type="submit" className="w-full h-12 text-base bg-[#009688] text-white hover:bg-[#00796b]">Regisztrálok</Button>

                    <div className="mt-6 text-center text-sm">
                        Már van fiókod?{" "}
                        <Link to="/login" className="text-[#D1343C] font-medium hover:underline">
                            Jelentkezz be itt
                        </Link>
                    </div>
                </form>
            </main>
        </div>
    );
};

export default Register