import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"
import { Users, FileText, Building2 } from "lucide-react"
import { Link, useLocation } from "react-router-dom"

function Sidebar() {

    const location = useLocation()
    const basePath = location.pathname.startsWith("/institutions") ? "/institutions" : "/admin"

    const role = localStorage.getItem("role")

    return (
        <aside className="w-64 bg-white shadow-md h-screen flex flex-col">
            <div className="p-4 font-bold text-xl"><Link to={`${basePath}/dashboard`}>Tiszta Város</Link></div>

            <Accordion type="multiple" defaultValue={["users", "reports", "institutions", "categories", "challenges"]} className="p-2">
                {/* Felhasználók */}
                {role === "admin" && (
                    <AccordionItem value="users">
                        <AccordionTrigger className="flex items-center justify-between px-4 py-2 rounded hover:bg-gray-100">
                            <span className="flex items-center gap-2"><Users size={16} /> Felhasználók</span>
                        </AccordionTrigger>
                        <AccordionContent className="ml-6 mt-1 space-y-1">
                            <Link to={`${basePath}/users`} className="block px-2 py-1 rounded hover:bg-gray-100">
                                Listázás
                            </Link>

                        </AccordionContent>
                    </AccordionItem>
                )}


                {/* Bejelentések */}
                <AccordionItem value="reports">
                    <AccordionTrigger className="flex items-center justify-between px-4 py-2 rounded hover:bg-gray-100">
                        <span className="flex items-center gap-2"><FileText size={16} /> Bejelentések</span>
                    </AccordionTrigger>
                    <AccordionContent className="ml-6 mt-1 space-y-1">
                        <Link to={`${basePath}/reports`} className="block px-2 py-1 rounded hover:bg-gray-100">
                            Összes listázás
                        </Link>
                        {role === "institution" && (
                            <Link to={`${basePath}/assigned-reports`} className="block px-2 py-1 rounded hover:bg-gray-100">
                                Saját intézmény bejelentései
                            </Link>
                        )}


                    </AccordionContent>

                </AccordionItem>

                {/* Kategóriák */}
                <AccordionItem value="categories">
                    <AccordionTrigger className="flex items-center justify-between px-4 py-2 rounded hover:bg-gray-100">
                        <span className="flex items-center gap-2"><FileText size={16} /> Kategóriák</span>
                    </AccordionTrigger>
                    <AccordionContent className="ml-6 mt-1 space-y-1">
                        <Link to={`${basePath}/categories`} className="block px-2 py-1 rounded hover:bg-gray-100">
                            Összes listázása
                        </Link>

                    </AccordionContent>
                </AccordionItem>

                {/* Intézmények */}
                <AccordionItem value="institutions">
                    <AccordionTrigger className="flex items-center justify-between px-4 py-2 rounded hover:bg-gray-100">
                        <span className="flex items-center gap-2"><Building2 size={16} /> Intézmények</span>
                    </AccordionTrigger>
                    <AccordionContent className="ml-6 mt-1 space-y-1">
                        <Link to={`${basePath}/institutions`} className="block px-2 py-1 rounded hover:bg-gray-100">
                            Összes listázása
                        </Link>

                    </AccordionContent>

                </AccordionItem>
                <AccordionItem value="challenges">
                    <AccordionTrigger className="flex items-center justify-between px-4 py-2 rounded hover:bg-gray-100">
                        <span className="flex items-center gap-2"><Building2 size={16} /> Kihívások</span>
                    </AccordionTrigger>
                    <AccordionContent className="ml-6 mt-1 space-y-1">
                        <Link to={`${basePath}/challenges`} className="block px-2 py-1 rounded hover:bg-gray-100">
                            Összes listázása
                        </Link>

                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </aside>
    )
}


export default Sidebar;