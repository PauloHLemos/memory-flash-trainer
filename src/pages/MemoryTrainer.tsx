import MemoryGame from "@/components/MemoryGame";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const MemoryTrainer = () => {
  return (
    <div id="memory-trainer-container" className="min-h-screen p-8 bg-background">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <Link to="/">
            <Button variant="ghost">← Back to Games</Button>
          </Link>
        </div>
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">Memory Trainer</h1>
          <p className="text-muted-foreground">
            Train your memory by remembering sequences of numbers. The numbers will flash one at a time.
          </p>
        </div>
        <MemoryGame />
      </div>
    </div>
  );
};

export default MemoryTrainer;