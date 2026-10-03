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
    const isLoggedIn = authenticatedUser !== null;

    // Form state
    const [date, setDate] = useState(
        new Date().toISOString().slice(0, 10)
    );
    const [gardenerId, setGardenerId] = useState("");
    const [hoursCompleted, setHoursCompleted] = useState(1);

    // dummy view when not logged in
    const PREVIEW_ROWS = [
        { date: "12.06.2026", hours: 2 },
        { date: "03.05.2026", hours: 3 },
        { date: "21.04.2026", hours: 1 },
        { date: "08.03.2026", hours: 2 },
    ];


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
        if (!isLoggedIn) { setGardeners([]); return; }
        async function loadGardeners() {
            const { data, error } = await supabase.from("gardeners").select("*");
            if (error) { console.error(error); return; }
            console.log("fetched:", data);
            setGardeners(data);
        }
        loadGardeners();
    }, [isLoggedIn]);

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

    async function deleteServiceSlot(id: ServiceSlot["id"]) {
        const { data, error } = await supabase
            .from("service_hours")
            .delete()
            .eq("id", id)
            .select();
        if (error) { console.error(error); return; }
        if (data.length === 0) {
            console.error("Nothing deleted, check the RLS delete policy");
            return;
        }
        setServiceSlots((current) => current.filter((s) => s.id !== id));
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
        <div className="service-page">
            {isLoggedIn && (
                <section className="card">
                    <h2>Add community service hours</h2>
                    <form className="slot-form" onSubmit={handleSubmit}>
                        <label>Gardener
                            <select
                                required
                                value={gardenerId}
                                onChange={(e) => setGardenerId(e.target.value)}
                            >
                                <option value="">-- none --</option>
                                {gardeners.map((g) => (<option key={g.id} value={g.id}>{g.name}</option>))}
                            </select>
                        </label>

                        <label>Date
                            <input
                                type="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                            />
                        </label>

                        <label>Hours
                            <input
                                type="number"
                                min={0}
                                value={hoursCompleted}
                                onChange={(e) =>
                                    setHoursCompleted(Number(e.target.value))
                                }
                            />
                        </label>
                        <button type="submit">
                            +
                        </button>
                    </form>
                </section>
            )}

            <section className="card">
                <h2>Service Hours protocol</h2>
                {isLoggedIn && (
                    <>
                        {[...groups.entries()].map(([year, slots]) => (
                            <div key={year}>
                                <h3>{year} <span className="year-total">{slots.reduce((sum, s) => sum + s.hoursCompleted, 0)} h</span></h3>
                                <ul className="slot-list">
                                    {slots.map((slot) => (
                                        <li key={slot.id}>
                                            <span>{gardeners.find((g) => g.id === slot.gardenerId)?.name ?? "Unassigned"}</span>
                                            <span>{new Date(slot.date).toLocaleDateString("de-DE")}</span>
                                            <span>{slot.hoursCompleted} h</span>
                                            <button
                                                className="delete-btn"
                                                aria-label="Delete entry"
                                                onClick={() => {
                                                    if (window.confirm("Delete this entry?")) deleteServiceSlot(slot.id);
                                                }}
                                            >
                                                ✕
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </>
                )}
                {!isLoggedIn && (
                    <>
                        <div className="preview-wrap">
                            <ul className="slot-list preview-blur" aria-hidden="true">
                                {PREVIEW_ROWS.map((row) => (
                                    <li key={row.date}>
                                        <span>Max Mustermann</span><span>{row.date}</span><span>{row.hours} h</span>
                                    </li>
                                ))}
                            </ul>
                            <div className="preview-overlay">
                                <p>The protocol is only visible to logged-in members.</p>
                                <LoginForm />
                            </div>
                        </div>
                    </>
                )}
            </section>
        </div>
    );
}