import { useState, useRef } from "react";
import { ethers } from "ethers";
import ErrorMessage from "../ErrorMessage";

const signMessage = async ({ setError, message }) => {
  try {
    console.log({ message });
    if (!window.ethereum)
      throw new Error("No crypto wallet found. Please install it.");

    await window.ethereum.send("eth_requestAccounts");
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const signature = await signer.signMessage(message);
    const address = await signer.getAddress();

    return {
      message,
      signature,
      address
    };
  } catch (err) {
    setError(err.message);
  }
};

export default function SignMessage() {
  const resultBox = useRef();
  const [signatures, setSignatures] = useState([]);
  const [error, setError] = useState();

  const handleSign = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    setError();
    const sig = await signMessage({
      setError,
      message: data.get("message")
    });
    if (sig) {
      setSignatures([...signatures, sig]);
    }
  };

  return (
    <form className="" onSubmit={handleSign}>
      <div className="">
        <main className="">
          <h1 className="">
            Sign Messages
          </h1>
          <div className="">
            <div className="">
              <textarea
                required
                type="text"
                name="message"
                className="text-box"
                placeholder="Enter Token ID"
              />
            </div>
          </div>
        </main>
        <footer className="">
          <button
            type="submit"
            className="button-primary"
          >
            Sign message
          </button>
          <ErrorMessage message={error} />
        </footer>
        {signatures.map((sig, idx) => {
          return (
            <div className="generated-signature-wrapper" key={sig}>
              <div className="">
                <h2 className="">
                    Copy And Paste Below Generated Details To Verify 
                </h2>
                <p>
                 <b>Submitted Token ID:</b>  {sig.message}
                </p>
                <b>Generated Signature:</b>
                <textarea
                  type="text"
                  readOnly
                  ref={resultBox}
                  className="text-box"
                  placeholder="Generated signature"
                  value={sig.signature}
                  />
                  <p><b>Signer:</b> {sig.address}</p>
              </div>
            </div>
          );
        })}
      </div>
    </form>
  );
}
