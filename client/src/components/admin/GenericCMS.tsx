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
  const [preview, setPreview] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchData();
  }, [endpoint]);

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen]);

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
    setPreview(null);
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation for file type
    if (file && !file.type.startsWith('image/')) {
        toast.error("Please upload only image files.");
        return;
    }

    setIsSaving(true);
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
        credentials: 'include'
      });
      
      const text = await res.text();
      let json;
      try {
        json = JSON.parse(text);
      } catch (e) {
        console.error("Non-JSON response:", text);
        throw new Error(`Server error: ${res.status}`);
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
    } finally {
      setIsSaving(false);
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
        <div className="fixed inset-0 z-[100] overflow-y-auto custom-scrollbar overscroll-contain" data-lenis-prevent="true">
          {/* Backdrop */}
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
          
          {/* Modal Container */}
          <div className="flex min-h-full items-center justify-center p-4">
            <div className="bg-neutral-900 border border-neutral-800 rounded-2xl w-full max-w-2xl relative z-10 shadow-2xl my-8">
              <div className="flex justify-between items-center p-6 border-b border-neutral-800 sticky top-0 bg-neutral-900 rounded-t-2xl z-20">
                <h3 className="text-xl font-bold text-white">{editingItem ? 'Edit' : 'Add'} {title}</h3>
                <button onClick={() => setIsModalOpen(false)} className="text-neutral-400 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="p-6">
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
                        <div className="space-y-3">
                          {preview ? (
                            <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-neutral-800 bg-neutral-950">
                              <img src={preview} alt="preview" className="w-full h-full object-cover" />
                              <button 
                                type="button"
                                onClick={() => { setFile(null); setPreview(null); }}
                                className="absolute top-2 right-2 p-1.5 bg-black/60 text-white rounded-full hover:bg-black/80 transition-colors"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                          ) : formData[field.name] && (
                            <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-neutral-800 bg-neutral-950">
                              <img src={formData[field.name].startsWith('http') ? formData[field.name] : `/${formData[field.name].startsWith('/') ? formData[field.name].slice(1) : formData[field.name]}`} alt="current" className="w-full h-full object-cover" />
                            </div>
                          )}
                          <div className="flex items-center justify-center w-full">
                            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-neutral-800 border-dashed rounded-xl cursor-pointer bg-neutral-950/50 hover:bg-neutral-800/30 transition-all">
                              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <ImageIcon className="w-8 h-8 mb-3 text-neutral-500" />
                                <p className="mb-2 text-sm text-neutral-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                <p className="text-xs text-neutral-500">PNG, JPG or WebP (MAX. 5MB)</p>
                              </div>
                              <input
                                type="file"
                                accept="image/*"
                                onChange={e => {
                                  const selectedFile = e.target.files ? e.target.files[0] : null;
                                  if (selectedFile) {
                                    setFile(selectedFile);
                                    setPreview(URL.createObjectURL(selectedFile));
                                  }
                                }}
                                className="hidden"
                              />
                            </label>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </form>
              </div>
              
              <div className="p-6 border-t border-neutral-800 flex justify-end gap-3 sticky bottom-0 bg-neutral-900 rounded-b-2xl z-20">
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-6 py-2 rounded-xl font-medium text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  form="cms-form" 
                  type="submit" 
                  disabled={isSaving}
                  className="flex items-center gap-2 bg-festival-gold text-neutral-950 px-6 py-2 rounded-xl font-medium hover:bg-festival-gold/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSaving ? (
                    <>
                      <div className="w-4 h-4 border-2 border-neutral-950/30 border-t-neutral-950 rounded-full animate-spin"></div>
                      Saving...
                    </>
                  ) : (
                    'Save Changes'
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GenericCMS;
