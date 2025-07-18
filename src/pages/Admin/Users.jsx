import React from 'react'
import { useState, useEffect } from 'react';
import { DataTable } from "@/components/ui/data-table";
import { fetchAllUsers } from '@/services/userService';
import { UserPen, UserX, Plus, UserCheck, } from 'lucide-react';
import AddUserModal from "@/pages/Admin/AddUserModal"
import { Button } from "@/components/ui/button";



function Users() {

  const [data, setData] = useState([]);
  const [openAddUser, setOpenAddUser] = useState(false);

  const columns = [
    {
      accessorKey: "username",
      header: "Név",
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "role",
      header: "Szerepkör",
    },
    {
      accessorKey: "isActive",
      header: "Státusz",
      cell: ({ row }) => {
        const isActive = row.getValue("isActive") === "active";
        return (
          <div className="flex items-center gap-2">
            {isActive ? (
              <>
                <UserCheck className="text-green-600 w-4 h-4" />
                Aktív
              </>
            ) : (
              <>
                <UserX className="text-red-600 w-4 h-4" />
                Inaktív
              </>
            )}
          </div>
        );
      },
    },
    {
      accessorKey: "createdAt",
      header: "Regisztráció",
      cell: ({ row }) => new Date(row.getValue("createdAt")).toLocaleDateString(),

    },
    {
      accessorKey: "action",
      header: "Műveletek",
      cell: ({ row }) => (
        <div>
          <UserPen
            className="cursor-pointer text-yellow-500 hover:text-blue-700"
            onClick={() => {
              //Felhasználó szerkesztése logika itt
              console.log("Szerkesztés:", row.original);
            }}
          >
          </UserPen>
        </div>

      ),
    },
  ]

  useEffect(() => {
    const load = async () => {
      const token = localStorage.getItem("token");
      try {
        const users = await fetchAllUsers(token);
        setData(users);
      } catch (error) {
        console.error("Hiba a felhasználók betöltésekor:", error);
      }
    };
    load();
  }, []);


  return (
    <div className="p-4 bg-white">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Felhasználók</h2>
        <Button onClick={() => (setOpenAddUser(true))} className="bg-[#009688] text-white hover:bg-[#00796b]">
          <Plus className="mr-2 h-4 w-4" /> Új felhasználó
        </Button>
      </div>
      <DataTable columns={columns} data={data} />

      <AddUserModal
        open={openAddUser}
        setOpen={setOpenAddUser}
        onUserCreated={async () => {
          const token = localStorage.getItem("token");
          const users = await fetchAllUsers(token);
          setData(users);
        }}
      />
    </div>
  )
}

export default Users