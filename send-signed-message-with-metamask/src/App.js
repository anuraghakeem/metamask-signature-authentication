// import SignMessage from "./Comps/SignMessage";
// import VerifyMessage from "./Comps/VerifyMessage";
import Footer from "./Comps/Footer";
import SignMessage712 from "./Comps/SignMessage712";
import VerifyMessage712 from "./Comps/VerifyMessage712";

import "./App.css";

function App() {
  return (
    <>
      <div className="main-wrapper">
        <div className="subsection-wrapper">
          <h1>EIP 712 BASED VERIFICATION</h1>
          <SignMessage712 />
        </div>
        <div className="subsection-wrapper">
          <VerifyMessage712 />
        </div>
        {/* 
          Non E712 based
        <div className="subsection-wrapper">
          <hr />
          <h1>REGULAR</h1>
          <SignMessage />
        </div>
        <div className="subsection-wrapper">
          <VerifyMessage />
        </div> */}
      </div>
      <Footer />
    </>
  );
}

export default App;
