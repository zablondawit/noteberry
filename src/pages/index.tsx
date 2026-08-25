import { Button } from "@/components/ui/button";
import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <Link to={"/pad"}>
        <Button>Create New Pad</Button>
      </Link>
    </div>
  );
}
