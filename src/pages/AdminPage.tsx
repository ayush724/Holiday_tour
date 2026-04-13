import { useEffect, useMemo, useState } from "react";
import Layout from "../components/layout/Layout";
import { allTours } from "../data/tours";
import { createClient } from "@supabase/supabase-js";
import {supabase} from "@/lib/supabase";


const defaultFormState = {
  id: "",
  title: "",
  description: "",
  duration: "",
  image: "",
  category: "",
  featured: false,
  locations: "",
  highlights: "",
  advancedJson: "{}",
  itinerary: [],
};

// ============================
// Itinerary Editor (unchanged)
// ============================
const ItineraryEditor = ({ itinerary, onChange }) => {
  const [dragIndex, setDragIndex] = useState(null);

  const update = (data) => {
    onChange(data.map((d, i) => ({ ...d, day: i + 1 })));
  };

  const handleDrop = (index) => {
    const updated = [...itinerary];
    const [moved] = updated.splice(dragIndex, 1);
    updated.splice(index, 0, moved);
    update(updated);
  };

  return (
    <div className="space-y-4">
      <h3 className="font-semibold">Itinerary</h3>

      {itinerary.map((day, i) => (
        <div
          key={i}
          draggable
          onDragStart={() => setDragIndex(i)}
          onDragOver={(e) => e.preventDefault()}
          onDrop={() => handleDrop(i)}
          className="border p-3 rounded bg-gray-50"
        >
          <div className="flex justify-between">
            <strong>Day {day.day}</strong>
            <button
              onClick={() =>
                update(itinerary.filter((_, idx) => idx !== i))
              }
              className="text-red-500 text-xs"
            >
              Remove
            </button>
          </div>

          <input
            value={day.title}
            onChange={(e) => {
              const updated = [...itinerary];
              updated[i].title = e.target.value;
              update(updated);
            }}
            placeholder="Title"
            className="w-full mt-2 border p-2"
          />

          <textarea
            value={day.description}
            onChange={(e) => {
              const updated = [...itinerary];
              updated[i].description = e.target.value;
              update(updated);
            }}
            placeholder="Description"
            className="w-full mt-2 border p-2"
          />

          {day.activities.map((act, j) => (
            <div key={j} className="flex gap-2 mt-2">
              <input
                value={act}
                onChange={(e) => {
                  const updated = [...itinerary];
                  updated[i].activities[j] = e.target.value;
                  update(updated);
                }}
                className="flex-1 border p-2"
              />
              <button
                onClick={() => {
                  const updated = [...itinerary];
                  updated[i].activities.splice(j, 1);
                  update(updated);
                }}
                className="text-red-500"
              >
                X
              </button>
            </div>
          ))}

          <button
            onClick={() => {
              const updated = [...itinerary];
              updated[i].activities.push("");
              update(updated);
            }}
            className="text-blue-500 text-sm mt-2"
          >
            + Add Activity
          </button>
        </div>
      ))}

      <button
        onClick={() =>
          update([
            ...itinerary,
            {
              day: itinerary.length + 1,
              title: "",
              description: "",
              activities: [],
            },
          ])
        }
        className="text-green-600 text-sm"
      >
        + Add Day
      </button>
    </div>
  );
};

