"use client";
import { client } from "@/sanity/lib/client";
import { useState, useEffect } from "react";
import { FiBell } from "react-icons/fi";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Notification } from "../../../types/ComponentsTypes";
import { Result } from "../../../types/ComponentsTypes";
const NotificationBell = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [alert, setAlert] = useState(false);
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const data: any[] = await client.fetch(
          ` *[_type == "notifications"] | order(_createdAt desc)[0...5]`
        );
        setNotifications(
          data?.map((item: any) => ({
            message: item.message,
            id: item._id,
            time: new Date(item._createdAt).toLocaleTimeString(),
          })) || []
        );
        setUnreadCount(data?.length || 0);
      } catch (error) {
        console.error("Error fetching notifications:", error);
        setNotifications([]);
      }
    };
    fetchNotifications();
    const subscription = client
      .listen(
        `*[_type in ["casual", "customerComments", "customer", "faq", "kids", "men", "newArrivals", "order", "products", "revenue", "salesData", "subscription", "topSelling", "user", "guide", "women"]]`
      )
      .subscribe((update: any) => {
        if (!update.result?._id) return;
        const result: Result = update.result;
        const schemaType = result._type;
        // const schemaName = result.name || result.title || result._id;
        const amount = result.amount ? `$${result.amount}` : "Unknown Amount";
        const customer = result.customer || "Unknown Client";
        const newMessage = `New ${schemaType} added: ${amount} from ${customer}`;
        toast.success(`${newMessage}`, {
          description: "New data received and added.",
          action: {
            label: "Undo",
            onClick: () => console.log("Undo Action"),
          },
        });
        const notificationSound = new Audio("/notification.mp3");
        notificationSound.play();
        setAlert(true);
        setTimeout(() => setAlert(false), 1000);
        setNotifications((prev) => {
          if (prev.some((notif) => notif.id === result._id)) {
            return prev;
          }
          return [
            {
              message: newMessage,
              id: result._id,
              time: new Date().toLocaleTimeString(),
            },
            ...prev,
          ].slice(0, 5);
        });
        setUnreadCount((prev) => prev + 1);
      });
    return () => subscription.unsubscribe();
  }, []);
  const handleMouseEnter = () => {
    setIsOpen(true);
    setUnreadCount(0);
  };
  const handleMouseLeave = () => setIsOpen(false);
  return (
    <div
      className="relative cursor-pointer"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        animate={{ rotate: alert ? [0, 10, -10, 0] : 0 }}
        transition={{ duration: 0.3 }}
      >
        <FiBell className="text-gray-600 dark:text-gray-300 text-xl" />
      </motion.div>
      {unreadCount > 0 && (
        <span className="absolute top-0 right-0 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
          {unreadCount}
        </span>
      )}
      {isOpen && (
        <div className="absolute right-0 w-64 bg-white dark:bg-gray-800 shadow-lg rounded-md p-3">
          <h3 className="text-sm font-semibold mb-2">Notifications</h3>
          {notifications.length > 0 ? (
            notifications.map((notif, index) => (
              <div
                key={notif.id || index}
                className="p-2 border-b last:border-none text-sm dark:border-gray-700"
              >
                <p className="font-medium">{notif.message}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {notif.time}
                </p>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500 dark:text-gray-400">
              No new notifications
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationBell;
