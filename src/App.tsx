import { InputSelectDemo } from "@/demo/input-select-demo";

const getComponent = (key: string | null) => {
  if (key === "input-select") return <InputSelectDemo />;
  return null;
}

function App() {
  const urlParams = new URLSearchParams(window.location.search);

  const comp = getComponent(urlParams.get("component"));

  return (
    <div className="flex items-center justify-center w-screen h-screen bg-muted">
      <div className="w-[30rem] rounded-md p-10 border border-border bg-background">{comp}</div>
    </div>
  )
}

export default App
