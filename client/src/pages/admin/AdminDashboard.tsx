import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogOut, LayoutDashboard, Users, UserCircle, Bell, Search, Menu, Save, Calendar, Compass, Coffee, Home, Activity } from "lucide-react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "@/components/Logo";
import GenericCMS from "@/components/admin/GenericCMS";

interface AdminProfile {
  id: string;
  name: string;
  email: string;
  mobile: string;
}

interface DashboardStats {
  totalBookings: number;
  activeUsers: number;
  revenue: string;
  revenueChange: string;
  bookingsChange: string;
  usersChange: string;
}

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [admin, setAdmin] = useState<AdminProfile | null>(null);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [activeTab, setActiveTab] = useState<string>("dashboard");
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  
  // Profile Form State
  const [profileForm, setProfileForm] = useState({ name: "", email: "", mobile: "" });
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchMe();
    fetchStats();
  }, []);

  const fetchMe = async () => {
    try {
      const response = await fetch("/api/auth/me");
      const data = await response.json();
      if (data.success && data.admin) {
        setAdmin(data.admin);
        setProfileForm({
          name: data.admin.name || "",
          email: data.admin.email || "",
          mobile: data.admin.mobile || "",
        });
      }
    } catch (error) {
      console.error("Error fetching admin details", error);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await fetch("/api/auth/dashboard-stats");
      const data = await response.json();
      if (data.success && data.stats) {
        setStats(data.stats);
      }
    } catch (error) {
      console.error("Error fetching stats", error);
    }
  };

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
      });
      if (response.ok) {
        toast.success("Logged out successfully");
        navigate("/admin");
      }
    } catch (error) {
      toast.error("Failed to logout");
    }
  };

  const handleProfileSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const response = await fetch("/api/auth/me", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profileForm),
      });
      const data = await response.json();
      
      if (response.ok && data.success) {
        toast.success("Profile updated successfully");
        setAdmin(data.admin);
      } else {
        toast.error(data.message || "Failed to update profile");
      }
    } catch (error) {
      toast.error("An error occurred while saving.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="flex h-screen bg-neutral-950 text-white overflow-hidden">
      {/* Sidebar */}
      <motion.aside 
        initial={{ x: -250 }}
        animate={{ x: 0 }}
        className="w-64 bg-neutral-900 border-r border-neutral-800 hidden md:flex flex-col"
      >
        <div className="p-6 border-b border-neutral-800 flex items-center justify-center">
          <Logo size="sm" showText={true} />
        </div>
        
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto custom-scrollbar">
          <button 
            onClick={() => setActiveTab("dashboard")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${activeTab === "dashboard" ? "bg-festival-gold/10 text-festival-gold" : "text-neutral-400 hover:text-white hover:bg-neutral-800"}`}
          >
            <LayoutDashboard className="w-5 h-5" />
            Dashboard
          </button>
          
          <div className="pt-4 pb-2">
            <p className="px-4 text-xs font-bold text-neutral-500 uppercase tracking-wider">Content Management</p>
          </div>
          
          {[
            { id: 'rituals', icon: Activity, label: 'Rituals' },
            { id: 'stays', icon: Home, label: 'Accommodations' },
            { id: 'travels', icon: Compass, label: 'Travel Options' },
            { id: 'foods', icon: Coffee, label: 'Food & Prasad' },
            { id: 'attractions', icon: Users, label: 'Attractions' },
            { id: 'events', icon: Calendar, label: 'Calendar Events' }
          ].map(tab => (
            <button 
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${activeTab === tab.id ? "bg-festival-gold/10 text-festival-gold" : "text-neutral-400 hover:text-white hover:bg-neutral-800"}`}
            >
              <tab.icon className="w-5 h-5" />
              {tab.label}
            </button>
          ))}

          <div className="pt-4 pb-2">
            <p className="px-4 text-xs font-bold text-neutral-500 uppercase tracking-wider">System</p>
          </div>
          <button 
            onClick={() => setActiveTab("profile")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${activeTab === "profile" ? "bg-festival-gold/10 text-festival-gold" : "text-neutral-400 hover:text-white hover:bg-neutral-800"}`}
          >
            <UserCircle className="w-5 h-5" />
            Profile Settings
          </button>
        </nav>

        <div className="p-4 border-t border-neutral-800">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 w-full text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-xl font-medium transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        {/* Header */}
        <header className="h-16 bg-neutral-900/50 backdrop-blur-md border-b border-neutral-800 flex items-center justify-between px-6 sticky top-0 z-20">
          <div className="flex items-center gap-4">
            <button className="md:hidden text-neutral-400 hover:text-white transition-colors">
              <Menu className="w-6 h-6" />
            </button>
            <div className="relative hidden sm:block">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
              <input 
                type="text" 
                placeholder="Search..." 
                className="pl-9 pr-4 py-1.5 bg-neutral-950 border border-neutral-800 rounded-full text-sm focus:outline-none focus:border-festival-gold focus:ring-1 focus:ring-festival-gold w-64 transition-all"
              />
            </div>
          </div>

          <div className="flex items-center gap-4 relative">
            <button className="relative p-2 text-neutral-400 hover:text-white transition-colors rounded-full hover:bg-neutral-800">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-festival-red rounded-full"></span>
            </button>
            
            {/* Profile Dropdown Toggle */}
            <div className="relative">
              <button 
                onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                className="flex items-center gap-3 pl-4 border-l border-neutral-800 focus:outline-none hover:opacity-80 transition-opacity"
              >
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-medium">{admin?.name || "Admin"}</p>
                  <p className="text-xs text-festival-gold">Super Admin</p>
                </div>
                <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-festival-red to-festival-gold flex items-center justify-center text-white font-bold shadow-lg">
                  {admin?.name ? admin.name.charAt(0).toUpperCase() : "A"}
                </div>
              </button>

              {/* Dropdown Menu */}
              <AnimatePresence>
                {isProfileDropdownOpen && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setIsProfileDropdownOpen(false)}></div>
                    <motion.div 
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute right-0 mt-2 w-48 bg-neutral-900 border border-neutral-800 rounded-xl shadow-2xl py-2 z-20"
                    >
                      <button onClick={() => { setActiveTab("profile"); setIsProfileDropdownOpen(false); }} className="w-full text-left px-4 py-2 text-sm text-neutral-300 hover:bg-neutral-800 hover:text-white transition-colors">
                        View Profile
                      </button>
                      <button onClick={() => { setActiveTab("profile"); setIsProfileDropdownOpen(false); }} className="w-full text-left px-4 py-2 text-sm text-neutral-300 hover:bg-neutral-800 hover:text-white transition-colors">
                        Edit Profile
                      </button>
                      <div className="h-px bg-neutral-800 my-2"></div>
                      <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-neutral-800 transition-colors">
                        Logout
                      </button>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          </div>
        </header>

        {/* Main scrollable content */}
        <main className="flex-1 overflow-y-auto p-6 lg:p-8">
          <AnimatePresence mode="wait">
            {activeTab === "dashboard" ? (
              <motion.div 
                key="dashboard"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="max-w-6xl mx-auto space-y-6"
              >
                <div>
                  <h1 className="text-2xl font-bold tracking-tight">Dashboard Overview</h1>
                  <p className="text-neutral-400 text-sm mt-1">Real-time statistics and insights.</p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    { label: "Total Bookings", value: stats?.totalBookings || "...", change: stats?.bookingsChange || "...", color: "from-blue-500/20 to-blue-500/0", textColor: "text-blue-500" },
                    { label: "Active Users", value: stats?.activeUsers || "...", change: stats?.usersChange || "...", color: "from-emerald-500/20 to-emerald-500/0", textColor: "text-emerald-500" },
                    { label: "Revenue", value: stats?.revenue || "...", change: stats?.revenueChange || "...", color: "from-festival-gold/20 to-festival-gold/0", textColor: "text-festival-gold" },
                  ].map((stat, i) => (
                    <div key={i} className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 relative overflow-hidden group hover:border-neutral-700 transition-colors">
                      <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-100 transition-opacity`}></div>
                      <div className="relative z-10">
                        <p className="text-neutral-400 text-sm font-medium">{stat.label}</p>
                        <div className="mt-2 flex items-baseline gap-2">
                          <span className="text-3xl font-bold">{stat.value}</span>
                          <span className={`text-xs font-medium ${stat.textColor}`}>{stat.change}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Content Area */}
                <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 min-h-[300px]">
                  <h3 className="text-lg font-medium mb-4">Content Management System</h3>
                  <div className="text-center mt-10">
                    <div className="w-16 h-16 bg-neutral-800 rounded-full flex items-center justify-center mx-auto mb-4">
                      <LayoutDashboard className="w-8 h-8 text-neutral-500" />
                    </div>
                    <p className="text-neutral-500 text-sm mt-1">Select a module from the sidebar to manage content.</p>
                  </div>
                </div>
              </motion.div>
            ) : activeTab === "profile" ? (
              <motion.div 
                key="profile"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="max-w-3xl mx-auto space-y-6"
              >
                <div>
                  <h1 className="text-2xl font-bold tracking-tight">Profile Settings</h1>
                  <p className="text-neutral-400 text-sm mt-1">Manage your administrative details.</p>
                </div>

                <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-8">
                  <div className="flex items-center gap-6 mb-8 pb-8 border-b border-neutral-800">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-festival-red to-festival-gold flex items-center justify-center text-white text-3xl font-bold shadow-lg">
                      {admin?.name ? admin.name.charAt(0).toUpperCase() : "A"}
                    </div>
                    <div>
                      <h2 className="text-xl font-bold">{admin?.name || "Admin"}</h2>
                      <p className="text-festival-gold text-sm font-medium">Super Administrator</p>
                      <button className="mt-3 text-xs bg-neutral-800 hover:bg-neutral-700 text-white px-4 py-2 rounded-lg transition-colors">
                        Change Picture (Coming Soon)
                      </button>
                    </div>
                  </div>

                  <form onSubmit={handleProfileSave} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-neutral-300">Full Name</label>
                        <input
                          type="text"
                          value={profileForm.name}
                          onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                          className="w-full px-4 py-3 bg-neutral-950/50 border border-neutral-800 rounded-xl text-white focus:border-festival-gold focus:ring-1 focus:ring-festival-gold transition-all"
                          placeholder="Your Name"
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-neutral-300">Email Address</label>
                        <input
                          type="email"
                          value={profileForm.email}
                          onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                          className="w-full px-4 py-3 bg-neutral-950/50 border border-neutral-800 rounded-xl text-white focus:border-festival-gold focus:ring-1 focus:ring-festival-gold transition-all"
                          placeholder="admin@example.com"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium text-neutral-300">Mobile Number</label>
                        <input
                          type="text"
                          value={profileForm.mobile}
                          onChange={(e) => setProfileForm({ ...profileForm, mobile: e.target.value })}
                          className="w-full px-4 py-3 bg-neutral-950/50 border border-neutral-800 rounded-xl text-white focus:border-festival-gold focus:ring-1 focus:ring-festival-gold transition-all"
                          placeholder="9999999999"
                        />
                      </div>
                    </div>

                    <div className="pt-4 flex justify-end">
                      <button
                        type="submit"
                        disabled={isSaving}
                        className="flex items-center gap-2 bg-festival-gold hover:bg-festival-gold/90 text-neutral-950 font-medium py-3 px-6 rounded-xl transition-all active:scale-[0.98] disabled:opacity-70"
                      >
                        {isSaving ? (
                          <div className="w-5 h-5 border-2 border-neutral-950/30 border-t-neutral-950 rounded-full animate-spin"></div>
                        ) : (
                          <>
                            <Save className="w-4 h-4" />
                            Save Changes
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              </motion.div>
            ) : activeTab === "rituals" ? (
              <motion.div key="rituals" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <GenericCMS 
                  title="Rituals" 
                  endpoint="rituals" 
                  fields={[
                    { name: 'title', label: 'Title', type: 'text' },
                    { name: 'shortDesc', label: 'Short Description', type: 'text' },
                    { name: 'timing', label: 'Timing', type: 'text' },
                    { name: 'location', label: 'Location', type: 'text' },
                    { name: 'significance', label: 'Significance', type: 'text' },
                    { name: 'fact', label: 'Interesting Fact', type: 'text' },
                    { name: 'details', label: 'Full Details', type: 'textarea' },
                    { name: 'image', label: 'Cover Image', type: 'image' }
                  ]} 
                />
              </motion.div>
            ) : activeTab === "stays" ? (
              <motion.div key="stays" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <GenericCMS 
                  title="Accommodations" 
                  endpoint="stays" 
                  fields={[
                    { name: 'name', label: 'Hotel/Matha Name', type: 'text' },
                    { name: 'category', label: 'Category', type: 'select', options: ['hotelsNearTemple', 'mathas', 'hotelsNearBeach'] },
                    { name: 'address', label: 'Address', type: 'text' },
                    { name: 'description', label: 'Description', type: 'textarea' },
                    { name: 'bookingLink', label: 'Booking URL', type: 'text' },
                    { name: 'mapLink', label: 'Map Link', type: 'text' },
                    { name: 'image', label: 'Image', type: 'image' }
                  ]} 
                />
              </motion.div>
            ) : activeTab === "travels" ? (
              <motion.div key="travels" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <GenericCMS 
                  title="Travel Options" 
                  endpoint="travels" 
                  fields={[
                    { name: 'title', label: 'Title', type: 'text' },
                    { name: 'transport_type', label: 'Type', type: 'select', options: ['bus', 'train', 'flight', 'local'] },
                    { name: 'description', label: 'Description', type: 'textarea' },
                    { name: 'timing', label: 'Timing', type: 'text' },
                    { name: 'price', label: 'Price Details', type: 'text' },
                    { name: 'image', label: 'Image', type: 'image' }
                  ]} 
                />
              </motion.div>
            ) : activeTab === "foods" ? (
              <motion.div key="foods" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <GenericCMS 
                  title="Food & Prasad" 
                  endpoint="foods" 
                  fields={[
                    { name: 'name', label: 'Food Name', type: 'text' },
                    { name: 'category', label: 'Category', type: 'select', options: ['Divine Mahaprasad', "Puri's Famous Sweets", 'Authentic Odia Savory'] },
                    { name: 'description', label: 'Description', type: 'textarea' },
                    { name: 'price', label: 'Price', type: 'text' },
                    { name: 'orderLink', label: 'Order Link', type: 'text' },
                    { name: 'image', label: 'Image', type: 'image' }
                  ]} 
                />
              </motion.div>
            ) : activeTab === "attractions" ? (
              <motion.div key="attractions" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <GenericCMS 
                  title="Attractions" 
                  endpoint="attractions" 
                  fields={[
                    { name: 'title', label: 'Attraction Name', type: 'text' },
                    { name: 'description', label: 'Short Description', type: 'text' },
                    { name: 'details', label: 'Full Details', type: 'textarea' },
                    { name: 'history', label: 'History', type: 'textarea' },
                    { name: 'distance', label: 'Distance', type: 'text' },
                    { name: 'visitingHours', label: 'Visiting Hours', type: 'text' },
                    { name: 'mapLink', label: 'Map Link', type: 'text' },
                    { name: 'image', label: 'Image', type: 'image' }
                  ]} 
                />
              </motion.div>
            ) : activeTab === "events" ? (
              <motion.div key="events" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <GenericCMS 
                  title="Calendar Events" 
                  endpoint="events" 
                  fields={[
                    { name: 'title', label: 'Event Title', type: 'text' },
                    { name: 'date', label: 'Event Date', type: 'date' },
                    { name: 'description', label: 'Description', type: 'textarea' },
                    { name: 'type', label: 'Event Type', type: 'select', options: ['festival', 'ritual', 'public'] }
                  ]} 
                />
              </motion.div>
            ) : null}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
