import DashboardLayout from "@/Layouts/DashboardLayout";
import React from "react";

function Index() {
    return <div>Index</div>;
}

Index.layout = (page: React.ReactNode) => (
    <DashboardLayout title="Dashboard" children={page} />
);

export default Index;
