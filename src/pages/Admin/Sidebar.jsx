import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"
import { Users, FileText, Building2 } from "lucide-react"

function Sidebar() {
    return (
        <aside className="w-64 bg-white shadow-md h-screen flex flex-col">
            <div className="p-4 font-bold text-xl"><a href="/admin/dashboard">Tiszta Város</a></div>

            <Accordion type="multiple" defaultValue={["users", "reports", "institutions", "categories"]} className="p-2">
                {/* Felhasználók */}
                <AccordionItem value="users">
                    <AccordionTrigger className="flex items-center justify-between px-4 py-2 rounded hover:bg-gray-100">
                        <span className="flex items-center gap-2"><Users size={16} /> Felhasználók</span>
                    </AccordionTrigger>
                    <AccordionContent className="ml-6 mt-1 space-y-1">
                        <a href="/admin/users" className="block px-2 py-1 rounded hover:bg-gray-100">
                            Listázás
                        </a>
                 
                    </AccordionContent>
                </AccordionItem>

                {/* Bejelentések */}
                <AccordionItem value="reports">
                    <AccordionTrigger className="flex items-center justify-between px-4 py-2 rounded hover:bg-gray-100">
                        <span className="flex items-center gap-2"><FileText size={16} /> Bejelentések</span>
                    </AccordionTrigger>
                    <AccordionContent className="ml-6 mt-1 space-y-1">
                        <a href="/admin/reports" className="block px-2 py-1 rounded hover:bg-gray-100">
                            Listázás
                        </a>
                  
                    </AccordionContent>
                </AccordionItem>

                {/* Kategóriák */}
                <AccordionItem value="categories">
                    <AccordionTrigger className="flex items-center justify-between px-4 py-2 rounded hover:bg-gray-100">
                        <span className="flex items-center gap-2"><FileText size={16} /> Kategóriák</span>
                    </AccordionTrigger>
                    <AccordionContent className="ml-6 mt-1 space-y-1">
                        <a href="/admin/categories" className="block px-2 py-1 rounded hover:bg-gray-100">
                            Listázás
                        </a>
                  
                    </AccordionContent>
                </AccordionItem>

                {/* Intézmények */}
                <AccordionItem value="institutions">
                    <AccordionTrigger className="flex items-center justify-between px-4 py-2 rounded hover:bg-gray-100">
                        <span className="flex items-center gap-2"><Building2 size={16} /> Intézmények</span>
                    </AccordionTrigger>
                    <AccordionContent className="ml-6 mt-1 space-y-1">
                        <a href="/admin/institutions" className="block px-2 py-1 rounded hover:bg-gray-100">
                            Listázás
                        </a>
                    
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </aside>
    )
}


export default Sidebar;