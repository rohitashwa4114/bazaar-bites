import { useState, useEffect, useRef } from "react";

// 1. ALL LUCKNOW AREAS & ADJACENT DISTRICTS
const REGIONS = {
  "Central Lucknow": ["Hazratganj", "Aminabad", "Chowk", "Charbagh", "Lalbagh", "Naka Hindola", "Sadar Bazar"],
  "East Lucknow": ["Gomti Nagar", "Indira Nagar", "Aliganj", "Mahanagar", "Janki Puram", "Chinhat", "Vikas Nagar"],
  "West & South Lucknow": ["Alambagh", "Rajajipuram", "Ashiyana", "Kanpur Road", "Raebareli Road", "Kakori"],
  "Adjacent Regions": ["Barabanki Border", "Unnao Border", "Rae Bareli Border", "Sitapur Road Border"]
};

// Flattened list for easy filtering
const ALL_AREAS = Object.values(REGIONS).flat();

// 2. EXPANDED INITIAL VENDOR DATA FOR LUCKNOW
const INITIAL_VENDORS = [
  { id: 1, name: "Sharma Ji Ki Chai", food: "Chai & Bun Makhan", area: "Hazratganj", status: "Open", time: "07:00 AM", note: "Sitting near the corner shop as usual." },
  { id: 2, name: "Tunday Kababi (Thela Version)", food: "Galouti Kabab", area: "Chowk", status: "Open", time: "01:00 PM", note: "Main market lane." },
  { id: 3, name: "Prakash Ki Kulfi Stall", food: "Kulfi Falooda", area: "Aminabad", status: "Closed", time: "--", note: "Will open around 4 PM." },
  { id: 4, name: "Manish Eating Point Express", food: "Shawarma & Rolls", area: "Gomti Nagar", status: "Open", time: "04:30 PM", note: "Near Patrakar Puram Chauraha." },
  { id: 5, name: "Bajpayee Kachodi Bhandar Stall", food: "Kachodi Chole", area: "Hazratganj", status: "Moved", time: "08:00 AM", note: "Shifted 50 meters ahead near the metro gate today." },
  { id: 6, name: "Chappan Bhog Street Corner", food: "Aloo Tikki & Chaat", area: "Aliganj", status: "Unknown", time: "--", note: "No update via missed call yet today." },
  { id: 7, name: "Jain Chat House", food: "Dahi Vada & Basket Chat", area: "Lalbagh", status: "Open", time: "12:00 PM", note: "Near Novelty Cinema." },
  { id: 8, name: "Barabanki Famous Biryani", food: "Chicken Biryani", area: "Barabanki Border", status: "Open", time: "11:30 AM", note: "Near the highway toll plaza entry." },
  { id: 9, name: "Awadh Swaad Point", food: "Veg Kebabs", area: "Indira Nagar", status: "Closed", time: "--", note: "Closed for family function." },
  { id: 10, name: "Unnao Samosa King", food: "Samosa & Jalebi", area: "Unnao Border", status: "Open", time: "08:00 AM", note: "Just across the border checkpost." }
];

