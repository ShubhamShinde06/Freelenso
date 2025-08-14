import React from "react";
import { Card, CardDescription, CardTitle } from "../ui/card";
import { ClipboardList, List, TrendingUp, User2 } from "lucide-react";

const InfoCards = ({TolClient, TolProject, TolInvoice}) => {
  return (
    <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <Card className="flex flex-row items-center gap-8 p-4 border-none">
        <div className="flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300">
          <List className="h-6 w-6" />
        </div>
        <div>
          <CardTitle className="text-xl font-bold mb-1">{TolClient}</CardTitle>
          <CardDescription>Total Clients</CardDescription>
        </div>
      </Card>
      <Card className="flex flex-row items-center gap-8 p-4 border-none">
        <div className="flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300">
          <ClipboardList className="h-6 w-6" />
        </div>
        <div>
          <CardTitle className="text-xl font-bold mb-1">{TolInvoice}</CardTitle>
          <CardDescription>Total Invoice</CardDescription>
        </div>
      </Card>
      <Card className="flex flex-row items-center gap-8 p-4 border-none">
        <div className="flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300">
          <TrendingUp className="h-6 w-6" />
        </div>
        <div>
          <CardTitle className="text-xl font-bold mb-1">{TolProject}</CardTitle>
          <CardDescription>Total Projects</CardDescription>
        </div>
      </Card>
    </div>
  );
};

export default InfoCards;
