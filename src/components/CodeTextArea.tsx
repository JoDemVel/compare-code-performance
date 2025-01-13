import React, { useRef, useEffect, useState } from 'react';

interface CodeTextAreaProps {
  placeholder?: string;
  value?: string;
  editable?: boolean;
}

export const CodeTextArea = ({
  placeholder = '',
  value = '',
  editable = false,
}: CodeTextAreaProps) => {
  const [codeValue, setCodeValue] = useState(value);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (!value) {
      const textarea = textareaRef.current;
      if (textarea) {
        textarea.style.height = 'auto';
        textarea.style.height = `${textarea.scrollHeight}px`;
      }
    } else {
      setCodeValue(value);
    }
  }, [codeValue, value]);

  const handleChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setCodeValue(e.target.value);
  };

  return (
    <textarea
      ref={textareaRef}
      value={codeValue}
      readOnly={!editable}
      onChange={handleChange}
      spellCheck={false}
      className="w-full resize-none overflow-hidden font-mono bg-background p-2 border rounded-sm"
      placeholder={placeholder}
    />
  );
};
