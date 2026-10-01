import { useState } from "react";
import { supabase } from "../../supabase/supabaseClient";

export default function LoginForm() {
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<"idle" | "sent" | "error">("idle");
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
        e.preventDefault();
        const { error } = await supabase.auth.signInWithOtp({
            email,
            options: { shouldCreateUser: false },
        });
        if (error) {
            setStatus("error");
            setErrorMessage(error.message);
        } else {
            setStatus("sent");
        }
    }

    if (status === "sent") {
        return (<>
            <h3>Login to edit:</h3>
            <p>Check your email for a login link.</p>
        </>);
    }

    return (
        <>
            <h3>Login to edit:</h3>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    required
                />
                <button type="submit">Send login link</button>
                {status === "error" && <p>{errorMessage}</p>}
            </form>
        </>
    );
}