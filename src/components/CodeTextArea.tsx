import { useRef, useEffect } from 'react';

interface CodeTextAreaProps {
  placeholder?: string;
  value?: string;
  setValue?: React.Dispatch<React.SetStateAction<string>>;
  editable?: boolean;
}

export const CodeTextArea = ({
  placeholder = '',
  value,
  setValue,
  editable = false,
}: CodeTextAreaProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (!value) {
      const textarea = textareaRef.current;
      if (textarea) {
        textarea.style.height = 'auto';
        textarea.style.height = `${textarea.scrollHeight}px`;
      }
    } else {
      if (setValue) {
        setValue(value);
      }
    }
  }, [setValue, value]);

  const handleChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    if (setValue) {
      setValue(e.target.value);
    }
  };

  return (
    <textarea
      ref={textareaRef}
      value={value}
      readOnly={!editable}
      onChange={handleChange}
      spellCheck={false}
      className="w-full resize-none overflow-hidden font-mono bg-background p-2 border rounded-sm"
      placeholder={placeholder}
    />
  );
};
