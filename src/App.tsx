import { InputSelectDemo } from "@/demo/input-select-demo";
import { InputMultiSelectDemo } from "@/demo/input-multiselect-demo";
import { Github } from "lucide-react";
import { Button } from "@/components/ui/button";

const getComponent = (key: string | null) => {
  if (key === "input-select") return <InputSelectDemo />;
  if (key === "input-multiselect") return <InputMultiSelectDemo />;
  return null;
}

function App() {
  const urlParams = new URLSearchParams(window.location.search);

  const comp = getComponent(urlParams.get("component"));

  return (
    <div className="flex items-center justify-center w-screen h-screen bg-muted">
      <div className="fixed top-0 left-0 right-0 flex items-center justify-between px-6 text-sm border-b h-14">
        <div>Vic Ong | shadcn-components-extend</div>
        <div>
          <Button>
            <a href="" target="_blank" className="flex items-center space-x-2">
              <div><Github className="w-4 h-4" /></div>
              <div>Source Code</div>
            </a>
          </Button>
        </div>
      </div>
      <div className="w-[30rem] rounded-md p-10 border border-border bg-background">{comp}</div>
    </div>
  )
}

export default App