export default function App() {
  const [activeTab, setActiveTab] = useState("discover");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedArea, setSelectedArea] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [vendors, setVendors] = useState(INITIAL_VENDORS);
  const [myShopStatus, setMyShopStatus] = useState("Closed");
  const [shopLocationNote, setShopLocationNote] = useState("Near the main chauraha");
  const [adminStats, setAdminStats] = useState({ total: 10, open: 6, missedCalls: 42, revenue: 1200 });

  // Handle vendor simulation updates
  const handleStatusChange = (newStatus) => {
    setMyShopStatus(newStatus);
    // Update vendor ID 1 (simulating "Sharma Ji" as user's shop)
    setVendors(prev => prev.map(v => v.id === 1 ? { ...v, status: newStatus, time: newStatus === "Open" ? "Now" : "--" } : v));
  };

  const filteredVendors = vendors.filter(v => {
    const matchesSearch = v.name.toLowerCase().includes(searchQuery.toLowerCase()) || v.food.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesArea = selectedArea === "All" || v.area === selectedArea;
    const matchesStatus = statusFilter === "All" || (statusFilter === "Open Now" && v.status === "Open");
    return matchesSearch && matchesArea && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans text-gray-800 pb-16">
      {/* HEADER */}
      <header className="bg-red-600 text-white p-4 shadow-md sticky top-0 z-50">
        <div className="max-w-md mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold tracking-wide">Bazaar Bites 🍛</h1>
            <p className="text-xs text-red-100 font-medium">Lucknow's Live Street Food Tracker</p>
          </div>
          <span className="bg-white text-red-600 text-xs px-2.5 py-1 rounded-full font-bold uppercase tracking-wider shadow-sm animate-pulse">● Live Lucknow</span>
        </div>
      </header>

      {/* MAIN CONTENT CONTAINER */}
      <main className="flex-1 max-w-md w-full mx-auto p-4">
        
        {/* TAB 1: DISCOVER (CUSTOMER VIEW) */}
        {activeTab === "discover" && (
          <div className="space-y-4">
            {/* SEARCH AND FILTERS */}
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 space-y-3">
              <input 
                type="text" 
                placeholder="🔍 Search chaat, kulfi, tea or thela name..." 
                className="w-full p-3 border border-gray-200 rounded-lg text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1 uppercase tracking-wider">Select Area</label>
                  <select 
                    className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-red-500"
                    value={selectedArea}
                    onChange={(e) => setSelectedArea(e.target.value)}
                  >
                    <option value="All">All Lucknow & Adjacent</option>
                    {Object.entries(REGIONS).map(([regionName, areas]) => (
                      <optgroup key={regionName} label={regionName} className="font-bold text-red-600">
                        {areas.map(area => (
                          <option key={area} value={area} className="text-gray-700 font-normal">{area}</option>
                        ))}
                      </optgroup>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1 uppercase tracking-wider">Availability</label>
                  <div className="flex bg-gray-100 p-1 rounded-lg">
                    <button 
                      className={`flex-1 text-xs py-1.5 font-bold rounded-md transition-all ${statusFilter === "All" ? "bg-white text-gray-800 shadow-sm" : "text-gray-500"}`}
                      onClick={() => setStatusFilter("All")}
                    > All </button>
                    <button 
                      className={`flex-1 text-xs py-1.5 font-bold rounded-md transition-all ${statusFilter === "Open Now" ? "bg-green-600 text-white shadow-sm" : "text-gray-500"}`}
                      onClick={() => setStatusFilter("Open Now")}
                    > Open Now </button>
                  </div>
                </div>
              </div>
            </div>

            {/* HAND-DRAWN MOCK REGIONAL MAP DISPLAY */}
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
              <h3 className="text-sm font-bold text-gray-700 mb-2 flex items-center justify-between">
                <span>🗺️ Live Avadh Coverage Map</span>
                <span className="text-xs font-normal text-gray-400">Interactive Zones</span>
              </h3>
              <div className="w-full bg-orange-50 border border-orange-100 rounded-lg p-3 text-center space-y-2">
                <div className="grid grid-cols-3 gap-2 text-xs font-bold text-orange-800">
                  <div className="p-2 bg-white rounded border border-orange-200 shadow-xs">⬅️ Unnao Border</div>
                  <div className="p-2 bg-red-100 rounded border border-red-200 shadow-xs text-red-900">📍 Chowk / Central</div>
                  <div className="p-2 bg-white rounded border border-orange-200 shadow-xs">➡️ Barabanki Border</div>
                </div>
                <div className="text-[11px] text-orange-600 italic">Showing live updates across {ALL_AREAS.length} target zones.</div>
              </div>
            </div>

            {/* LIVE STALLS LIST */}
            <div className="space-y-3">
              <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                <span>🍛 Street Stalls</span>
                <span className="bg-gray-200 text-gray-700 text-xs px-2 py-0.5 rounded-full">{filteredVendors.length} found</span>
              </h2>

              {filteredVendors.length === 0 ? (
                <div className="text-center py-8 bg-white rounded-xl border border-dashed border-gray-300 text-gray-400">
                  No vendors active in this selection right now.
                </div>
              ) : (
                filteredVendors.map((vendor) => (
                  <div key={vendor.id} className="bg-white rounded-xl p-4 shadow-xs border border-gray-100 flex flex-col justify-between hover:shadow-md transition-all">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-xs font-bold bg-red-50 text-red-600 px-2 py-0.5 rounded-sm uppercase tracking-wider">{vendor.area}</span>
                        <h3 className="text-base font-bold text-gray-900 mt-1">{vendor.name}</h3>
                        <p className="text-sm text-gray-600 font-medium">{vendor.food}</p>
                      </div>
                      
                      <span className={`text-xs font-extrabold px-3 py-1 rounded-full border shadow-xs uppercase tracking-wider ${
                        vendor.status === "Open" ? "bg-green-50 text-green-700 border-green-200" :
                        vendor.status === "Closed" ? "bg-red-50 text-red-600 border-red-200" :
                        vendor.status === "Moved" ? "bg-amber-50 text-amber-700 border-amber-200" :
                        "bg-gray-100 text-gray-600 border-gray-300"
                      }`}>
                        {vendor.status === "Open" ? "● Open Now" : vendor.status === "Closed" ? "Closed" : vendor.status === "Moved" ? "⇄ Moved" : "Unknown"}
                      </span>
                    </div>

                    <div className="mt-3 pt-3 border-t border-gray-100 flex justify-between items-center text-xs text-gray-500">
                      <p className="font-medium text-gray-700"><span className="font-bold text-gray-400">Live Status:</span> "{vendor.note}"</p>
                      {vendor.status === "Open" && <span className="text-[11px] bg-gray-100 px-2 py-1 rounded text-gray-600 font-bold">Since {vendor.time}</span>}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* TAB 2: MY SHOP (VENDOR SIMULATION) */}
        {activeTab === "vendor" && (
          <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 space-y-6">
            <div className="border-b border-gray-100 pb-4">
              <h2 className="text-xl font-bold text-gray-900">🏪 Vendor Control Panel (दुकानदार ऐप)</h2>
              <p className="text-sm text-gray-500 mt-1">Simulate what a street stall owner sees on their phone.</p>
            </div>

            {/* STATUS UPDATER CONTROLS */}
            <div className="space-y-3">
              <label className="block text-xs font-extrabold text-gray-500 uppercase tracking-wider">आज दुकान की क्या स्थिति है?</label>
              <div className="grid grid-cols-3 gap-2">
                <button 
                  onClick={() => handleStatusChange("Open")}
                  className={`p-3 rounded-xl border font-bold text-sm flex flex-col items-center justify-center transition-all ${myShopStatus === "Open" ? "bg-green-600 text-white border-green-600 shadow-md scale-102" : "bg-gray-50 text-green-600 border-gray-200 hover:bg-green-50"}`}
                >
                  <span className="text-xl mb-1">🟢</span> चालू है (Open)
                </button>
                <button 
                  onClick={() => handleStatusChange("Closed")}
                  className={`p-3 rounded-xl border font-bold text-sm flex flex-col items-center justify-center transition-all ${myShopStatus === "Closed" ? "bg-red-600 text-white border-red-600 shadow-md scale-102" : "bg-gray-50 text-red-600 border-gray-200 hover:bg-red-50"}`}
                >
                  <span className="text-xl mb-1">🔴</span> बंद है (Closed)
                </button>
                <button 
                  onClick={() => handleStatusChange("Moved")}
                  className={`p-3 rounded-xl border font-bold text-sm flex flex-col items-center justify-center transition-all ${myShopStatus === "Moved" ? "bg-amber-500 text-white border-amber-500 shadow-md scale-102" : "bg-gray-50 text-amber-600 border-gray-200 hover:bg-amber-50"}`}
                >
                  <span className="text-xl mb-1">⇄</span> जगह बदली (Moved)
                </button>
              </div>
            </div>

            {/* LOCATION NOTE INPUT */}
            <div className="space-y-2">
              <label className="block text-xs font-extrabold text-gray-500 uppercase tracking-wider">Location Note / संदेश (Hindi or English)</label>
              <input 
                type="text" 
                className="w-full p-3 border border-gray-200 rounded-lg text-sm bg-gray-50"
                value={shopLocationNote}
                onChange={(e) => setShopLocationNote(e.target.value)}
                placeholder="e.g. आज मेट्रो पिलर २१० के पास हैं"
              />
              <p className="text-[11px] text-gray-400">This helps Lucknow foodies track your cart if you move around.</p>
            </div>

            {/* MISSED CALL FEATURE PROTOTYPE BOX */}
            <div className="p-4 bg-red-50 rounded-xl border border-red-100 space-y-2">
              <h4 className="text-xs font-extrabold text-red-800 uppercase tracking-wider flex items-center gap-1">📲 Quick Update via Free Missed Call</h4>
              <p className="text-xs text-red-700 leading-relaxed">No smartphone? No internet data pack? Vendors just give a missed call from their registered phone number:</p>
              <div className="bg-white px-3 py-2 rounded-lg border border-red-200 text-center font-mono font-bold text-base tracking-wider text-red-600 shadow-xs">
                0522-24-BITES (Mock Line)
              </div>
              <p className="text-[10px] text-red-500 italic text-center">Automatically sets status to "🟢 Open" instantly for free.</p>
            </div>

            {/* SUBSCRIPTION SIMULATION */}
            <div className="pt-2 border-t border-gray-100 flex justify-between items-center text-xs">
              <span className="font-medium text-gray-500">Monthly Plan Subscription:</span>
              <span className="font-bold text-green-600 bg-green-50 px-2 py-1 rounded border border-green-200">₹200 / Month Active</span>
            </div>
          </div>
        )}

        {/* TAB 3: ADMIN PANEL */}
        {activeTab === "admin" && (
          <div className="space-y-4">
            {/* NUMERICAL ANALYTICS */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-xs">
                <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Total Stalls</p>
                <p className="text-2xl font-black text-gray-800 mt-1">{adminStats.total}</p>
              </div>
              <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-xs">
                <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Currently Open</p>
                <p className="text-2xl font-black text-green-600 mt-1">{vendors.filter(v => v.status === "Open").length}</p>
              </div>
              <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-xs">
                <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Missed Call pings</p>
                <p className="text-2xl font-black text-blue-600 mt-1">{adminStats.missedCalls}</p>
              </div>
              <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-xs">
                <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Estimated Revenue</p>
                <p className="text-2xl font-black text-purple-600 mt-1">₹{vendors.length * 200}</p>
              </div>
            </div>

            {/* LOCAL REGIONAL GROWTH PLAN */}
            <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-xs space-y-3">
              <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wide">Lucknow Regional Setup Info</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                The database matrix is configured to group vendors into 4 distinct regions covering **Central, East, West/South Lucknow**, as well as major arterial **highways/border roads** to allow expansion into adjacent setups.
              </p>
              <div className="bg-gray-50 p-2.5 rounded text-[11px] font-mono text-gray-600 border border-gray-200 space-y-1">
                <div>Total target neighborhoods: {ALL_AREAS.length}</div>
                <div>Configured database collections: [vendors, missed_calls, tracking_logs]</div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* BOTTOM NAVIGATION TABS */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-2 shadow-lg z-50">
        <div className="max-w-md mx-auto flex justify-around items-center">
          <button 
            onClick={() => setActiveTab("discover")}
            className={`flex flex-col items-center transition-all ${activeTab === "discover" ? "text-red-600 font-bold scale-105" : "text-gray-400 font-medium"}`}
          >
            <span className="text-xl">🍽️</span>
            <span className="text-xs mt-0.5">Discover</span>
          </button>

          <button 
            onClick={() => setActiveTab("vendor")}
            className={`flex flex-col items-center transition-all ${activeTab === "vendor" ? "text-red-600 font-bold scale-105" : "text-gray-400 font-medium"}`}
          >
            <span className="text-xl">🏪</span>
            <span className="text-xs mt-0.5">My Shop</span>
          </button>

          <button 
            onClick={() => setActiveTab("admin")}
            className={`flex flex-col items-center transition-all ${activeTab === "admin" ? "text-red-600 font-bold scale-105" : "text-gray-400 font-medium"}`}
          >
            <span className="text-xl">⚙️</span>
            <span className="text-xs mt-0.5">Admin</span>
          </button>
        </div>
      </nav>
    </div>
  );
}