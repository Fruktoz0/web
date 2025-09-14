import React, { useState, useEffect } from 'react'
import HTTP_URL from '@/config/serverConfig'
import { getStatusHistory, getForwardLogs } from "@/services/reportService";
import ForwardModal from "@/pages/Admin/Reports/ForwardModal";
import StatusChangeModal from "@/pages/Admin/Reports/StatusChangeModal";
import { getReportById } from '@/services/reportService';
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
    const [openStatusChange, setOpenStatusChange] = useState(false);
    const [reload, setReload] = useState(false);
    const [reportData, setReportData] = useState(report);

    const status = [
        { value: "open", label: "Nyitva" },
        { value: "forwarded", label: "Továbbítva" },
        { value: "in_progress", label: "Folyamatban" },
        { value: "resolved", label: "Megoldva" },
        { value: "rejected", label: "Elutasítva" },
        { value: "reopened", label: "Újranyitva" },
    ]

    const getStatusLabel = (value) => {
        const match = status.find((s) => s.value === value);
        return match ? match.label : value;
    };



    useEffect(() => {
        if (report?.id) {
            getReportById(report.id).then(setReportData).catch(console.error);
            getStatusHistory(report.id).then(setStatusHistory).catch(console.error);
            getForwardLogs(report.id).then(setForwardLogs).catch(console.error);
        }
    }, [report, reload]);

    if (!report) return null;

    const canForward = currentUser?.role === "admin" || currentUser?.role === "institution";
    const isAuthorized = currentUser.role === 'admin' || (currentUser.role === 'institution' && currentUser.institutionId === report.institutionId);

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
                    <p><strong>Bejelentő:</strong> {reportData.user?.username || "Ismeretlen"}</p>
                    <p><strong>Kategória:</strong> {reportData.category?.categoryName || "–"}</p>
                    <p><strong>Város:</strong> {reportData.city}</p>
                    <p><strong>Cím:</strong> {reportData.address}, {reportData.zipCode}</p>
                    <p><strong>Koordináták:</strong> {reportData.locationLat}, {reportData.locationLng}</p>
                    <p><strong>Intézmény:</strong> {reportData.institution?.name || "–"}</p>
                    <p><strong>Státusz:</strong> {status.find((option) => option.value === reportData.status)?.label}</p>
                    <p><strong>Dátum:</strong> {new Date(reportData.createdAt).toLocaleDateString("hu-HU")}</p>
                    <p><strong>Szavazatok:</strong> {reportData.reportVotes?.length || 0}</p>
                </div>

                <div className="flex justify-center mb-4">
                    <Carousel className="w-full max-w-md">
                        <CarouselContent>
                            {reportData.reportImages?.map((img, index) => (
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
            {currentUser.role === 'institution' && currentUser.institutionId !== report.institutionId && (
                <p className="text-sm text-gray-500 mb-4">
                    Megjegyzés: Az intézmény csak a hozzá tartozó bejelentéseknek láthatja a státuszát és kezelheti.
                </p>
            )}

            {/* Csak akkor jelenjen meg, ha az aktuális user intézményhez tartozik vagy admin */}
            {isAuthorized && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    {/* Alsó rész: státusz történet + továbbítási előzmények */}
                    {/* Bal oldalt: státusz történet */}
                    <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                        <div className="flex items-center justify-between mb-3">
                            <h3 className="font-bold mb-3">Státusz történet</h3>
                            {canForward && (
                                <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => setOpenStatusChange(true)}
                                    className="flex items-center gap-1"
                                >
                                    <Plus className="w-4 h-4" /> Új státuszváltás
                                </Button>
                            )}
                        </div>

                        {statusHistory.length === 0 ? (
                            <p className="text-gray-500">Nincs státuszváltási előzmény.</p>
                        ) : (
                            <Accordion type="single" collapsible className="w-full">
                                {statusHistory.map((entry, idx) => (
                                    <AccordionItem
                                        key={idx}
                                        value={`status-${idx}`}
                                        className="bg-white rounded mb-2 px-2"
                                    >
                                        <AccordionTrigger>
                                            <div className="flex items-center gap-2">
                                                <span className='text-gray-500'>{new Date(entry.changedAt).toLocaleString()}</span>
                                                <span className="font-medium">{getStatusLabel(entry.status)}</span>
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
                                        className="bg-white rounded mb-2 px-2"
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
                        reportId={reportData.id}
                        onSuccess={() => setReload(!reload)}
                    />
                )
            }

            {/* Modal a státuszváltáshoz */}
            {
                canForward && (
                    <StatusChangeModal
                        open={openStatusChange}
                        setOpen={setOpenStatusChange}
                        reportId={reportData.id}
                        currentStatus={reportData.status}
                        onSuccess={() => setReload(!reload)}
                    />
                )
            }

        </div >
    )
}

export default ReportDetails
