import React from 'react'
import HTTP_URL from '@/config/serverConfig'
import ReportStatusTimeline from './ReportStatusTimeline';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"

function ReportDetails({ report, onBack }) {
    if (!report) return null;


    return (
        <div className="p-4 bg-white rounded shadow">
            <button onClick={onBack} className="mb-4 text-sm text-[#009688] hover:underline">
                ← Vissza a listához
            </button>



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
            <ReportStatusTimeline reportId={report.id} />

        </div>
    )
}

export default ReportDetails