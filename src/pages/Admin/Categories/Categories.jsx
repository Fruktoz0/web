import React from 'react'
import { useState, useEffect } from 'react';
import { DataTable } from "@/components/ui/data-table"
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { fetchAllCategories } from '@/services/categoryService';
import AddCategoryModal from './AddCategoryModal';
import { X } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { deleteCategory } from '@/services/categoryService';


function Categories() {

    const [data, setData] = useState([]);
    const [openAddCategory, setOpenAddCategory] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [showConfirm, setShowConfirm] = useState(false);

    const columns = [
        {
            accessorKey: "categoryName",
            header: "Kategória neve",
        },
        {
            accessorKey: "institution.name",
            header: "Hozzárendelt Intézmény",
            cell: ({ row }) => row.original.institution?.name || "–",
        },
        {
            accessorKey: "createdAt",
            header: "Létrehozás dátuma",
            cell: ({ row }) => new Date(row.getValue("createdAt")).toLocaleDateString(),
        },
        {
            header: "Műveletek",
            cell: ({ row }) => (
                <div>
                    <Button
                        variant="outline"
                        className="cursor-pointer"
                        onClick={() => {
                            setSelectedCategory(row.original)
                            setShowConfirm(true)
                        }}
                    >
                        Törlés
                        <X
                            className="text-red-500 hover:text-blue-700 ml-2"
                        />
                    </Button>
                </div>
            )
        }
    ]

    useEffect(() => {
        const load = async () => {
            try {
                const categories = await fetchAllCategories();
                setData(categories);
            } catch (error) {
                console.error("Hiba a kategóriák betöltésekor:", error);
            }
        };
        load();
    }, []);



    return (
        <div className="p-4 bg-white">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Kategóriák</h2>
                <Button onClick={() => (setOpenAddCategory(true))} className="bg-[#009688] text-white hover:bg-[#00796b]">
                    <Plus className="mr-2 h-4 w-4" /> Új Kategória
                </Button>
            </div>
            <DataTable columns={columns} data={data} />

            <AddCategoryModal
                open={openAddCategory}
                setOpen={setOpenAddCategory}
                onCategoryCreated={async () => {
                    const categories = await fetchAllCategories();
                    setData(categories);
                }}
            />
            <Dialog open={showConfirm} onOpenChange={setShowConfirm}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Kategória törlése</DialogTitle>
                    </DialogHeader>
                    <p>Biztosan törölni szeretnéd a(z) <strong>{selectedCategory?.categoryName}</strong> kategóriát?</p>
                    <div className="flex justify-end gap-2 mt-4">
                        <Button variant="outline" onClick={() => setShowConfirm(false)}>Mégsem</Button>
                        <Button
                            className="bg-red-600 text-white hover:bg-red-700"
                            onClick={async () => {
                                try {
                                    await deleteCategory(selectedCategory.id);
                                    const updated = await fetchAllCategories();
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

export default Categories