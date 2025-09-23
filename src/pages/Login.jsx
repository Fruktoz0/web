import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useNavigate, Link } from 'react-router-dom'
import { login, fetchUser } from '../services/authService'
import Logo from "@/assets/logo.png"

function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const { token } = await login(email, password);
      localStorage.setItem('token', token);


      const user = await fetchUser(token);
      localStorage.setItem('role', user.role)

      if (user.role === 'admin') {
        navigate('/admin/dashboard');
      }
      else if (user.role === 'institution') {
        navigate('/institutions/dashboard');
      } else {
         setError("Nincs jogosultságod belépni.");
      }
    } catch (err) {
      setError(err);
      return;
    }
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Topbar */}
      <header className="w-full bg-[#fffff4]">
        <div className="container mx-auto px-4 py-4 flex justify-between">
          <Link to="/" className="flex items-center gap-2">
            <img src={Logo} alt="Tiszta Város logó" className="h-15 w-auto" />
            <span className="text-3xl font-semibold sm:inline">Tiszta Város</span>
          </Link>
        </div>
      </header>

      {/* Form */}
      <main className="flex flex-1 justify-center items-center px-4">
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-md shadow-md w-full max-w-lg">
          <h2 className="text-2xl font-semibold mb-6 text-center">Bejelentkezés</h2>

          <label className="block mb-2 font-medium">Email cím</label>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mb-4 h-12 text-base focus-visible:ring-[#009688]/30 focus-visible:ring-2 focus-visible:border-none rounded"
            placeholder="email@pelda.hu"
            required
          />

          <label className="block mb-2 font-medium">Jelszó</label>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mb-6 h-12 text-base focus-visible:ring-[#009688]/30 focus-visible:ring-2 focus-visible:border-none rounded"
            placeholder="••••••••"
            required
          />

          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

          <Button type="submit" className="w-full h-12 text-base bg-[#009688] text-white hover:bg-[#00796b]">
            Bejelentkezés
          </Button>

          <div className="mt-6 text-center text-sm">
            Még nincs fiókod?{" "}
            <Link to="/register" className="text-[#D1343C] font-medium hover:underline">
              Regisztrálj itt
            </Link>
          </div>
        </form>
      </main>
    </div>
  )
}

export default Login