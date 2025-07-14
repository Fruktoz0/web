import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";
import API_BASE from "@/config/apiConfig";

function AddUserModal({ open, setOpen, onUserCreated }) {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    role: "user",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(`${API_BASE}/auth/register`, form, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      onUserCreated();
      setOpen(false);
    } catch (error) {
      console.error("Hiba felhasználó létrehozásakor:", error);
      alert("Hiba történt. Ellenőrizd az adatokat.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Új felhasználó</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-2">
          <Input name="username" placeholder="Név" onChange={handleChange} className="focus-visible:ring-[#009688]/30 focus-visible:ring-2 focus-visible:border-none rounded"/>
          <Input name="email" placeholder="Email" onChange={handleChange} className="focus-visible:ring-[#009688]/30 focus-visible:ring-2 focus-visible:border-none rounded"/>
          <Input name="password" type="password" placeholder="Jelszó" onChange={handleChange} className="focus-visible:ring-[#009688]/30 focus-visible:ring-2 focus-visible:border-none rounded"/>
          <select
          
            name="role"
            onChange={handleChange}
            className="border rounded p-2 focus-visible:ring-[#009688]/30 focus-visible:ring-2 focus-visible:border-none"
            defaultValue="user"
          
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
            <option value="worker">Worker</option>
            <option value="institution">Institution</option>
            <option value="compliance">Compliance</option>
          </select>
          <Button onClick={handleSubmit} className="bg-[#009688] mt-5 text-white hover:bg-[#00796b]">Létrehozás</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default AddUserModal;
