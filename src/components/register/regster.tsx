'use client';

import React, { useState, useEffect } from 'react';

// --- TYPES ---
type PersonType = 'student' | 'staff';

interface RegistrationEntry {
  id: string;
  type: PersonType;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  department: string;
  position: string;
  studentId?: string;
  course?: string;
  year?: string;
  staffId?: string;
  role?: string;
  dateRegistered: string;
  status: 'active' | 'pending' | 'inactive';
}

export default function Register() {
  // --- STATE ---
  const [entries, setEntries] = useState<RegistrationEntry[]>(() => {
    if (typeof window === 'undefined') return [];
    try {
      const saved = localStorage.getItem('registrationEntries');
      return saved ? (JSON.parse(saved) as RegistrationEntry[]) : [];
    } catch {
      return [];
    }
  });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'student' | 'staff'>('all');
  const [selectedType, setSelectedType] = useState<PersonType>('student');

  const [formData, setFormData] = useState({
    type: 'student' as PersonType,
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    department: '',
    position: '',
    studentId: '',
    course: '',
    year: '',
    staffId: '',
    role: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // --- EFFECTS ---
  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem('registrationEntries', JSON.stringify(entries));
    } catch {
      // ignore storage errors (e.g., quota exceeded or private mode)
    }
  }, [entries]);

  // --- LOGIC ---
  const getStats = () => ({
    total: entries.length,
    students: entries.filter(e => e.type === 'student').length,
    staff: entries.filter(e => e.type === 'staff').length,
    active: entries.filter(e => e.status === 'active').length,
    pending: entries.filter(e => e.status === 'pending').length
  });

  const stats = getStats();

  const filteredEntries = entries.filter(entry => {
    const matchesType = filterType === 'all' || entry.type === filterType;
    const matchesSearch = searchTerm === '' || 
      entry.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.email.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesType && matchesSearch;
  });

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.firstName) newErrors.firstName = 'Required';
    if (!formData.lastName) newErrors.lastName = 'Required';
    if (!formData.email.includes('@')) newErrors.email = 'Invalid email';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    if (editingId) {
      setEntries(entries.map(ent => ent.id === editingId ? { ...ent, ...formData } : ent));
      setEditingId(null);
    } else {
      const newEntry: RegistrationEntry = {
        ...formData,
        id: crypto.randomUUID(),
        dateRegistered: new Date().toISOString(),
        status: 'pending',
      };
      setEntries([...entries, newEntry]);
    }
    resetForm();
  };

  const resetForm = () => {
    setFormData({ type: 'student', firstName: '', lastName: '', email: '', phone: '', department: '', position: '', studentId: '', course: '', year: '', staffId: '', role: '' });
  };

  const handleDelete = (id: string) => setEntries(entries.filter(e => e.id !== id));

  // --- RENDER ---

  function handleTypeChange(type: PersonType): void {
    setSelectedType(type);
    setFormData((prev) => ({ ...prev, type }));
  }

  function handleCancelEdit(_event: React.MouseEvent<HTMLButtonElement>): void {
    setEditingId(null);
    resetForm();
  }

  function getInitials(firstName: string, lastName: string): string {
    const firstInitial = firstName.charAt(0).toUpperCase();
    const lastInitial = lastName.charAt(0).toUpperCase();
    return `${firstInitial}${lastInitial}`;
  }

  function getBadge(status: string): string {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-700';
      case 'pending':
        return 'bg-yellow-100 text-yellow-700';
      case 'inactive':
        return 'bg-gray-100 text-gray-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  }

  function handleEdit(id: string): void {
    const entry = entries.find((e) => e.id === id);
    if (!entry) return;
    setIsLoading(true);
    setFormData({
      type: entry.type,
      firstName: entry.firstName,
      lastName: entry.lastName,
      email: entry.email,
      phone: entry.phone,
      department: entry.department,
      position: entry.position,
      studentId: entry.studentId ?? '',
      course: entry.course ?? '',
      year: entry.year ?? '',
      staffId: entry.staffId ?? '',
      role: entry.role ?? '',
    });
    setSelectedType(entry.type);
    setEditingId(id);
    setIsLoading(false);
  }

  return (
    <div className="min-h-screen bg-[#E8F5E9]">
      <header className="bg-[#1B5E20] sticky top-0 z-50 shadow-lg">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-[#4CAF50] rounded-lg flex items-center justify-center text-white font-bold text-sm">
                SS
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">Student & Staff Registry</h1>
                <p className="text-xs text-[#A5D6A7]">Information Management System</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm text-[#A5D6A7]">Total</span>
              <span className="bg-[#4CAF50] text-white text-xs font-medium px-3 py-1 rounded-full">
                {stats.total}
              </span>
            </div>
          </div>
        </div>
      </header>
      
      {/* STATS BAR */}
      <div className="bg-white border-b border-[#C8E6C9] shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-3">
          <div className="flex items-center gap-6 text-sm flex-wrap">
            <div className="flex items-center gap-2">
              <span className="text-[#2E7D32] font-medium">📊 Overview:</span>
            </div>
            <div className="flex items-center gap-4 flex-wrap">
              <span className="text-[#1B5E20]">🎓 Students: <strong>{stats.students}</strong></span>
              <span className="text-[#1B5E20]">👨‍🏫 Staff: <strong>{stats.staff}</strong></span>
              <span className="text-green-600">✅ Active: <strong>{stats.active}</strong></span>
              <span className="text-yellow-600">⏳ Pending: <strong>{stats.pending}</strong></span>
            </div>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <main className="max-w-6xl mx-auto px-6 py-8 space-y-8">
        
        {/* REGISTRATION FORM */}
        <section id="registration-form">
          <div className="bg-white rounded-xl shadow-md border border-[#C8E6C9] p-6">
            <div className="mb-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-[#1B5E20]">
                    {editingId ? 'Edit Entry' : 'Register New Entry'}
                  </h2>
                  <p className="text-sm text-[#2E7D32]">
                    {editingId ? 'Update the record details.' : 'Add a new student or staff member to the system.'}
                  </p>
                </div>
                <div className="flex gap-2 bg-[#E8F5E9] p-1 rounded-lg">
                  <button
                    type="button"
                    onClick={() => handleTypeChange('student')}
                    className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${
                      selectedType === 'student'
                        ? 'bg-[#1B5E20] text-white shadow-md'
                        : 'text-[#2E7D32] hover:bg-[#C8E6C9]'
                    }`}
                    disabled={isLoading}
                  >
                    🎓 Student
                  </button>
                  <button
                    type="button"
                    onClick={() => handleTypeChange('staff')}
                    className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${
                      selectedType === 'staff'
                        ? 'bg-[#1B5E20] text-white shadow-md'
                        : 'text-[#2E7D32] hover:bg-[#C8E6C9]'
                    }`}
                    disabled={isLoading}
                  >
                    👨‍🏫 Staff
                  </button>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-[#2E7D32] uppercase tracking-wide">First Name</label>
                  <input
                    type="text"
                    placeholder="e.g. John"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="w-full bg-white border border-[#C8E6C9] rounded-lg px-4 py-2.5 text-[#1A1C1E] placeholder:text-[#94A3B8] focus:border-[#2E7D32] focus:ring-2 focus:ring-[#2E7D32]/10 outline-none transition-all"
                    disabled={isLoading}
                  />
                  {errors.firstName && <p className="text-sm text-red-500">{errors.firstName}</p>}
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-[#2E7D32] uppercase tracking-wide">Last Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Doe"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className="w-full bg-white border border-[#C8E6C9] rounded-lg px-4 py-2.5 text-[#1A1C1E] placeholder:text-[#94A3B8] focus:border-[#2E7D32] focus:ring-2 focus:ring-[#2E7D32]/10 outline-none transition-all"
                    disabled={isLoading}
                  />
                  {errors.lastName && <p className="text-sm text-red-500">{errors.lastName}</p>}
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-[#2E7D32] uppercase tracking-wide">Email Address</label>
                  <input
                    type="email"
                    placeholder="john.doe@institution.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-white border border-[#C8E6C9] rounded-lg px-4 py-2.5 text-[#1A1C1E] placeholder:text-[#94A3B8] focus:border-[#2E7D32] focus:ring-2 focus:ring-[#2E7D32]/10 outline-none transition-all"
                    disabled={isLoading}
                  />
                  {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-[#2E7D32] uppercase tracking-wide">Phone Number</label>
                  <input
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-white border border-[#C8E6C9] rounded-lg px-4 py-2.5 text-[#1A1C1E] placeholder:text-[#94A3B8] focus:border-[#2E7D32] focus:ring-2 focus:ring-[#2E7D32]/10 outline-none transition-all"
                    disabled={isLoading}
                  />
                  {errors.phone && <p className="text-sm text-red-500">{errors.phone}</p>}
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-[#2E7D32] uppercase tracking-wide">Department</label>
                  <select
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    className="w-full bg-white border border-[#C8E6C9] rounded-lg px-4 py-2.5 text-[#1A1C1E] focus:border-[#2E7D32] focus:ring-2 focus:ring-[#2E7D32]/10 outline-none transition-all appearance-none cursor-pointer"
                    disabled={isLoading}
                  >
                    <option value="">Select Department</option>
                    <option value="Computer Science">Computer Science</option>
                    <option value="Engineering">Engineering</option>
                    <option value="Business">Business</option>
                    <option value="Medicine">Medicine</option>
                    <option value="Arts">Arts</option>
                    <option value="Education">Education</option>
                    <option value="Science">Science</option>
                    <option value="Administration">Administration</option>
                  </select>
                  {errors.department && <p className="text-sm text-red-500">{errors.department}</p>}
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-[#2E7D32] uppercase tracking-wide">
                    {selectedType === 'student' ? 'Position (Optional)' : 'Job Title'}
                  </label>
                  <input
                    type="text"
                    placeholder={selectedType === 'student' ? 'e.g. Class Representative' : 'e.g. Senior Lecturer'}
                    value={formData.position}
                    onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                    className="w-full bg-white border border-[#C8E6C9] rounded-lg px-4 py-2.5 text-[#1A1C1E] placeholder:text-[#94A3B8] focus:border-[#2E7D32] focus:ring-2 focus:ring-[#2E7D32]/10 outline-none transition-all"
                    disabled={isLoading}
                  />
                </div>

                {/* Student Fields */}
                {selectedType === 'student' && (
                  <>
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-[#2E7D32] uppercase tracking-wide">Student ID *</label>
                      <input
                        type="text"
                        placeholder="e.g. STU-2024-001"
                        value={formData.studentId}
                        onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
                        className="w-full bg-white border border-[#C8E6C9] rounded-lg px-4 py-2.5 text-[#1A1C1E] placeholder:text-[#94A3B8] focus:border-[#2E7D32] focus:ring-2 focus:ring-[#2E7D32]/10 outline-none transition-all"
                        disabled={isLoading}
                      />
                      {errors.studentId && <p className="text-sm text-red-500">{errors.studentId}</p>}
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-[#2E7D32] uppercase tracking-wide">Course *</label>
                      <select
                        value={formData.course}
                        onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                        className="w-full bg-white border border-[#C8E6C9] rounded-lg px-4 py-2.5 text-[#1A1C1E] focus:border-[#2E7D32] focus:ring-2 focus:ring-[#2E7D32]/10 outline-none transition-all appearance-none cursor-pointer"
                        disabled={isLoading}
                      >
                        <option value="">Select Course</option>
                        <option value="Computer Science">Computer Science</option>
                        <option value="Software Engineering">Software Engineering</option>
                        <option value="Business Administration">Business Administration</option>
                        <option value="Medicine">Medicine</option>
                        <option value="Mechanical Engineering">Mechanical Engineering</option>
                        <option value="Electrical Engineering">Electrical Engineering</option>
                        <option value="Law">Law</option>
                        <option value="Education">Education</option>
                      </select>
                      {errors.course && <p className="text-sm text-red-500">{errors.course}</p>}
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-[#2E7D32] uppercase tracking-wide">Year of Study *</label>
                      <select
                        value={formData.year}
                        onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                        className="w-full bg-white border border-[#C8E6C9] rounded-lg px-4 py-2.5 text-[#1A1C1E] focus:border-[#2E7D32] focus:ring-2 focus:ring-[#2E7D32]/10 outline-none transition-all appearance-none cursor-pointer"
                        disabled={isLoading}
                      >
                        <option value="">Select Year</option>
                        <option value="Year 1">Year 1</option>
                        <option value="Year 2">Year 2</option>
                        <option value="Year 3">Year 3</option>
                        <option value="Year 4">Year 4</option>
                        <option value="Postgraduate">Postgraduate</option>
                      </select>
                      {errors.year && <p className="text-sm text-red-500">{errors.year}</p>}
                    </div>
                  </>
                )}

                {/* Staff Fields */}
                {selectedType === 'staff' && (
                  <>
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-[#2E7D32] uppercase tracking-wide">Staff ID *</label>
                      <input
                        type="text"
                        placeholder="e.g. STF-2024-001"
                        value={formData.staffId}
                        onChange={(e) => setFormData({ ...formData, staffId: e.target.value })}
                        className="w-full bg-white border border-[#C8E6C9] rounded-lg px-4 py-2.5 text-[#1A1C1E] placeholder:text-[#94A3B8] focus:border-[#2E7D32] focus:ring-2 focus:ring-[#2E7D32]/10 outline-none transition-all"
                        disabled={isLoading}
                      />
                      {errors.staffId && <p className="text-sm text-red-500">{errors.staffId}</p>}
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-[#2E7D32] uppercase tracking-wide">Role *</label>
                      <select
                        value={formData.role}
                        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                        className="w-full bg-white border border-[#C8E6C9] rounded-lg px-4 py-2.5 text-[#1A1C1E] focus:border-[#2E7D32] focus:ring-2 focus:ring-[#2E7D32]/10 outline-none transition-all appearance-none cursor-pointer"
                        disabled={isLoading}
                      >
                        <option value="">Select Role</option>
                        <option value="Lecturer">Lecturer</option>
                        <option value="Senior Lecturer">Senior Lecturer</option>
                        <option value="Professor">Professor</option>
                        <option value="Administrator">Administrator</option>
                        <option value="Manager">Manager</option>
                        <option value="Technician">Technician</option>
                        <option value="Researcher">Researcher</option>
                        <option value="Support Staff">Support Staff</option>
                      </select>
                      {errors.role && <p className="text-sm text-red-500">{errors.role}</p>}
                    </div>
                  </>
                )}
              </div>

              <div className="flex flex-wrap gap-3 pt-2">
                <button
                  type="submit"
                  className="bg-[#1B5E20] hover:bg-[#2E7D32] text-white px-8 py-2.5 rounded-lg font-medium text-sm transition-all hover:shadow-lg hover:shadow-[#1B5E20]/25 disabled:opacity-60 disabled:cursor-not-allowed"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>⏳ {editingId ? 'Updating...' : 'Submitting...'}</>
                  ) : (
                    <>{editingId ? 'Update Entry' : `Register ${selectedType === 'student' ? 'Student' : 'Staff'}`}</>
                  )}
                </button>
                
                {editingId && (
                  <button
                    type="button"
                    onClick={handleCancelEdit}
                    className="bg-gray-100 hover:bg-gray-200 text-[#1A1C1E] px-6 py-2.5 rounded-lg font-medium text-sm transition-all"
                    disabled={isLoading}
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>
        </section>

        {/* ENTRIES LIST */}
        <section>
          <div className="bg-white rounded-xl shadow-md border border-[#C8E6C9] p-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="text-lg font-semibold text-[#1B5E20]">Registered Entries</h2>
                <p className="text-sm text-[#2E7D32]">{filteredEntries.length} records found</p>
              </div>
              
              <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
                <div className="flex gap-1 bg-[#E8F5E9] p-1 rounded-lg">
                  <button
                    onClick={() => setFilterType('all')}
                    className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                      filterType === 'all'
                        ? 'bg-[#1B5E20] text-white'
                        : 'text-[#2E7D32] hover:bg-[#C8E6C9]'
                    }`}
                  >
                    All
                  </button>
                  <button
                    onClick={() => setFilterType('student')}
                    className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                      filterType === 'student'
                        ? 'bg-[#1B5E20] text-white'
                        : 'text-[#2E7D32] hover:bg-[#C8E6C9]'
                    }`}
                  >
                    🎓 Students
                  </button>
                  <button
                    onClick={() => setFilterType('staff')}
                    className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                      filterType === 'staff'
                        ? 'bg-[#1B5E20] text-white'
                        : 'text-[#2E7D32] hover:bg-[#C8E6C9]'
                    }`}
                  >
                    👨‍🏫 Staff
                  </button>
                </div>

                <div className="relative w-full sm:w-48">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8] text-sm">🔍</span>
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-white border border-[#C8E6C9] rounded-lg py-2 pl-9 pr-3 text-sm text-[#1A1C1E] placeholder:text-[#94A3B8] focus:border-[#2E7D32] focus:ring-2 focus:ring-[#2E7D32]/10 outline-none transition-all"
                    disabled={isLoading}
                  />
                </div>
              </div>
            </div>

            {entries.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-5xl mb-4">📋</div>
                <h3 className="text-lg font-semibold text-[#1B5E20]">No Entries Yet</h3>
                <p className="text-sm text-[#2E7D32]">Start by registering your first student or staff member.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredEntries.map((entry) => (
                  <div key={entry.id} className="flex items-center justify-between p-4 border border-[#C8E6C9] rounded-lg hover:bg-[#F1F8E9] transition-all">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-[#1B5E20] flex items-center justify-center text-white font-bold text-sm relative">
                        {getInitials(entry.firstName, entry.lastName)}
                        <span className="absolute -top-1 -right-1 text-xs">
                          {entry.type === 'student' ? '🎓' : '👨‍🏫'}
                        </span>
                      </div>
                      
                      <div>
                        <div className="flex items-center flex-wrap gap-2">
                          <h3 className="font-semibold text-[#1A1C1E]">
                            {entry.firstName} {entry.lastName}
                          </h3>
                          <span className={`text-[10px] font-medium uppercase px-2.5 py-0.5 rounded-full ${getBadge(entry.status)}`}>
                            {entry.status}
                          </span>
                          <span className="text-[10px] font-medium uppercase px-2.5 py-0.5 rounded-full bg-[#E8F5E9] text-[#1B5E20]">
                            {entry.type}
                          </span>
                        </div>
                        <div className="flex items-center flex-wrap gap-3 text-sm">
                          <span className="text-[#2E7D32]">{entry.email}</span>
                          <span className="text-[#94A3B8]">•</span>
                          <span className="text-[#2E7D32]">{entry.department}</span>
                          {entry.type === 'student' && entry.studentId && (
                            <>
                              <span className="text-[#94A3B8]">•</span>
                              <span className="text-[#2E7D32]">ID: {entry.studentId}</span>
                            </>
                          )}
                          {entry.type === 'staff' && entry.staffId && (
                            <>
                              <span className="text-[#94A3B8]">•</span>
                              <span className="text-[#2E7D32]">ID: {entry.staffId}</span>
                            </>
                          )}
                        </div>
                        {entry.type === 'student' && (
                          <div className="flex items-center gap-3 mt-0.5 text-xs text-[#2E7D32]">
                            <span>📚 {entry.course}</span>
                            <span>📅 {entry.year}</span>
                          </div>
                        )}
                        {entry.type === 'staff' && entry.role && (
                          <div className="flex items-center gap-3 mt-0.5 text-xs text-[#2E7D32]">
                            <span>💼 {entry.role}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleEdit(entry.id)}
                        className="p-2 text-[#94A3B8] hover:text-[#2E7D32] hover:bg-[#E8F5E9] rounded-lg transition-all"
                        disabled={isLoading}
                        title="Edit"
                      >
                        ✏️
                      </button>
                      <button
                        onClick={() => handleDelete(entry.id)}
                        className="p-2 text-[#94A3B8] hover:text-[#EF4444] hover:bg-[#FEF2F2] rounded-lg transition-all"
                        disabled={isLoading}
                        title="Delete"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                ))}

                {filteredEntries.length === 0 && searchTerm && (
                  <div className="text-center py-8">
                    <p className="text-[#1A1C1E] font-medium">No results found</p>
                    <p className="text-sm text-[#2E7D32]">Try adjusting your search terms</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}