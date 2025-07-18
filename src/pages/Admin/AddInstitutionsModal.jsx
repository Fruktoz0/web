import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { createInstitution, getAllInstitutions } from '@/services/institutionService';

function AddInstitutionsModal({ open, setOpen, onInstitutionCreated }) {

  const [form, setForm] = useState({
    name: "",
    email: "",
    description: "",
    contactInfo: "",

  });

  useEffect(() => {
    if (!open) return;
    const loadInstitutions = async () => {
      const data = await getAllInstitutions();
      setInstitutions(data)
    }
    loadInstitutions()
  }, [open])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      await createInstitution(form)
      onInstitutionCreated();
      setOpen(false);
    } catch (error) {
      if (error.response?.status === 400) {
        alert('Már létezik ilyen nevű intézmény!')
      }
      console.error("Hiba az intézmény létrehozásakor:", error);
      alert("Hiba történt. Ellenőrizd az adatokat.");
    }
  };


  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Új Intézmény</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-2">
          <Input
            name="name"
            placeholder="Intézmény neve"
            onChange={handleChange}
            className="focus-visible:ring-[#009688]/30 focus-visible:ring-2 focus-visible:border-none rounded"
          />
            <Input
            name="email"
            type="email"
            placeholder="Email"
            onChange={handleChange}
            className="focus-visible:ring-[#009688]/30 focus-visible:ring-2 focus-visible:border-none rounded"
          />
            <Input
            name="description"
            placeholder="Leírása"
            onChange={handleChange}
            className="focus-visible:ring-[#009688]/30 focus-visible:ring-2 focus-visible:border-none rounded"
          />
            <Input
            name="contactInfo"
            placeholder="Intézmény elérhetősége(Telefon, székhely)"
            onChange={handleChange}
            className="focus-visible:ring-[#009688]/30 focus-visible:ring-2 focus-visible:border-none rounded"
          />
         

          <Button onClick={handleSubmit} className="bg-[#009688] mt-5 text-white hover:bg-[#00796b]">Létrehozás</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default AddInstitutionsModal