"use client";

import { useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";

import { toast } from "@/components/ui/use-toast";
import NavigationTop from "@/components/common/navigatin-side-top/clientNavigationTop";
import { useReservationsContext } from "@/context/reservationContext";
import { UserContext } from "@/context/contexts";
import { useNotifications } from "@/context/notificationContext";

export default function Account() {
  const { reservationsData } = useReservationsContext();
  const { userData, setUserData } = useContext(UserContext);
  const { createNotification } = useNotifications();

  const navigate = useNavigate();
  const [account, setAccount] = useState(userData);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleBackToHome = () => {
    navigate("/");
  };

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50">
        <NavigationTop handleBackToHome={handleBackToHome} />
      </div>
      
    </>
  );
}
