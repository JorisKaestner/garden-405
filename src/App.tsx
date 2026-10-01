import { BrowserRouter, Routes, Route } from "react-router-dom";
import Garden from "./garden-planner/components/Garden";
import ServiceHours from "./service-hours/components/ServiceHours";
import Layout from "./Layout";
import "./App.css";
import { AuthProvider } from "./supabase/AuthContext";

function App() {
    // AuthProvider wrapper enables supabase authenthication for all layers below
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route element={<Layout />}>
                        <Route path="/" element={<Garden />} />
                        <Route path="/service-hours" element={<ServiceHours />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;