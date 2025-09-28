"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs";
import { EmployeesCard } from "../ui/employe-users-list/employees-card";
import { UsersCard } from "../ui/users-list/users-card";

export const UsersPage = () => {
  const [activeTab, setActiveTab] = useState("employees");

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="flex justify-start space-x-2 ">
        <TabsTrigger value="employees">Сотрудники</TabsTrigger>
        <TabsTrigger value="managers">Клиенты</TabsTrigger>
      </TabsList>

      <TabsContent value="employees">
        <EmployeesCard />
      </TabsContent>

      <TabsContent value="managers">
        <UsersCard />
      </TabsContent>
    </Tabs>
  );
};
