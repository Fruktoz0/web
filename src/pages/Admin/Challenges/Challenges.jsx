import React from 'react'
import { useState, useEffect } from 'react';
import { DataTable } from "@/components/ui/data-table"
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { X } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { getUserFromToken } from "@/utils/auth";

function Institutions() {
    const user = getUserFromToken();
    const [data, setData] = useState([]);
    const [openAddInstitution, setOpenAddInstitution] = useState(false);
    const [selectedInstitution, setSelectedInstitution] = useState(null);
    const [showConfirm, setShowConfirm] = useState(false);

    const columns = [
        {
            accessorKey: "name",
            header: "Intézmény neve",
        },
        {
            accessorKey: "email",
            header: "Email",
        },
        {
            accessorKey: "description",
            header: "Leírás",
        },
        {
            accessorKey: "contactInfo",
            header: "Elérhetőségek",
        },
        {
            accessorKey: "users",
            header: "Kapcsolattartók",
            cell: ({ row }) => row.original.users.map(user => user.username).join(", ") || "–",
        },
        {
            accessorKey: "createdAt",
            header: "Létrehozás dátuma",
            cell: ({ row }) => new Date(row.getValue("createdAt")).toLocaleDateString(),
        },
        {
            header: "Műveletek",
            cell: ({ row }) =>
                user?.role === "admin" && (
                    <div>
                        <Button
                            variant="outline"
                            className="cursor-pointer"
                            onClick={() => {
                                setSelectedInstitution(row.original);
                                setShowConfirm(true);
                            }}
                        >
                            Törlés
                            <X className="text-red-500 hover:text-blue-700 ml-2" />
                        </Button>
                    </div>
                )
        }
    ]

    useEffect(() => {
        const load = async () => {
            try {
                const institutions = await getAllInstitutions();

                if (user?.role === "institution") {
                    const filtered = institutions.filter(institution =>
                        institution.users?.some(us => us.id === user.id)
                    )
                    setData(filtered)
                } else {
                    setData(institutions)
                }
            } catch (error) {
                console.error("Hiba az intézmények betöltésekor:", error);
            }
        };
        load();
    }, []);


    return (
        <div className="p-4 bg-white">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Intézmények</h2>
                {user?.role === "admin" && (
                    <Button onClick={() => setOpenAddInstitution(true)} className="bg-[#009688] text-white hover:bg-[#00796b]">
                        <Plus className="mr-2 h-4 w-4" /> Új Intézmény
                    </Button>
                )}
            </div>
            <DataTable columns={columns} data={data} />

            <AddInstitutionsModal
                open={openAddInstitution}
                setOpen={setOpenAddInstitution}
                onInstitutionCreated={async () => {
                    const institutions = await getAllInstitutions();
                    setData(institutions);
                }}
            />

            <Dialog open={showConfirm} onOpenChange={setShowConfirm}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Kihívás törlése</DialogTitle>
                    </DialogHeader>
                    <p>Biztosan törölni szeretnéd a(z) <strong>{selectedInstitution?.name}</strong> intézményt?</p>
                    <div className="flex justify-end gap-2 mt-4">
                        <Button variant="outline" onClick={() => setShowConfirm(false)}>Mégsem</Button>
                        <Button
                            className="bg-red-600 text-white hover:bg-red-700"
                            onClick={async () => {
                                try {
                                    await deleteInstitution(selectedInstitution.id);
                                    const updated = await getAllInstitutions();
                                    setData(updated);
                                    setShowConfirm(false);
                                } catch (err) {
                                    console.error("Hiba a törlés közben:", err);
                                    alert("Nem sikerült törölni.");
                                }
                            }}
                        >
                            Törlés
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default Institutions