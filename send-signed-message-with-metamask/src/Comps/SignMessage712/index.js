import { useState, useRef } from "react";
import { ethers } from "ethers";
import ErrorMessage from "../ErrorMessage";
import types from "../../Data/types";
import domain from "../../Data/domain";

const SignMessage712 = () => {
  const resultBox = useRef();
  const [signatures, setSignatures] = useState([]);
  const [error, setError] = useState();

  const signMessage = async ({ setError, message }) => {
    try {
      // console.log({ message });
      if (!window.ethereum)
        throw new Error("No crypto wallet found. Please install it.");

      await window.ethereum.send("eth_requestAccounts");
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const address = await signer.getAddress();
      // console.log("address", address);
      const data = {
        owner: address,
        token: message,
        contract: domain.verifyingContract,
        timestamp: Math.round(new Date().getTime() / 1000),
      };
      let value = { data };
      // console.log("value", value);
      let signature = await signer._signTypedData(domain, types, value);

      return {
        domain,
        types,
        value,
        signature,
      };
    } catch (err) {
      setError(err.message);
    }
  };

  const handleSign = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    setError();
    const sig = await signMessage({
      setError,
      message: data.get("message"),
    });
    if (sig) {
      setSignatures([...signatures, sig]);
    }
  };

  return (
    <form className="" onSubmit={handleSign}>
      <div className="">
        <main className="">
          <h1 className="">Sign Messages</h1>
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
          <button type="submit" className="button-primary">
            Sign message
          </button>
          <ErrorMessage message={error} />
        </footer>
        {signatures.map((sig, idx) => {
          return (
            <div className="generated-signature-wrapper" key={idx}>
              <div className="">
                <h2 className="">
                  Copy And Paste Below Generated Details To Verify
                </h2>
                <p>
                  <b>Submitted Token ID:</b> {sig.value.data.token}
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
                <p>
                  <b>Signer:</b> {sig.value.data.owner}
                </p>
                <p>
                  <b>timestamp:</b> {sig.value.data.timestamp}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </form>
  );
};

export default SignMessage712;
