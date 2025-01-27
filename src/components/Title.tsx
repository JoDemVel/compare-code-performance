import { useState } from 'react';

interface TitleProps {
  isVisible: boolean;
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
}

export const Title = ({ isVisible, title, setTitle }: TitleProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleTitleClick = () => setIsEditing(true);

  const handleInputBlur = () => setIsEditing(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const containerClasses = `bg-card w-[30%] left-[67%] top-5 absolute z-10 border rounded-lg px-2 py-0.5 font-mono text-sm transition-opacity duration-100 ${
    isEditing || isVisible ? 'opacity-70' : 'opacity-0'
  }`;

  return (
    <div className={containerClasses}>
      {isEditing ? (
        <input
          type="text"
          value={title}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          autoFocus
          spellCheck={false}
          aria-label="Edit title"
          className="w-full bg-transparent border-transparent focus:outline-none"
        />
      ) : (
        <span
          className="cursor-text title-overflow"
          onClick={handleTitleClick}
          spellCheck={false}
        >
          {title}
        </span>
      )}
    </div>
  );
};
