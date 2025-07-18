import React from 'react'
import { useState, useEffect } from 'react';
import { DataTable } from "@/components/ui/data-table"
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { fetchAllCategories } from '@/services/categoryService';
import AddCategoryModal from './AddCategoryModal';

function Categories() {

    const [data, setData] = useState([]);
    const [openAddCategory, setOpenAddCategory] = useState(false);

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
        </div>
    )
}

export default Categories