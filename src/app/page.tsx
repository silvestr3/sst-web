import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex items-center justify-center flex-col h-screen">
      <h1 className="text-foreground text-3xl">Hello world</h1>
      <Button variant={"secondary"}>Submit</Button>
    </div>
  );
}
