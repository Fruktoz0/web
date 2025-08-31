import React, { useEffect, useState } from 'react'
import { fetchAllReports, fetchAssignedReports } from '@/services/reportService'
import HTTP_URL from '@/config/serverConfig'
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { DataTable } from "@/components/ui/data-table";
import ReportDetails from '@/components/report/ReportDetails';
import { fetchUser } from "@/services/authService";

function Reports({ mode = "all" }) {

  const [data, setData] = useState([]);
  const [selectedReport, setSelectedReport] = useState(null)
  const [currentUser, setCurrentUser] = useState(null)

  const columns = [
    {
      accessorKey: "image",
      header: "Kép",
      cell: ({ row }) => {
        const img = row.original.reportImages?.[0]?.imageUrl;
        return img ? (
          <img
            src={`${HTTP_URL}${img}`}
            alt="kép"
            className="w-12 h-12 object-cover rounded"
          />

        ) : (
          <span className="text-sm text-gray-400">–</span>
        );
      },
    },
    {
      accessorKey: "user.username",
      header: "Bejelentő",
      cell: ({ row }) => row.original.user?.username || "Ismeretlen",
    },
    {
      accessorKey: "title",
      header: "Cím",
    },
    {
      accessorKey: "category.name",
      header: "Kategória",
      cell: ({ row }) => row.original.category?.categoryName || "–",
    },
    {
      accessorKey: "city",
      header: "Város",
    },
    {
      accessorKey: "createdAt",
      header: "Dátum",
      cell: ({ row }) => new Date(row.original.createdAt).toLocaleDateString("hu-HU"),
    },
    {
      accessorKey: "institution.name",
      header: "Intézmény",
      cell: ({ row }) => row.original.institution?.name || "–",
    },
    {
      accessorKey: "action",
      header: "Művelet",
      cell: ({ row }) => (
        <Button variant="ghost" className="text-[#009688]" onClick={() => setSelectedReport(row.original)}>
          Megtekintés
        </Button>
      ),
    },
  ];


  useEffect(() => {
    const load = async () => {
      try {
        const token = localStorage.getItem("token")
        if (!token) return;

        // user betöltése
        const user = await fetchUser(token)
        setCurrentUser(user)

        let reports = []
        if (mode === "assigned") {
          reports = await fetchAssignedReports(token)   // <-- intézményi
        } else {
          reports = await fetchAllReports(token)        // <-- összes
        }
        setData(reports)

      } catch (err) {
        console.error('Hiba a bejelentések vagy a user lekérdezésekor', err)
      }
    }
    load()
  }, [mode])

  return (
    <div className="p-4 bg-white">
      {selectedReport ? (
        <ReportDetails
          report={selectedReport}
          onBack={() => setSelectedReport(null)}
          currentUser={currentUser}
        />
      ) : (
        <>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Bejelentések</h2>
            <Button onClick={() => { }} className="bg-[#009688] text-white hover:bg-[#00796b]">
              <Plus className="mr-2 h-4 w-4" /> Új Bejelentés
            </Button>
          </div>
          <DataTable columns={columns} data={data} />
        </>
      )}
    </div>
  )
}

export default Reports