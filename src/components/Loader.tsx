interface LoaderProps {
  text?: string;
}

export const Loader = ({ text }: LoaderProps) => (
  <div className="flex items-center justify-center h-full" aria-label="Loading">
    <div className="flex items-center gap-2">
      <span className="loader"></span>
      {text && <span className="loader-text">{text}</span>}
    </div>
  </div>
);
