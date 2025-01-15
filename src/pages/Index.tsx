import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen p-8 bg-background">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">Brain Training Games</h1>
          <p className="text-muted-foreground">
            Challenge yourself with our collection of brain training games
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link to="/memory-trainer" className="block transition-transform hover:scale-105">
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Memory Trainer</CardTitle>
                <CardDescription>
                  Train your memory by remembering sequences of numbers
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                  <span className="text-4xl font-bold text-muted-foreground">🧠</span>
                </div>
              </CardContent>
            </Card>
          </Link>
          {/* Placeholder for the next game */}
          <Card className="opacity-50">
            <CardHeader>
              <CardTitle>Coming Soon</CardTitle>
              <CardDescription>
                New brain training game coming soon...
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                <span className="text-4xl font-bold text-muted-foreground">🎮</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;