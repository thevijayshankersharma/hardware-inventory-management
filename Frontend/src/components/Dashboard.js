import React from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "./ui/card";
import {
  Clipboard,
  PlusCircle,
  List,
  BarChart2,
  Settings,
  UserPlus,
  AlertTriangle,
  Clock,
  LogOut
} from "lucide-react";

const functionalities = [
  { title: "Add Hardware", icon: PlusCircle, link: "/add-hardware", description: "Add new hardware to the inventory" },
  { title: "Hardware List", icon: List, link: "/hardware", description: "View and manage all hardware items" },
  { title: "Audit", icon: Clipboard, link: "/audit", description: "Perform inventory audits" },
  { title: "Reports", icon: BarChart2, link: "/reports", description: "Generate and view inventory reports" },
  { title: "Maintenance", icon: Settings, link: "/maintenance", description: "Schedule and track hardware maintenance" },
  { title: "User Management", icon: UserPlus, link: "/user-management", description: "Manage system users and permissions" },
  { title: "Alerts", icon: AlertTriangle, link: "/alerts", description: "View system alerts and notifications" },
  { title: "Lifecycle Management", icon: Clock, link: "/lifecycle", description: "Track hardware lifecycle and plan replacements" },
];

export default function Dashboard({ onLogout }) {
  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Hardware Inventory Dashboard</h1>
        <Button onClick={onLogout} variant="outline">
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {functionalities.map((item, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle className="flex items-center">
                <item.icon className="mr-2 h-6 w-6" />
                {item.title}
              </CardTitle>
              <CardDescription>{item.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Link to={item.link}>
                <Button variant="primary" className="w-full">
                  Go to {item.title}
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
