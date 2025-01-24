interface LoaderProps {
  text?: string;
}

export const Loader = ({ text }: LoaderProps) => {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="flex items-center gap-2">
        <span
          style={{
            width: '30px',
            height: '30px',
            border: '5px solid #d1d5d5',
            borderBottomColor: '#475659',
            borderRadius: '9999px',
            display: 'inline-block',
            boxSizing: 'border-box',
            animation: 'spin 1s linear infinite',
          }}
        ></span>
        {text && (
          <>
            <span
              className="text-lg font-semibold text-foreground font-mono"
              style={{ animation: 'opacity 0.8s linear infinite alternate' }}
            >
              {text}
            </span>
          </>
        )}
      </div>
    </div>
  );
};
