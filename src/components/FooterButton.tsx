import { Button } from '@/components/ui/button';

interface FooterButtonProps {
  onClick: () => void;
}

export const FooterButton = ({ onClick }: FooterButtonProps) => {
  return (
    <div className="bg-muted p-1 rounded-xl absolute bottom-4 left-1/2 transform -translate-x-1/2 w-[70%] min-w-[340px] h-[70px] hover:scale-105 transition-transform duration-200">
      <div className="rounded-lg border-2 border-dashed hover:bg-card w-full h-full">
        <Button
          className="text-xl w-full h-full hover:bg-card"
          variant="outline"
          onClick={onClick}
        >
          <div className="flex justify-center">
            <span className="px-5">Run Tests</span>
            <div className="flex items-center gap-2">
              <kbd className="px-3 py-0.5 text-base font-semibold bg-muted rounded">
                Ctrl
              </kbd>
              <span className="text-sm font-semibold">+</span>
              <kbd className="px-3 py-0.5 text-base font-semibold bg-muted rounded">
                ↵
              </kbd>
            </div>
          </div>
        </Button>
      </div>
    </div>
  );
};
