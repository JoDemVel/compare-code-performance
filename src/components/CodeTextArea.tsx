import React, { useRef, useEffect, useState } from 'react';

export const CodeTextArea = () => {
  const [value, setValue] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [value]);

  const handleChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setValue(e.target.value);
  };

  return (
    <textarea
      ref={textareaRef}
      value={value}
      onChange={handleChange}
      spellCheck={false}
      className="w-full resize-none overflow-hidden font-mono bg-background p-2 border rounded-sm"
      placeholder="Call the method with the test case input here..."
    />
  );
};
