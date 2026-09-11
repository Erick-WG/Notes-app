import { useState } from "react";
import { X, Plus } from "lucide-react";


const PREDEFINED_TAGS = ["work", "personal", "idea", "urgent", "follow-up", "reference"];

export default function TagPicker({ initialTags = [], onChange }) {
  const [selected, setSelected] = useState(initialTags);
  const [customInput, setCustomInput] = useState("");

  function commit(next) {
    setSelected(next);
    onChange?.(next); // hand the array up to the parent form
  }

  function toggleTag(tag) {
    if (selected.includes(tag)) {
      commit(selected.filter((t) => t !== tag));
    } else {
      commit([...selected, tag]);
    }
  }

  function addCustomTag() {
    const tag = customInput.trim().toLowerCase().replace(/\s+/g, "-");
    if (!tag) return;
    if (!selected.includes(tag)) {
      commit([...selected, tag]);
    }
    setCustomInput("");
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      addCustomTag();
    }
  }

  return (
    <div className="w-full max-w-180 space-y-4 mb-4">
      <div>
        <p className="text-sm font-medium text-foreground mb-2">Choose tags</p>
        <div className="flex flex-wrap gap-2">
          {PREDEFINED_TAGS.map((tag) => {
            const active = selected.includes(tag);
            return (
              <button
                key={tag}
                type="button"
                onClick={() => toggleTag(tag)}
                className={`px-3 py-1 rounded-full text-sm border transition-colors hover:cursor-pointer ${
                  active
                    ? "bg-primary text-foreground border-primary"
                    : "text-foreground border-muted-foreground hover:border-muted-foreground"
                }`}
              >
                {tag}
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <p className="text-sm font-medium text-foreground mb-2">Add a custom tag</p>
        <div className="flex flex-col md:flex-row gap-2">
          <input
            type="text"
            value={customInput}
            onChange={(e) => setCustomInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="e.g. project-x"
            className="flex-1 px-3 py-1.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="button"
            onClick={addCustomTag}
            className="px-3 pr-5 py-1.5 w-fit border border-border rounded-md text-sm text-muted-foreground hover:bg-muted-foreground/20 hover:cursor-pointer flex items-center gap-1"
          >
            <Plus size={14} /> Add Tag
          </button>
        </div>
      </div>

      {selected.length > 0 && (
        <div>
          <p className="text-sm font-medium text-foreground mb-2">Selected ({selected.length})</p>
          <div className="flex flex-wrap gap-2">
            {selected.map((tag) => (
              <span
                key={tag}
                onClick={() => toggleTag(tag)}
                className="flex items-center gap-1 pl-3 pr-1 py-1 rounded-full text-sm bg-card text-foreground border border-border hover:cursor-pointer"
              >
                {tag}
                <button
                  type="button"
                  className="p-0.5 rounded-full hover:bg-muted-foreground"
                  aria-label={`Remove ${tag}`}
                >
                  <X size={12} />
                </button>
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}