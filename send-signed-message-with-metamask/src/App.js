import SignMessage from "./Comps/SignMessage";
import VerifyMessage from "./Comps/VerifyMessage";
import Footer from "./Comps/Footer";

import "./App.css";

function App() {
  return (
    <>
      <div className="main-wrapper">
        <div className="subsection-wrapper">
          <SignMessage />
        </div>
        <div className="subsection-wrapper">
          <VerifyMessage />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default App;
