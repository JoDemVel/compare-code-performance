import { Copy } from 'lucide-react';
import { useRef, useEffect, useCallback, useMemo } from 'react';

interface CodeTextAreaProps {
  placeholder?: string;
  value?: string | null;
  setValue?: React.Dispatch<React.SetStateAction<string>>;
  errorMessage?: string | null;
  editable?: boolean;
  focus?: boolean;
}

export const CodeTextArea = ({
  placeholder = '',
  value,
  setValue,
  errorMessage,
  editable = false,
  focus = false,
}: CodeTextAreaProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      if (value != null) {
        textareaRef.current.style.height = '1em';
      } else {
        textareaRef.current.style.height = 'auto';
      }
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [value]);

  const handleChange = useCallback((e: { target: { value: React.SetStateAction<string> } }) => {
    if (setValue) {
      setValue(e.target.value);
    }
  }, [setValue]);

  const handleCopy = () => {
    if (textareaRef.current) {
      navigator.clipboard.writeText(textareaRef.current.value);
    }
  };

  const textareaClassName = useMemo(() => 
    `w-full resize-none overflow-hidden font-mono bg-background p-2 border rounded-sm pr-10 ${
      errorMessage ? 'text-red-500' : ''
    }`, [errorMessage]);

  return (
    <div className="relative w-full">
      <textarea
        ref={textareaRef}
        value={value ?? errorMessage ?? ''}
        readOnly={!editable}
        onChange={handleChange}
        spellCheck={false}
        className={textareaClassName}
        autoFocus={focus}
        placeholder={placeholder}
      />
      <Copy
        className="absolute top-2 right-2 hover:cursor-pointer hover:scale-105 transition-transform duration-200s"
        onClick={handleCopy}
      />
    </div>
  );
};
