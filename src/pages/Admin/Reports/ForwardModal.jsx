import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { forwardReport } from "@/services/reportService";
import { getAllInstitutions } from "@/services/institutionService";
import { fetchAllCategories } from "@/services/categoryService";

function ForwardModal({ open, setOpen, reportId, onSuccess }) {
  const [institutions, setInstitutions] = useState([]);
  const [categories, setCategories] = useState([]);

  const [institutionId, setInstitutionId] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);

  // intézmények és kategóriák betöltése a modal nyitásakor
  useEffect(() => {
    if (open) {
      getAllInstitutions().then(setInstitutions).catch(console.error);
      fetchAllCategories().then(setCategories).catch(console.error);
    }
  }, [open]);

  // az aktuális intézmény kategóriái
  const filteredCategories = categories.filter(
    (cat) => String(cat.institution?.id) === String(institutionId)
  );

  const handleSubmit = async () => {
    if (!institutionId || !categoryId || !reason) {
      alert("Minden mező kitöltése kötelező!");
      return;
    }
    try {
      setLoading(true);
      await forwardReport(reportId, institutionId, categoryId, reason);
      setOpen(false);
      setReason("");
      setInstitutionId("");
      setCategoryId("");
      if (onSuccess) onSuccess(); // pl. logok újratöltése
    } catch (err) {
      console.error(err);
      alert("Hiba történt a továbbítás során!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Bejelentés továbbítása</DialogTitle>
        </DialogHeader>

        {/* Intézmény választó */}
        <Select value={institutionId} onValueChange={setInstitutionId}>
          <SelectTrigger className="w-full">
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

        {/* Kategória választó */}
        <Select
          value={categoryId}
          onValueChange={setCategoryId}
          disabled={!institutionId}
        >
          <SelectTrigger className="w-full mt-2">
            <SelectValue placeholder="Válassz kategóriát" />
          </SelectTrigger>
          <SelectContent>
            {filteredCategories.map((cat) => (
              <SelectItem key={cat.id} value={cat.id}>
                {cat.categoryName}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Indok mező */}
        <Textarea
          placeholder="Indoklás..."
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          className="mt-2"
        />

        <DialogFooter>
          <Button variant="outline" onClick={handleSubmit} disabled={loading}>
            {loading ? "Továbbítás..." : "Továbbítás"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default ForwardModal;
