import { useState } from "react";
import { Button } from "antd";

function App() {
  const [count, setCount] = useState(0);
  return (
    <>
      <Button>123</Button>
      <div className="mt-10px">1234</div>
    </>
  );
}

export default App;
