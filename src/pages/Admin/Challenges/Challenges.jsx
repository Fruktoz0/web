import React from 'react'
import { useState, useEffect } from 'react';
import { DataTable } from "@/components/ui/data-table"
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { X } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { getUserFromToken } from "@/utils/auth";
import { getAllChallenges, getAssignedChallenges } from '@/services/challengeService';
import HTTP_URL from '@/config/serverConfig';
import ChallengesDetails from './ChallengesDetails';

function Challenges({ mode = "all" }) {
    const user = getUserFromToken();
    const [data, setData] = useState([]);
    const [selectedChallenge, setSelectedChallenge] = useState(null);
    const [showConfirm, setShowConfirm] = useState(false);

    const columns = [
        {
            accessorKey: "image",
            header: "Kihívás neve",
            cell: ({ row }) => {
                const img = row.original.image;
                return img ? (
                    <img
                        src={`${HTTP_URL}${img}`}
                        alt="kép"
                        className='h-12 h-12 object-cover rounded'
                    />
                ) : (
                    <span className='text-sm text-gray-400'>-</span>
                )
            }
        },
        {
            accessorKey: "title",
            header: "Kihívás neve",
        },
        {
            accessorKey: "costPoints",
            header: "Pont költsége",
        },
        {
            accessorKey: "rewardPoints",
            header: "Pont jutalma",
        },
        {
            accessorKey: "startDate",
            header: "Kihívás kezdete",
            cell: ({ row }) => new Date(row.getValue("startDate")).toLocaleDateString(),
        },
        {
            accessorKey: "endDate",
            header: "Kihívás vége",
            cell: ({ row }) => new Date(row.getValue("endDate")).toLocaleDateString(),
        },
        {
            header: "Műveletek",
            cell: ({ row }) => (
                <Button variant="ghost" className="text-[#009688]" onClick={() => setSelectedChallenge(row.original)}>
                    Megtekintés
                </Button>
            ),
        },
    ]

    useEffect(() => {
        const load = async () => {
            try {
                const token = localStorage.getItem("token")
                if (!token) return;

                // Kihívások betöltése
                let challenges = []
                if (mode === "assigned") {
                    challenges = await getAssignedChallenges(token)   // <-- intézményi
                } else {
                    challenges = await getAllChallenges(token)        // <-- összes
                }
                setData(challenges)

            } catch (err) {
                throw (err)
            }
        }
        load()
    }, [mode])


    return (
        <div className="p-4 bg-white">
            {selectedChallenge ? (
                <ChallengesDetails
                    challenge={selectedChallenge}
                    onBack={() => setSelectedChallenge(null)}

                />

            ) : (
                <>
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-2xl font-bold">Kihívások</h2>

                        <Button onClick={() => setOpenAddChallenges(true)} className="bg-[#009688] text-white hover:bg-[#00796b]">
                            <Plus className="mr-2 h-4 w-4" /> Új Kihívás
                        </Button>

                    </div>
                    <DataTable columns={columns} data={data} />
                </>

            )
            }
        </div>
    )
}

export default Challenges