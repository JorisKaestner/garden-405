import { useEffect, useState } from "react";
import { useAuth } from "../../supabase/AuthContext.tsx";
import { supabase } from "../../supabase/supabaseClient.ts";
import type { ServiceSlot, Gardener } from "../../types";
import LoginForm from "../../garden-planner/components/LoginForm.tsx";

export default function ServiceHours() {
    const [serviceSlots, setServiceSlots] = useState<ServiceSlot[]>([]);
    const [gardeners, setGardeners] = useState<Gardener[]>([]);

    // supabase user auth
    const authenticatedUser = useAuth();

    // Form state
    const [date, setDate] = useState(
        new Date().toISOString().slice(0, 10)
    );
    const [gardenerId, setGardenerId] = useState("");
    const [hoursCompleted, setHoursCompleted] = useState(1);


    /* Load serviceSlots from supabase */
    useEffect(() => {
        async function loadServiceSlots() {
            const { data, error } = await supabase.from("service_hours").select("*");
            if (error) { console.error(error); return; }
            console.log("fetched:", data);
            setServiceSlots(data);
        }
        loadServiceSlots();
    }, []);

    /* Load gardeners from supabase */
    useEffect(() => {
        async function loadGardeners() {
            const { data, error } = await supabase.from("gardeners").select("*");
            if (error) { console.error(error); return; }
            console.log("fetched:", data);
            setGardeners(data);
        }
        loadGardeners();
    }, []);

    // sort by date
    const sortedSlots = [...serviceSlots].sort((a, b) => b.date.localeCompare(a.date));

    // group by year
    const groups = new Map<string, ServiceSlot[]>();
    for (const slot of sortedSlots) {
        const year = slot.date.slice(0, 4);
        if (!groups.has(year)) {
            groups.set(year, []);
        }
        groups.get(year)!.push(slot);   // ! silences possible null type error
    }

    async function addServiceSlot(date: string, gardenerId: string, hoursCompleted: number) {
        const { data, error } = await supabase.from("service_hours").insert(
            { date: date, gardenerId: gardenerId, hoursCompleted: hoursCompleted }
        ).select().single();
        if (error) {
            console.error(error);
            return;
        }

        // Add the newly created slot to the existing state
        setServiceSlots((current) => [...current, data]);
    }

    async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
        event.preventDefault();

        if (!gardenerId) {
            return;
        }

        await addServiceSlot(date, gardenerId, hoursCompleted);

        // reset form
        setGardenerId("");
        setHoursCompleted(1);
        setDate(new Date().toISOString().slice(0, 10));
    }

    return (
        <>
            <div>
                <h2>Add community service hours</h2>
                <form onSubmit={handleSubmit}>
                    <select
                        value={gardenerId}
                        onChange={(e) => setGardenerId(e.target.value)}
                        disabled={!authenticatedUser}
                    >
                        <option value="">-- none --</option>
                        {gardeners.map((g) => (<option key={g.id} value={g.id}>{g.name}</option>))}
                    </select>

                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        disabled={!authenticatedUser}
                    />

                    <input
                        type="number"
                        min={0}
                        value={hoursCompleted}
                        onChange={(e) =>
                            setHoursCompleted(Number(e.target.value))
                        }
                        disabled={!authenticatedUser}
                    />
                    <button type="submit" disabled={!authenticatedUser}>
                        +
                    </button>
                </form>
            </div>

            <h2>Service Hours protocol</h2>
            {authenticatedUser && (
                <>
                    {[...groups.entries()].map(([year, slots]) => (
                        <div key={year}>
                            <h3>{year}</h3>
                            <ul>
                                {slots.map((slot) => (
                                    <li key={slot.id}>
                                        {gardeners.find((g) => g.id === slot.gardenerId)?.name ?? "Unassigned"},{" "}
                                        {new Date(slot.date).toLocaleDateString("de-DE")}, {slot.hoursCompleted}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </>
            )}
            {!authenticatedUser && (
                <>
                    <p>Protocol for completed community service hours is only accessible by logged-in users.</p>
                    <hr />
                    <LoginForm />
                </>
            )}
        </>
    );
}