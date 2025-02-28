"use client"

import { useState } from "react"
import { Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function NotificationsPanel({ notifications }) {
  const [filter, setFilter] = useState("all")

  const filteredNotifications = notifications.filter((notification) => {
    if (filter === "unread") return !notification.read
    return true
  })

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Notifications</h2>
        <div className="flex gap-2">
          <Button variant={filter === "all" ? "default" : "outline"} size="sm" onClick={() => setFilter("all")}>
            All
          </Button>
          <Button variant={filter === "unread" ? "default" : "outline"} size="sm" onClick={() => setFilter("unread")}>
            Unread
          </Button>
        </div>
      </div>

      <div className="space-y-3">
        {filteredNotifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 text-center text-muted-foreground">
            <Bell className="mb-2 h-10 w-10 opacity-20" />
            <p>No notifications to display</p>
          </div>
        ) : (
          filteredNotifications.map((notification) => (
            <Card key={notification.id} className={notification.read ? "opacity-70" : ""}>
              <CardHeader className="p-3 pb-0">
                <div className="flex justify-between">
                  <CardTitle className="text-sm font-medium">{notification.title}</CardTitle>
                  <Badge variant={notification.type === "ai" ? "secondary" : "default"} className="text-[10px]">
                    {notification.type === "ai" ? "AI Insight" : "Update"}
                  </Badge>
                </div>
                <CardDescription className="text-xs">{new Date(notification.date).toLocaleString()}</CardDescription>
              </CardHeader>
              <CardContent className="p-3 pt-1">
                <p className="text-sm">{notification.message}</p>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}

