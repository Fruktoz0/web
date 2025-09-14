import { useState, useEffect } from "react";
import {
    Dialog,
    DialogTitle,
    DialogHeader,
    DialogContent,
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
import { statusChange } from "@/services/reportService";



function StatusChangeModal({ open, setOpen, reportId, currentStatus, onSuccess }) {

    const [status, setStatus] = useState(currentStatus || "");
    const [comment, setComment] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const statusOptions = [
        { value: "open", label: "Nyitva" },
        { value: "forwarded", label: "Továbbítva" },
        { value: "in_progress", label: "Folyamatban" },
        { value: "resolved", label: "Megoldva" },
        { value: "rejected", label: "Elutasítva" },
        { value: "reopened", label: "Újranyitva" },
    ];

    useEffect(() => {
        if (open) {
            setStatus("");
            setComment("");
        }
    }, [open, currentStatus]);

    const handleSubmit = async () => {
        try {
            setLoading(true);
            setError(null);
            await statusChange(reportId, status, comment);
            setOpen(false);
            setStatus(currentStatus || "");
            setComment("");
            if (onSuccess) onSuccess();
        } catch (err) {
            setError(err)
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Státusz módosítása</DialogTitle>
                </DialogHeader>
                <p className="text-sm text-gray-500">Jelenlegi státusz: {statusOptions.find(option => option.value === currentStatus)?.label}</p>
                <Select value={status} onValueChange={(val) => {
                    setStatus(val)
                    setError(null)
                }}>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Válassz új státuszt" />
                    </SelectTrigger>
                    <SelectContent>
                        {statusOptions.map((option) => (
                            <SelectItem 
                            key={option.value} 
                            value={option.value}
                            disabled={option.value === currentStatus}>
                                {option.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <Textarea
                    placeholder="Megjegyzés..."
                    value={comment}
                    onChange={(e) => {
                        setComment(e.target.value)
                        setError(null)
                    }}
                    className="mt-2"
                />
                {error && <p className="text-red-500">{error}</p>}

                <DialogFooter>
                    <Button variant="outline" onClick={handleSubmit} disabled={loading}>
                        {loading ? "Módosítás..." : "Módosítás"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default StatusChangeModal