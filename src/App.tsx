import Garden from "./components/Garden";
import "./App.css";
import { AuthProvider } from "./supabase/AuthContext";

function App() {
    // AuthProvider wrapper enables supabase authenthication for all layers below
    return (
        <AuthProvider>
            <Garden />
        </AuthProvider>
    );
}

export default App;