import React, { useState, useEffect } from "react";
import { createIcons, icons } from "lucide";
import NavigationSide from "@/components/common/navigatin-side-top/NavigationSide";
import NavigationTop from "@/components/common/navigatin-side-top/NavigationTop";
import { MessageSquare, FileText, ThumbsUp, User } from "lucide-react";

const AdminEventLogs = ({ sidebarOpen, toggleSidebar }) => {
  // Dummy event logs data
  const [eventLogs, setEventLogs] = useState([
    { id: 1, user: "Grant McNulty", eventType: "comment", eventDescription: "Comment by Grant McNulty on Re-introducing Jetpack Search for WordPress Sites: Hi again, Greg. I have a query about a multilingual site. I will have content in multiple languages, most likely...", eventDate: "2023-05-20 13:36:00", status: "Comment awaiting approval" },
    { id: 2, user: "Nauris Pūķis", eventType: "update", eventDescription: "8 updates made to WCEU 2020", eventDate: "2023-05-20 10:48:00", status: "" },
    { id: 3, user: "Nauris Pūķis", eventType: "edit", eventDescription: "WCEU 2020 - Backup", eventDate: "2023-05-20 08:56:00", status: "Page modified" },
    { id: 4, user: "Unknown", eventType: "feedback", eventDescription: "Gregory - 2020-05-20 08:04:52", eventDate: "2023-05-20 08:04:00", status: "Feedback received" },
    { id: 5, user: "Nauris Pūķis", eventType: "update", eventDescription: "13 updates made to WCEU 2020", eventDate: "2023-05-20 07:30:00", status: "" },
  ]);

  // Initialize Lucide icons after component is mounted
  useEffect(() => {
    createIcons({ icons });
  }, []);

  const getEventIcon = (eventType) => {
    switch (eventType) {
      case "comment":
        return <MessageSquare className="text-yellow-500" />;
      case "update":
      case "edit":
        return <FileText className="text-blue-500" />;
      case "feedback":
        return <ThumbsUp className="text-green-500" />;
      default:
        return <User className="text-gray-500" />;
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="flex flex-row overflow-hidden relative w-screen h-screen bg-gray-100">
      <NavigationSide isOpen={sidebarOpen} />
      <div className="flex-1 overflow-auto">
        <NavigationTop onSidebarToggle={toggleSidebar} />
        <main className="p-6">
          <h1 className="text-2xl font-bold mb-6">May 20, 2023 — Today</h1>
          <div className="space-y-4">
            {eventLogs.map((log) => (
              <div key={log.id} className="flex items-start space-x-4 bg-white p-4 rounded-lg shadow">
                <div className="flex-shrink-0 w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                  {getEventIcon(log.eventType)}
                </div>
                <div className="flex-grow">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-500">{formatDate(log.eventDate)}</p>
                  </div>
                  <h3 className="font-semibold">{log.user}</h3>
                  <p className="text-sm text-gray-700">{log.eventDescription}</p>
                  {log.status && <p className="text-xs text-gray-500 mt-1">{log.status}</p>}
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminEventLogs;