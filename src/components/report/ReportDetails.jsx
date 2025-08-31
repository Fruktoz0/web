import React, { useState, useEffect } from 'react'
import HTTP_URL from '@/config/serverConfig'
import { getStatusHistory, getForwardLogs } from "@/services/reportService";
import ForwardModal from "@/pages/Admin/Reports/ForwardModal";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { ArrowRight, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

function ReportDetails({ report, onBack, currentUser }) {
    const [statusHistory, setStatusHistory] = useState([]);
    const [forwardLogs, setForwardLogs] = useState([]);
    const [openForward, setOpenForward] = useState(false);
    const [reload, setReload] = useState(false);

    const role = localStorage.getItem("role")

    useEffect(() => {
        if (report?.id) {
            getStatusHistory(report.id).then(setStatusHistory).catch(console.error);
            getForwardLogs(report.id).then(setForwardLogs).catch(console.error);
        }
    }, [report, reload]);

    if (!report) return null;

    const canForward = currentUser?.role === "admin" || currentUser?.role === "institution";

    return (
        <div className="p-4 bg-white rounded shadow">
            <button onClick={onBack} className="mb-4 text-sm text-[#009688] hover:underline">
                ← Vissza a listához
            </button>

            {/* Report alapadatok */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                    <h2 className="text-2xl font-bold mb-2">{report.title}</h2>
                    <p className="text-gray-600 mb-2">{report.description}</p>
                    <p><strong>Bejelentő:</strong> {report.user?.username || "Ismeretlen"}</p>
                    <p><strong>Kategória:</strong> {report.category?.categoryName || "–"}</p>
                    <p><strong>Város:</strong> {report.city}</p>
                    <p><strong>Cím:</strong> {report.address}, {report.zipCode}</p>
                    <p><strong>Koordináták:</strong> {report.locationLat}, {report.locationLng}</p>
                    <p><strong>Intézmény:</strong> {report.institution?.name || "–"}</p>
                    <p><strong>Státusz:</strong> {report.status}</p>
                    <p><strong>Dátum:</strong> {new Date(report.createdAt).toLocaleDateString("hu-HU")}</p>
                    <p><strong>Szavazatok:</strong> {report.reportVotes?.length || 0}</p>
                </div>

                <div className="flex justify-center mb-4">
                    <Carousel className="w-full max-w-md">
                        <CarouselContent>
                            {report.reportImages?.map((img, index) => (
                                <CarouselItem key={index}>
                                    <div className="p-1">
                                        <img
                                            src={`${HTTP_URL}${img.imageUrl}`}
                                            alt={`Report image ${index + 1}`}
                                            className="w-full h-64 object-cover rounded"
                                        />
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious />
                        <CarouselNext />
                    </Carousel>
                </div>
            </div>
            {currentUser.role === 'institution' && currentUser.institutionId === report.institutionId && (
                <div div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    {/* Alsó rész: státusz történet + továbbítási előzmények */}
                    {/* Bal oldalt: státusz történet */}
                    <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                        <h3 className="font-bold mb-3">Státusz történet</h3>
                        {statusHistory.length === 0 ? (
                            <p className="text-gray-500">Nincs státuszváltás.</p>
                        ) : (
                            <Accordion type="single" collapsible className="w-full">
                                {statusHistory.map((entry, idx) => (
                                    <AccordionItem
                                        key={idx}
                                        value={`status-${idx}`}
                                        className="bg-white rounded mb-2"
                                    >
                                        <AccordionTrigger>
                                            <div className="flex items-center gap-2">
                                                <span>{new Date(entry.changedAt).toLocaleString()}</span>
                                                <span className="font-medium">{entry.status}</span>
                                            </div>
                                        </AccordionTrigger>
                                        <AccordionContent>
                                            <div className="space-y-1">
                                                <p><strong>Állította:</strong> {entry.changedBy.username}</p>
                                                <p>
                                                    <strong>Dátum:</strong>{" "}
                                                    {new Date(entry.changedAt).toLocaleString()}
                                                </p>
                                                {entry.comment && (
                                                    <p className="text-sm text-gray-600 italic mt-2">
                                                        „{entry.comment}”
                                                    </p>
                                                )}
                                            </div>
                                        </AccordionContent>
                                    </AccordionItem>
                                ))}
                            </Accordion>
                        )}
                    </div>

                    {/* Jobb oldalt: továbbítási előzmények */}
                    <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                        <div className="flex items-center justify-between mb-3">
                            <h3 className="font-bold">Továbbítási előzmények</h3>
                            {canForward && (
                                <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => setOpenForward(true)}
                                    className="flex items-center gap-1"
                                >
                                    <Plus className="w-4 h-4" /> Új továbbítás
                                </Button>
                            )}
                        </div>

                        {forwardLogs.length === 0 ? (
                            <p className="text-gray-500">Nincs továbbítási előzmény.</p>
                        ) : (
                            <Accordion type="single" collapsible className="w-full">
                                {forwardLogs.map((log, idx) => (
                                    <AccordionItem
                                        key={log.id}
                                        value={`log-${idx}`}
                                        className="bg-white rounded mb-2"
                                    >
                                        <AccordionTrigger>
                                            <div className="flex items-center gap-2">
                                                <span>{new Date(log.forwardedAt).toLocaleString()}</span>
                                                <span className="flex items-center gap-1">
                                                    {log.forwardedFrom?.name}
                                                    <ArrowRight className="w-4 h-4 text-gray-600" />
                                                    {log.forwardedTo?.name}
                                                </span>
                                            </div>
                                        </AccordionTrigger>
                                        <AccordionContent>
                                            <div className="space-y-1">
                                                <p>
                                                    <strong>Továbbította:</strong>{" "}
                                                    {log.forwardedByUser?.username} ({log.forwardedByUser?.email})
                                                </p>
                                                <p><strong>Honnan:</strong> {log.forwardedFrom?.name}</p>
                                                <p><strong>Hova:</strong> {log.forwardedTo?.name}</p>
                                                <p>
                                                    <strong>Dátum:</strong>{" "}
                                                    {new Date(log.forwardedAt).toLocaleString()}
                                                </p>
                                                <p className="mt-2">
                                                    <strong>Indok:</strong>{" "}
                                                    <span className="italic text-gray-700">{log.reason}</span>
                                                </p>
                                            </div>
                                        </AccordionContent>
                                    </AccordionItem>
                                ))}
                            </Accordion>
                        )}
                    </div>
                </div>
            )}


            {/* Modal a továbbításhoz */}
            {
                canForward && (
                    <ForwardModal
                        open={openForward}
                        setOpen={setOpenForward}
                        reportId={report.id}
                        onSuccess={() => setReload(!reload)}
                    />
                )
            }
        </div >
    )
}

export default ReportDetails
