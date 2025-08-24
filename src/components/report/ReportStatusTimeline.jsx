import React, { useEffect, useState } from 'react';
import { getStatusHistory } from '@/services/reportService';
import { Clock, User, MessageSquare } from 'lucide-react';

const statusLabels = {
  open: 'Függőben',
  in_progress: 'Folyamatban',
  resolved: 'Megoldva',
  rejected: 'Elutasítva',
};

const ReportStatusTimeline = ({ reportId }) => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const data = await getStatusHistory(reportId);
        setHistory(data);
      } catch (err) {
        console.error('Hiba a státusz történet lekérésénél:', err);
      }
    };
    fetchHistory();
  }, [reportId]);

  return (
    <div className="space-y-4 mt-6">
      <h3 className="text-lg font-semibold mb-2 bg-[#f5faf8]">Státusz történet</h3>
      <ul className="space-y-4 border-l-2 border-zinc-300 pl-4">
        {history.map((item, index) => (
          <li key={index} className="relative">
            <span className="absolute -left-2 top-1 w-3 h-3 bg-[#009688] rounded-full"></span>
            <p className="font-semibold">{statusLabels[item.status] || item.status}</p>
            <div className="text-sm text-zinc-600 flex items-center gap-2">
              <Clock size={14} />
              {new Date(item.changedAt).toLocaleString('hu-HU')}
            </div>
            <div className="text-sm text-zinc-600 flex items-center gap-2">
              <User size={14} />
              {item.changedBy.userName}
            </div>
            {item.comment && (
              <div className="text-sm text-zinc-700 flex items-start gap-2 mt-1">
                <MessageSquare size={14} className="mt-0.5" />
                <span>{item.comment}</span>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReportStatusTimeline;