// ============================
// Admin Page
// ============================
const AdminPage = () => {
  const [tours, setTours] = useState([]);
  const [mode, setMode] = useState("list");
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(defaultFormState);

  // ✅ LOAD FROM SUPABASE
  const loadTours = async () => {
    const { data } = await supabase.from("tours").select("*");
    if (data && data.length > 0) setTours(data);
    else setTours(allTours);
  };

  useEffect(() => {
    loadTours();
  }, []);

  const selectedTour = useMemo(
    () => tours.find((t) => t.id === editingId),
    [editingId, tours]
  );

  useEffect(() => {
    if (!selectedTour) return;

    setForm({
      id: selectedTour.id,
      title: selectedTour.title || "",
      description: selectedTour.description || "",
      duration: selectedTour.duration || "",
      image: selectedTour.image || "",
      category: selectedTour.category || "",
      featured: !!selectedTour.featured,
      locations: (selectedTour.locations || []).join(", "),
      highlights: (selectedTour.highlights || []).join(", "),
      advancedJson: "{}",
      itinerary: selectedTour.itinerary || [],
    });
  }, [selectedTour]);

  const resetForm = () => {
    setMode("list");
    setEditingId(null);
    setForm(defaultFormState);
  };

  // ✅ SAVE TO SUPABASE + VERSION
  const saveTour = async () => {
    const {advancedJson,...rest } =form;

    console.log(rest);
    
    const tour = {
      ...rest,
      locations: form.locations.split(",").map(i => i.trim()).filter(Boolean),
      highlights: form.highlights.split(",").map(i => i.trim()).filter(Boolean),
      contact: {
        phone: ["+91-9412072802"],
        email: ["indiaholidayhome@gmail.com"],
      },
    };

    let updated = [...tours];

    
    
    const index = updated.findIndex(t => t.id === form.id);

    if (index !== -1) updated[index] = tour;
    else updated.unshift(tour);

    console.log(updated);

    // 🔥 SAVE VERSION
    await supabase.from("tour_versions").insert([
      {
        timestamp: new Date(),
        data: updated,
      },
    ]);

    // 🔥 REPLACE DATA
    await supabase.from("tours").delete().neq("id", "");
    await supabase.from("tours").insert(updated);

    setTours(updated);
    resetForm();
  };

  const deleteTour = async (id) => {
    if (!window.confirm("Delete this tour?")) return;

    const updated = tours.filter(t => t.id !== id);

    await supabase.from("tours").delete().neq("id", "");
    await supabase.from("tours").insert(updated);

    setTours(updated);
  };

  return (
    <Layout>
      <div className="container mx-auto py-10">
        <div className="flex justify-between mb-6">
          <h1 className="text-2xl font-bold">Admin Panel</h1>
          {mode === "list" && (
            <button
              onClick={() => {
                setMode("create");
                setEditingId(null);
                setForm(defaultFormState);
              }}
              className="bg-orange-500 text-white px-4 py-2"
            >
              + Add Tour
            </button>
          )}
        </div>

        {mode === "list" &&
          tours.map((t) => (
            <div key={t.id} className="flex justify-between border p-3 mb-2">
              <span>{t.title}</span>
              <div className="flex gap-2">
                <button onClick={() => { setEditingId(t.id); setMode("edit"); }}>
                  Edit
                </button>
                <button
                  onClick={() => deleteTour(t.id)}
                  className="text-red-500"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}

        {mode !== "list" && (
          <div className="space-y-4">
            <h2 className="font-semibold">
              {mode === "create" ? "Create Tour" : "Edit Tour"}
            </h2>

            <input value={form.id} onChange={(e)=>setForm({...form,id:e.target.value})} placeholder="ID" className="w-full border p-2" />
            <input value={form.title} onChange={(e)=>setForm({...form,title:e.target.value})} placeholder="Title" className="w-full border p-2" />
            <textarea value={form.description} onChange={(e)=>setForm({...form,description:e.target.value})} placeholder="Description" className="w-full border p-2" />
            <input value={form.duration} onChange={(e)=>setForm({...form,duration:e.target.value})} placeholder="Duration" className="w-full border p-2" />
            <input value={form.image} onChange={(e)=>setForm({...form,image:e.target.value})} placeholder="Image URL" className="w-full border p-2" />
            <input value={form.category} onChange={(e)=>setForm({...form,category:e.target.value})} placeholder="Category" className="w-full border p-2" />
            <input value={form.locations} onChange={(e)=>setForm({...form,locations:e.target.value})} placeholder="Locations" className="w-full border p-2" />
            <input value={form.highlights} onChange={(e)=>setForm({...form,highlights:e.target.value})} placeholder="Highlights" className="w-full border p-2" />

            <ItineraryEditor itinerary={form.itinerary} onChange={(val)=>setForm({...form,itinerary:val})} />

            <div className="flex gap-2">
              <button onClick={resetForm} className="border px-4 py-2">Cancel</button>
              <button onClick={saveTour} className="bg-green-600 text-white px-4 py-2">Save</button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default AdminPage;