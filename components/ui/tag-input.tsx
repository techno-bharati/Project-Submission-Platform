"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { Input } from "./input";

interface TagInputProps {
  value?: string[];
  setValue: (tags: string[]) => void;
}

const TagInput: React.FC<TagInputProps> = ({ value = [], setValue }) => {
  const [inputValue, setInputValue] = useState("");

  const addTag = () => {
    const trimmed = inputValue.trim();
    if (trimmed !== "" && !value.includes(trimmed)) {
      setValue([...value, trimmed]);
    }
    setInputValue("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === "Tab") {
      e.preventDefault();
      addTag();
    }
  };

  const handleRemoveTag = (tag: string) => {
    setValue(value.filter((t) => t !== tag));
  };

  return (
    <div className="w-full flex flex-wrap gap-1">
      {value.map((tag) => (
        <span
          key={tag}
          className="flex items-center gap-1 px-2 py-1 text-sm rounded-full bg-muted text-muted-foreground"
        >
          {tag}
          <button
            type="button"
            onClick={() => handleRemoveTag(tag)}
            className="hover:text-destructive"
          >
            <X className="w-3 h-3" />
          </button>
        </span>
      ))}
      <Input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type and press Enter or Tab"
      />
    </div>
  );
};

export default TagInput;
