import React from 'react'
import { useState, useEffect } from 'react';
import { DataTable } from "@/components/ui/data-table";
import { fetchAllUsers, updateUser } from '@/services/userService';
import { UserPen, UserX, Plus, UserCheck, UserRoundMinus  } from 'lucide-react';
import AddUserModal from "@/pages/Admin/Users/AddUserModal"
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"
import { Toaster } from '@/components/ui/sonner';
import { getAllInstitutions } from '@/services/institutionService';
import { assignUserToInstitution } from '@/services/userService'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"


function Users() {

  const [data, setData] = useState([]);
  const [institutions, setInstitutions] = useState([])
  const [openAddUser, setOpenAddUser] = useState(false);

  const handleRoleChange = async (userId, newRole) => {
    try {
      await updateUser(userId, { role: newRole })
      toast.success("Szerepkör frissítve")
      setData(prev =>
        prev.map(user => user.id === userId ? { ...user, role: newRole } : user)
      )

    } catch (error) {
      toast.error("Hiba történt a szerepkör frissítésekor")
    }
  }

  const handleStatusChange = async (userId, newStatus) => {
    try {
      await updateUser(userId, { isActive: newStatus })
      toast.success("Státusz frissítve")
      setData(prev =>
        prev.map(user => user.id === userId ? { ...user, isActive: newStatus } : user)
      )
    } catch (error) {
      toast.error("Hiba történt a státusz frissítésekor")
    }
  }
  const handleInstChange = async (userId, institutionId) => {
    const newId = institutionId === "none" ? null : institutionId;
    try {
      await assignUserToInstitution(userId, newId);
      toast.success("Intézmény sikeresen módosítva.");
      setData((prev) =>
        prev.map((u) =>
          u.id === userId ? { ...u, institutionId: newId } : u
        )
      );
    } catch (err) {
      toast.error(err);
      console.error(err);
    }
  };


  const columns = [
    {
      accessorKey: "username",
      header: "Név",
      cell: ({ row }) => {
        const user = row.original
        return (
          <Select defaultValue={user.username} disabled>
            <SelectTrigger className="w-[150px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={user.username}>{user.username}</SelectItem>
            </SelectContent>
          </Select>
        )
      }
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: ({ row }) => {
        const user = row.original
        return (
          <Select defaultValue={user.email} disabled>
            <SelectTrigger className="w-[150px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={user.email}>{user.email}</SelectItem>
            </SelectContent>

          </Select>
        )
      }
    },
    {
      accessorKey: "role",
      header: "Szerepkör",
      cell: ({ row }) => {
        const user = row.original;
        return (
          <Select
            defaultValue={user.role}
            onValueChange={(value) => handleRoleChange(user.id, value)}
          >
            <SelectTrigger className="w-[150px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="user">Felhasználó</SelectItem>
              <SelectItem value="admin">Admin</SelectItem>
              <SelectItem value="worker">Dolgozó</SelectItem>
              <SelectItem value="compliance">Ellenőr</SelectItem>
              <SelectItem value="institution">Intézmény</SelectItem>
            </SelectContent>
          </Select>
        )
      }
    },
    {
      accessorKey: "institutionId",
      header: "Intézmény",
      cell: ({ row }) => {
        const user = row.original;
        const selectedInst = institutions.find((i) => String(i.id) === String(user.institutionId));

        return (
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-[200px] justify-between">
                {selectedInst ? selectedInst.name : "Válassz intézményt"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[250px] p-0">
              <Command>
                <CommandInput placeholder="Keresés intézmény szerint..." />
                <CommandList>
                  <CommandEmpty>Nincs találat.</CommandEmpty>
                  <CommandGroup>
                    <CommandItem onSelect={() => handleInstChange(user.id, "none")}>
                      Nincs intézmény
                    </CommandItem>
                    {institutions.map((inst) => (
                      <CommandItem
                        key={inst.id}
                        onSelect={() => handleInstChange(user.id, inst.id)}
                      >
                        {inst.name}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        );
      },
    },

    {
      accessorKey: "isActive",
      header: "Státusz",
      cell: ({ row }) => {
        const user = row.original
        const statusValue = user.isActive
        const isActive = row.getValue("isActive") === "active";
        return (
          <Select
            defaultValue={statusValue}
            onValueChange={(value) => handleStatusChange(user.id, value)}
          >
            <SelectTrigger className="w-[130px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="active">
                <UserCheck className="text-green-600 w-4 h-4" />
                Aktív
              </SelectItem>
              <SelectItem value="inactive">
                <UserX className="text-red-600 w-4 h-4" />
                Inaktív
              </SelectItem>
              <SelectItem value="archived">
                <UserRoundMinus className="text-blue-400 w-4 h-4" />
                Archivált
              </SelectItem>
            </SelectContent>
          </Select>

        );
      },
    },
    {
      accessorKey: "createdAt",
      header: "Regisztráció",
      cell: ({ row }) => new Date(row.getValue("createdAt")).toLocaleDateString(),

    },
  ]


  useEffect(() => {
    const load = async () => {
      const token = localStorage.getItem("token");
      try {
        const users = await fetchAllUsers(token);
        setData(users);
        const institution = await getAllInstitutions()
        setInstitutions(institution)
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

      <Toaster richColors position="top-right" />
    </div>
  )
}

export default Users