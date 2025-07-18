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
import { createCategory } from "@/services/categoryService";
import { getAllInstitutions } from "@/services/institutionService"

function AddCategoryModal({ open, setOpen, onCategoryCreated }) {

  const [institutions, setInstitutions] = useState([]);

  const [form, setForm] = useState({
    categoryName: "",
    defaultInstitutionId: "",
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
      await createCategory(form)
      onCategoryCreated();
      setOpen(false);
    } catch (error) {
      if (error.response?.status === 400) {
        alert('Már létezik ilyen nevű kategória!')
      }
      console.error("Hiba kategória létrehozásakor:", error);
      alert("Hiba történt. Ellenőrizd az adatokat.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Új Kategória</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-2">
          <Input
            name="categoryName"
            placeholder="Kategória neve"
            onChange={handleChange}
            className="focus-visible:ring-[#009688]/30 focus-visible:ring-2 focus-visible:border-none rounded"
          />
          <Select
            onValueChange={(value) =>
              setForm((prev) => ({ ...prev, defaultInstitutionId: value }))
            }
            value={form.defaultInstitutionId}
          >
            <SelectTrigger className="focus-visible:ring-[#009688]/30 focus-visible:ring-2 focus-visible:border-none">
              <SelectValue placeholder="Válassz intézményt" />
            </SelectTrigger>
            <SelectContent>
              {institutions.map((inst) => (
                <SelectItem key={inst.id} value={inst.id}>
                  {inst.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>


          <Button onClick={handleSubmit} className="bg-[#009688] mt-5 text-white hover:bg-[#00796b]">Létrehozás</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default AddCategoryModal;
