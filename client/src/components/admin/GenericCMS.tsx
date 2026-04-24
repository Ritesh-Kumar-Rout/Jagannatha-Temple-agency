/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, X, Image as ImageIcon } from 'lucide-react';
import { toast } from 'sonner';

interface Field {
  name: string;
  label: string;
  type: 'text' | 'textarea' | 'image' | 'date' | 'select' | 'array';
  options?: string[]; // for select
}

interface GenericCMSProps {
  title: string;
  endpoint: string; // e.g., 'rituals'
  fields: Field[];
}

const GenericCMS: React.FC<GenericCMSProps> = ({ title, endpoint, fields }) => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any | null>(null);
  
  // Form state
  const [formData, setFormData] = useState<any>({});
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    fetchData();
  }, [endpoint]);

  const fetchData = async () => {
    try {
      const res = await fetch(`/api/cms/public/${endpoint}`, {
        credentials: 'include' // Allow cookies if needed
      });
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      const text = await res.text();
      let json;
      try {
        json = JSON.parse(text);
      } catch (e) {
        console.error("Failed to parse JSON:", text);
        throw new Error("Invalid response from server");
      }
      if (json.success) setData(json.data);
    } catch (e: any) {
      console.error(e);
      toast.error(e.message || 'Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const openModal = (item?: any) => {
    setEditingItem(item || null);
    if (item) {
      setFormData(item);
    } else {
      setFormData({});
    }
    setFile(null);
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const dataToSend = new FormData();
    
    fields.forEach(f => {
      if (f.type !== 'image' && formData[f.name] !== undefined) {
        if (f.type === 'array') {
            dataToSend.append(f.name, JSON.stringify(formData[f.name]));
        } else {
            dataToSend.append(f.name, formData[f.name]);
        }
      }
    });

    if (file) {
      dataToSend.append('image', file);
    }

    try {
      const method = editingItem ? 'PUT' : 'POST';
      const url = editingItem 
        ? `/api/cms/admin/${endpoint}/${editingItem._id}` 
        : `/api/cms/admin/${endpoint}`;
        
      const res = await fetch(url, {
        method,
        body: dataToSend,
        credentials: 'include' // Send cookies (admin_token)
      });
      
      const text = await res.text();
      let json;
      try {
        json = JSON.parse(text);
      } catch (e) {
        console.error("Non-JSON response:", text);
        throw new Error(`Server returned an invalid response (Status: ${res.status})`);
      }

      if (json.success) {
        toast.success(`${title} saved successfully!`);
        setIsModalOpen(false);
        fetchData();
      } else {
        toast.error(json.message || 'Error saving');
      }
    } catch (err: any) {
      console.error("Save error:", err);
      toast.error(err.message || 'Network error');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this item?')) return;
    try {
      const res = await fetch(`/api/cms/admin/${endpoint}/${id}`, { 
        method: 'DELETE',
        credentials: 'include' 
      });
      const text = await res.text();
      let json;
      try { json = JSON.parse(text); } catch (e) { throw new Error('Invalid response'); }
      
      if (json.success) {
        toast.success('Deleted successfully');
        fetchData();
      } else {
        toast.error(json.message || 'Error deleting');
      }
    } catch (err: any) {
      toast.error(err.message || 'Error deleting');
    }
  };

  if (loading) return <div className="text-white p-8">Loading...</div>;

  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 relative">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-bold text-white">{title} Management</h2>
          <p className="text-neutral-400 text-sm">Add, edit, or remove {title.toLowerCase()}</p>
        </div>
        <button onClick={() => openModal()} className="flex items-center gap-2 bg-festival-gold text-neutral-950 px-4 py-2 rounded-xl font-medium hover:bg-festival-gold/90 transition-colors">
          <Plus className="w-4 h-4" />
          Add New
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-neutral-800 text-neutral-400 text-sm">
              <th className="pb-3 font-medium">Image/Icon</th>
              <th className="pb-3 font-medium">Title/Name</th>
              <th className="pb-3 font-medium">Description</th>
              <th className="pb-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map(item => (
              <tr key={item._id} className="border-b border-neutral-800/50 hover:bg-neutral-800/20 transition-colors">
                <td className="py-3">
                  {item.image ? (
                    <img src={item.image.startsWith('http') ? item.image : `/${item.image.startsWith('/') ? item.image.slice(1) : item.image}`} alt="thumb" className="w-12 h-12 rounded-lg object-cover" />
                  ) : (
                    <div className="w-12 h-12 rounded-lg bg-neutral-800 flex items-center justify-center">
                      <ImageIcon className="w-5 h-5 text-neutral-500" />
                    </div>
                  )}
                </td>
                <td className="py-3 text-white font-medium">
                  {item.title || item.name || item.event_name || item.transport_type}
                </td>
                <td className="py-3 text-neutral-400 text-sm truncate max-w-xs">
                  {item.description || item.shortDesc || item.details}
                </td>
                <td className="py-3">
                  <div className="flex items-center justify-end gap-2">
                    <button onClick={() => openModal(item)} className="p-2 text-blue-400 hover:bg-blue-400/10 rounded-lg transition-colors">
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleDelete(item._id)} className="p-2 text-red-400 hover:bg-red-400/10 rounded-lg transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {data.length === 0 && (
              <tr>
                <td colSpan={4} className="py-8 text-center text-neutral-500">No data found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl w-full max-w-2xl relative z-10 max-h-[90vh] flex flex-col shadow-2xl">
            <div className="flex justify-between items-center p-6 border-b border-neutral-800">
              <h3 className="text-xl font-bold text-white">{editingItem ? 'Edit' : 'Add'} {title}</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-neutral-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 overflow-y-auto flex-1 custom-scrollbar">
              <form id="cms-form" onSubmit={handleSave} className="space-y-4">
                {fields.map(field => (
                  <div key={field.name} className="space-y-1">
                    <label className="text-sm font-medium text-neutral-300">{field.label}</label>
                    {field.type === 'text' && (
                      <input
                        type="text"
                        value={formData[field.name] || ''}
                        onChange={e => setFormData({ ...formData, [field.name]: e.target.value })}
                        className="w-full px-4 py-2 bg-neutral-950 border border-neutral-800 rounded-xl text-white focus:border-festival-gold focus:ring-1 focus:ring-festival-gold outline-none"
                        required
                      />
                    )}
                    {field.type === 'textarea' && (
                      <textarea
                        value={formData[field.name] || ''}
                        onChange={e => setFormData({ ...formData, [field.name]: e.target.value })}
                        className="w-full px-4 py-2 bg-neutral-950 border border-neutral-800 rounded-xl text-white focus:border-festival-gold focus:ring-1 focus:ring-festival-gold outline-none min-h-[100px]"
                        required
                      />
                    )}
                    {field.type === 'date' && (
                      <input
                        type="date"
                        value={formData[field.name] ? new Date(formData[field.name]).toISOString().split('T')[0] : ''}
                        onChange={e => setFormData({ ...formData, [field.name]: e.target.value })}
                        className="w-full px-4 py-2 bg-neutral-950 border border-neutral-800 rounded-xl text-white focus:border-festival-gold focus:ring-1 focus:ring-festival-gold outline-none"
                        required
                      />
                    )}
                    {field.type === 'select' && field.options && (
                      <select
                        value={formData[field.name] || ''}
                        onChange={e => setFormData({ ...formData, [field.name]: e.target.value })}
                        className="w-full px-4 py-2 bg-neutral-950 border border-neutral-800 rounded-xl text-white focus:border-festival-gold focus:ring-1 focus:ring-festival-gold outline-none"
                        required
                      >
                        <option value="">Select...</option>
                        {field.options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                      </select>
                    )}
                    {field.type === 'image' && (
                      <div>
                        {formData[field.name] && !file && (
                          <img src={formData[field.name].startsWith('http') ? formData[field.name] : `/${formData[field.name].startsWith('/') ? formData[field.name].slice(1) : formData[field.name]}`} alt="current" className="h-20 mb-2 rounded" />
                        )}
                        <input
                          type="file"
                          accept="image/*"
                          onChange={e => setFile(e.target.files ? e.target.files[0] : null)}
                          className="w-full text-sm text-neutral-400 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-festival-gold/10 file:text-festival-gold hover:file:bg-festival-gold/20"
                        />
                      </div>
                    )}
                  </div>
                ))}
              </form>
            </div>
            <div className="p-6 border-t border-neutral-800 flex justify-end">
              <button form="cms-form" type="submit" className="bg-festival-gold text-neutral-950 px-6 py-2 rounded-xl font-medium hover:bg-festival-gold/90 transition-colors">
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GenericCMS;
