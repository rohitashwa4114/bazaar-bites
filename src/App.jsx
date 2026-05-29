import { useState } from "react";

const REGIONS = {
  "Central Lucknow": ["Hazratganj", "Aminabad", "Chowk", "Charbagh", "Lalbagh", "Naka Hindola", "Sadar Bazar"],
  "East Lucknow": ["Gomti Nagar", "Indira Nagar", "Aliganj", "Mahanagar", "Janki Puram", "Chinhat", "Vikas Nagar"],
  "West & South Lucknow": ["Alambagh", "Rajajipuram", "Ashiyana", "Kanpur Road", "Raebareli Road", "Kakori"],
  "Adjacent Regions": ["Barabanki Border", "Unnao Border", "Rae Bareli Border", "Sitapur Road Border"]
};

const ALL_AREAS = Object.values(REGIONS).flat();

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

  const handleStatusChange = (newStatus) => {
    setMyShopStatus(newStatus);
    setVendors(prev => prev.map(v => v.id === 1 ? { ...v, status: newStatus, time: newStatus === "Open" ? "Now" : "--" } : v));
  };

  const filteredVendors = vendors.filter(v => {
    const matchesSearch = v.name.toLowerCase().includes(searchQuery.toLowerCase()) || v.food.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesArea = selectedArea === "All" || v.area === selectedArea;
    const matchesStatus = statusFilter === "All" || (statusFilter === "Open Now" && v.status === "Open");
    return matchesSearch && matchesArea && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-[#fcfbfa] flex flex-col font-sans antialiased text-gray-900 pb-24">
      
      {/* BEAUTIFIED STICKY HEADER */}
      <header className="bg-gradient-to-r from-rose-600 via-red-600 to-amber-600 text-white px-4 py-5 shadow-lg sticky top-0 z-50 rounded-b-2xl">
        <div className="max-w-md mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-black tracking-tight flex items-center gap-1.5">
              Bazaar Bites <span className="text-xl">🍛</span>
            </h1>
            <p className="text-xs text-rose-100 font-medium tracking-wide mt-0.5 opacity-90">Lucknow's Live Street Food Network</p>
          </div>
          <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-ping"></span>
            <span className="text-[11px] font-bold tracking-wider uppercase text-white">Live Avadh</span>
          </div>
        </div>
      </header>

      {/* MAIN CONTAINER */}
      <main className="flex-1 max-w-md w-full mx-auto px-4 mt-4">
        
        {/* TAB 1: DISCOVER */}
        {activeTab === "discover" && (
          <div className="space-y-5">
            
            {/* SEARCH AND CONTROLS CARD */}
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 space-y-4">
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400 text-base">🔍</span>
                <input 
                  type="text" 
                  placeholder="Search chaat, kulfi, tea or stall..." 
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200/80 rounded-xl text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-white"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">Filter by Area</label>
                <select 
                  className="w-full p-3 bg-gray-50 border border-gray-200/80 rounded-xl text-sm font-semibold text-gray-700 transition-all focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-white"
                  value={selectedArea}
                  onChange={(e) => setSelectedArea(e.target.value)}
                >
                  <option value="All">🌟 All Lucknow & Surrounding Borders</option>
                  {Object.entries(REGIONS).map(([regionName, areas]) => (
                    <optgroup key={regionName} label={regionName} className="font-bold text-rose-600 bg-white">
                      {areas.map(area => (
                        <option key={area} value={area} className="text-gray-700 font-medium">{area}</option>
                      ))}
                    </optgroup>
                  ))}
                </select>
              </div>

              <div className="flex gap-2 pt-1">
                <button 
                  className={`flex-1 py-2.5 rounded-xl font-bold text-xs transition-all tracking-wide border ${statusFilter === "All" ? "bg-gray-900 text-white border-gray-900 shadow-sm" : "bg-white text-gray-500 border-gray-200 hover:bg-gray-50"}`}
                  onClick={() => setStatusFilter("All")}
                >Show All Stalls</button>
                <button 
                  className={`flex-1 py-2.5 rounded-xl font-bold text-xs transition-all tracking-wide border flex items-center justify-center gap-1 ${statusFilter === "Open Now" ? "bg-emerald-600 text-white border-emerald-600 shadow-sm" : "bg-white text-emerald-600 border-gray-200 hover:bg-emerald-50"}`}
                  onClick={() => setStatusFilter("Open Now")}
                >🟢 Only Open Now</button>
              </div>
            </div>

            {/* VISUAL MINI MAP COMPONENT */}
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 space-y-3">
              <div className="flex justify-between items-center">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest pl-1">Live Hub Coverage Map</h3>
                <span className="text-[10px] bg-amber-50 text-amber-700 px-2 py-0.5 rounded font-bold border border-amber-100">Zone Map Active</span>
              </div>
              <div className="bg-gradient-to-b from-orange-50/60 to-amber-50/30 border border-orange-100/70 rounded-xl p-4 space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex-1 p-2 bg-white rounded-lg border border-orange-100 shadow-xs text-center">
                    <p className="text-[10px] text-gray-400 font-bold uppercase">West</p>
                    <p className="text-xs font-extrabold text-orange-800 mt-0.5">Unnao Line</p>
                  </div>
                  <div className="w-12 h-0.5 bg-dashed border-t-2 border-orange-200"></div>
                  <div className="flex-1 p-2 bg-rose-50 rounded-lg border border-rose-100 shadow-xs text-center ring-2 ring-rose-500/20">
                    <p className="text-[10px] text-rose-500 font-bold uppercase">Heart</p>
                    <p className="text-xs font-extrabold text-rose-900 mt-0.5">Hazratganj/Chowk</p>
                  </div>
                  <div className="w-12 h-0.5 bg-dashed border-t-2 border-orange-200"></div>
                  <div className="flex-1 p-2 bg-white rounded-lg border border-orange-100 shadow-xs text-center">
                    <p className="text-[10px] text-gray-400 font-bold uppercase">East</p>
                    <p className="text-xs font-extrabold text-orange-800 mt-0.5">Barabanki Line</p>
                  </div>
                </div>
                <div className="text-center text-[11px] text-gray-500 font-medium">
                  Real-time status tracking spanning across <span className="font-bold text-red-600">{ALL_AREAS.length} micro-locations</span>.
                </div>
              </div>
            </div>

            {/* STALLS LIST WITH PREMIUM CARDS */}
            <div className="space-y-3">
              <div className="flex justify-between items-center pl-1">
                <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest">Active Street Stalls</h2>
                <span className="text-xs bg-gray-100 font-bold text-gray-600 px-2.5 py-0.5 rounded-full">{filteredVendors.length} Listings</span>
              </div>

              {filteredVendors.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-gray-200 text-gray-400 space-y-1">
                  <p className="text-2xl">🍽️</p>
                  <p className="text-sm font-medium">No street vendors matching your filters are up right now.</p>
                </div>
              ) : (
                filteredVendors.map((vendor) => (
                  <div key={vendor.id} className="bg-white rounded-2xl p-4 shadow-xs border border-gray-100 flex flex-col justify-between hover:shadow-md hover:border-gray-200 transition-all duration-200">
                    <div className="flex justify-between items-start gap-3">
                      <div>
                        <span className="text-[10px] font-extrabold bg-rose-50 text-rose-600 px-2 py-0.5 rounded-md uppercase tracking-wider border border-rose-100/60">{vendor.area}</span>
                        <h3 className="text-base font-bold text-gray-900 mt-1.5 leading-tight tracking-tight">{vendor.name}</h3>
                        <p className="text-xs text-gray-500 font-medium mt-0.5">{vendor.food}</p>
                      </div>
                      
                      <span className={`text-[10px] font-black px-2.5 py-1 rounded-full border tracking-wider uppercase shadow-xs shrink-0 ${
                        vendor.status === "Open" ? "bg-emerald-50 text-emerald-700 border-emerald-200" :
                        vendor.status === "Closed" ? "bg-rose-50 text-rose-600 border-rose-200" :
                        vendor.status === "Moved" ? "bg-amber-50 text-amber-700 border-amber-200" :
                        "bg-gray-50 text-gray-500 border-gray-200"
                      }`}>
                        {vendor.status === "Open" ? "● Open" : vendor.status === "Closed" ? "Closed" : vendor.status === "Moved" ? "⇄ Moved" : "Unknown"}
                      </span>
                    </div>

                    <div className="mt-3.5 pt-3 border-t border-gray-100 flex justify-between items-center text-xs">
                      <p className="text-gray-600 font-medium pr-2 line-clamp-1">
                        <span className="font-bold text-gray-400">Live Note:</span> "{vendor.note}"
                      </p>
                      {vendor.status === "Open" && (
                        <span className="text-[10px] bg-gray-50 border border-gray-100 px-2 py-0.5 rounded font-bold text-gray-500 shrink-0">
                          {vendor.time}
                        </span>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* TAB 2: MY SHOP */}
        {activeTab === "vendor" && (
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-6">
            <div className="border-b border-gray-100 pb-4">
              <h2 className="text-lg font-bold text-gray-900 tracking-tight">🏪 Vendor Dashboard</h2>
              <p className="text-xs text-gray-400 font-medium mt-0.5">Simulated mobile experience for the stall owners.</p>
            </div>

            <div className="space-y-2">
              <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest pl-0.5">दुकान की लाइव स्थिति सेट करें</label>
              <div className="grid grid-cols-3 gap-2">
                <button 
                  onClick={() => handleStatusChange("Open")}
                  className={`p-3.5 rounded-xl border font-bold text-xs flex flex-col items-center justify-center transition-all ${myShopStatus === "Open" ? "bg-emerald-600 text-white border-emerald-600 shadow-md shadow-emerald-600/10 scale-[1.02]" : "bg-gray-50 text-emerald-600 border-gray-200 hover:bg-emerald-50/50"}`}
                >
                  <span className="text-lg mb-1">🟢</span> चालू (Open)
                </button>
                <button 
                  onClick={() => handleStatusChange("Closed")}
                  className={`p-3.5 rounded-xl border font-bold text-xs flex flex-col items-center justify-center transition-all ${myShopStatus === "Closed" ? "bg-rose-600 text-white border-rose-600 shadow-md shadow-rose-600/10 scale-[1.02]" : "bg-gray-50 text-rose-600 border-gray-200 hover:bg-rose-50/50"}`}
                >
                  <span className="text-lg mb-1">🔴</span> बंद (Closed)
                </button>
                <button 
                  onClick={() => handleStatusChange("Moved")}
                  className={`p-3.5 rounded-xl border font-bold text-xs flex flex-col items-center justify-center transition-all ${myShopStatus === "Moved" ? "bg-amber-500 text-white border-amber-500 shadow-md shadow-amber-500/10 scale-[1.02]" : "bg-gray-50 text-amber-600 border-gray-200 hover:bg-amber-50/50"}`}
                >
                  <span className="text-lg mb-1">⇄</span> बदली (Moved)
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest pl-0.5">ग्राहकों के लिए संदेश (Location Note)</label>
              <input 
                type="text" 
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-white"
                value={shopLocationNote}
                onChange={(e) => setShopLocationNote(e.target.value)}
                placeholder="उदा. आज कपूरथला चौराहे के पास खड़े हैं"
              />
            </div>

            <div className="p-4 bg-gradient-to-br from-rose-50 to-amber-50 rounded-xl border border-rose-100/70 space-y-2.5">
              <h4 className="text-xs font-bold text-rose-800 uppercase tracking-wider flex items-center gap-1">📞 Free Missed Call Shortcut</h4>
              <p className="text-xs text-rose-700/90 leading-relaxed font-medium">No internet needed. Give a simple missed call from the shop's registered phone number to auto-open instantly:</p>
              <div className="bg-white p-2.5 rounded-xl border border-rose-200/60 text-center font-mono font-bold text-base tracking-wider text-rose-600 shadow-xs">
                0522-24-BITES
              </div>
            </div>

            <div className="pt-3 border-t border-gray-100 flex justify-between items-center text-xs font-semibold">
              <span className="text-gray-400">Monthly Plan Subscription:</span>
              <span className="text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-100">₹200 / Month Active</span>
            </div>
          </div>
        )}

        {/* TAB 3: ADMIN */}
        {activeTab === "admin" && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-xs">
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Total Stalls</p>
                <p className="text-2xl font-black text-gray-900 mt-0.5">10</p>
              </div>
              <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-xs">
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Currently Open</p>
                <p className="text-2xl font-black text-emerald-600 mt-0.5">{vendors.filter(v => v.status === "Open").length}</p>
              </div>
              <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-xs">
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Missed Call Logs</p>
                <p className="text-2xl font-black text-blue-600 mt-0.5">42</p>
              </div>
              <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-xs">
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Expected Revenue</p>
                <p className="text-2xl font-black text-purple-600 mt-0.5">₹{vendors.length * 200}</p>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs space-y-3">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Lucknow Database Mapping</h3>
              <p className="text-xs text-gray-600 leading-relaxed font-medium">
                The layout infrastructure dynamically supports micro-filtering logic for neighborhood-specific queries inside Lucknow and adjacent boundaries.
              </p>
              <div className="bg-gray-50 p-3 rounded-xl text-[11px] font-mono text-gray-500 border border-gray-200/60">
                <div>Regions Active: 4 Core Districts</div>
                <div>Configured Points: {ALL_AREAS.length} Hotspots</div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* MODERNIZED FLOATING NAVIGATION */}
      <nav className="fixed bottom-4 left-4 right-4 bg-white/90 backdrop-blur-md border border-gray-200/60 px-4 py-2.5 rounded-2xl shadow-xl z-50 max-w-md mx-auto">
        <div className="flex justify-around items-center">
          <button 
            onClick={() => setActiveTab("discover")}
            className={`flex flex-col items-center gap-0.5 transition-all duration-200 ${activeTab === "discover" ? "text-red-600 font-bold scale-105" : "text-gray-400 font-medium hover:text-gray-600"}`}
          >
            <span className="text-lg">🍽️</span>
            <span className="text-[10px] tracking-wide">Discover</span>
          </button>

          <button 
            onClick={() => setActiveTab("vendor")}
            className={`flex flex-col items-center gap-0.5 transition-all duration-200 ${activeTab === "vendor" ? "text-red-600 font-bold scale-105" : "text-gray-400 font-medium hover:text-gray-600"}`}
          >
            <span className="text-lg">🏪</span>
            <span className="text-[10px] tracking-wide">My Shop</span>
          </button>

          <button 
            onClick={() => setActiveTab("admin")}
            className={`flex flex-col items-center gap-0.5 transition-all duration-200 ${activeTab === "admin" ? "text-red-600 font-bold scale-105" : "text-gray-400 font-medium hover:text-gray-600"}`}
          >
            <span className="text-lg">⚙️</span>
            <span className="text-[10px] tracking-wide">Admin</span>
          </button>
        </div>
      </nav>
    </div>
  );
}