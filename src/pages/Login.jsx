import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useNavigate } from 'react-router-dom'
import { login, fetchUser } from '../services/authService'

function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('');
    try {
      const { token } = await login(email, password);
      localStorage.setItem('token', token);

      const user = await fetchUser(token);
      console.log('✔️ User fetched:', user);

      if (user.role === 'admin') {
        navigate('/admin/dashboard');
      }
      else if (user.role === 'institution') {
        navigate('/institution/dashboard');
      }
      else if (user.role === 'compliance') {
        navigate('/compliance/dashboard');
      } else {
        navigate('/user/dashboard');
      }

    } catch (err) {
      setError('Hibás email vagy jelszó');
      return;
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#f9f9f9] px-4">
      <Card className="w-full max-w-md shadow-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Bejelentkezés</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block mb-1 text-sm font-medium">
                Email
              </label>
              <Input onChange={(event) => setEmail(event.target.value)} value={email} className="focus-visible:ring-[#009688]/30 focus-visible:ring-2 focus-visible:border-none rounded" type="email" placeholder="email@pelda.hu" required />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium text-zinc-700">
                Jelszó
              </label>
              <Input onChange={(event) => setPassword(event.target.value)} value={password} className="focus-visible:ring-[#009688]/30 focus-visible:ring-2 focus-visible:border-none rounded" type="password" placeholder="••••••••" required />
            </div>
            <Button type="submit" className="w-full bg-[#009688] text-white hover:bg-[#00796b]" >
              Bejelentkezés
            </Button>
            {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default Login