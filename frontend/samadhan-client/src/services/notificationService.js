/* TEMP MOCK NOTIFICATION SERVICE

This is used until backend notification service is fully running. */

import { API_NOTIFICATION_BASE_URL } from "../constants/apiConfig";


/* MOCK DATA
export const getNotificationsMock = async () => {
  return [
    {
      id: 1,
      message: "Your grievance has been submitted successfully.",
      createdAt: "2026-01-27 10:30 AM",
      read: false,
    },
    {
      id: 2,
      message: "Your grievance status is now IN_PROGRESS.",
      createdAt: "2026-01-26 06:15 PM",
      read: true,
    },
  ];
};

*/

//REAL API

export const getNotifications = async (token) => {
 const response = await fetch(`${API_NOTIFICATION_BASE_URL}/notifications`, 
 {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch notifications");
  }

  return response.json();
};
