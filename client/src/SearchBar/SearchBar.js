import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { HiSearch } from "react-icons/hi";
const data = require("./MOCK_DATA.json");

const SearchBar = () => {
  const [value, setValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (searchTerm) => {
    const term = searchTerm || value;
    if (!term.trim()) return;
    setIsOpen(false);
    navigate(`/Service?${encodeURIComponent(term.trim())}`);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearch();
    }
  };

  const filteredItems = data.filter((item) => {
    const searchTerm = value.toLowerCase().trim();
    const fullName = (item.full_name || "").toLowerCase();
    return searchTerm && fullName.includes(searchTerm) && fullName !== searchTerm;
  }).slice(0, 6);

  return (
    <div className="relative w-full max-w-xl mx-auto">
      <div className="flex items-center rounded-2xl bg-white p-2 shadow-xl shadow-slate-200/60 border border-slate-200/80 transition-all focus-within:border-blue-600 focus-within:ring-4 focus-within:ring-blue-100">
        <div className="pl-3 pr-2 text-slate-400">
          <HiSearch className="w-5 h-5" />
        </div>
        
        <input
          type="text"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          className="w-full bg-transparent text-sm md:text-base text-slate-800 placeholder-slate-400 focus:outline-none"
          placeholder="Search for 'Plumber', 'AC Repair', 'Cleaning'..."
        />

        <button
          type="button"
          onClick={() => handleSearch()}
          className="ml-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-95 text-white text-sm font-semibold shadow-md shadow-blue-500/20 transition-all whitespace-nowrap"
        >
          Find Pros
        </button>
      </div>

      {/* Auto-suggest dropdown */}
      {isOpen && filteredItems.length > 0 && (
        <div className="absolute left-0 right-0 top-full mt-2 bg-white rounded-xl shadow-xl border border-slate-200 divide-y divide-slate-100 overflow-hidden z-40 animate-in fade-in slide-in-from-top-1 duration-150">
          {filteredItems.map((item, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => {
                setValue(item.full_name);
                handleSearch(item.full_name);
              }}
              className="w-full text-left px-4 py-2.5 text-sm text-slate-700 hover:bg-blue-50 hover:text-blue-600 flex items-center gap-2 transition-colors"
            >
              <HiSearch className="w-4 h-4 text-slate-400" />
              <span>{item.full_name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
