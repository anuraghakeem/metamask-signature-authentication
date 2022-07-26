import { useState, useRef } from "react";
import { ethers } from "ethers";
import ErrorMessage from "../ErrorMessage";
import SuccessMessage from "../SuccessMessage";

const verifyMessage = async ({ message, address, signature }) => {
  try {
    const signerAddr = await ethers.utils.verifyMessage(message, signature);
    if (signerAddr !== address) {
      return false;
    }

    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};

export default function VerifyMessage() {
  const [error, setError] = useState();
  const [successMsg, setSuccessMsg] = useState();

  const handleVerification = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    setSuccessMsg();
    setError();
    const isValid = await verifyMessage({
      setError,
      message: data.get("message"),
      address: data.get("address"),
      signature: data.get("signature")
    });

    if (isValid) {
      setSuccessMsg("Signature is valid!");
    } else {
      setError("Invalid signature");
    }
  };

  return (
    <form className="" onSubmit={handleVerification}>
      <div className="">
        <main className="">
          <h1 className="">
            Verify Message
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
            <div className="my-3">
              <textarea
                required
                type="text"
                name="signature"
                className="text-box"
                placeholder="Enter Signature"
              />
            </div>
            <div className="my-3">
              <input
                required
                type="text"
                name="address"
                className="text-box"
                placeholder="Signer address"
              />
            </div>
          </div>
        </main>
        <footer className="p-4">
          <button
            type="submit"
            className="button-primary"
          >
            Verify Message
          </button>
        </footer>
        <div className="">
          <ErrorMessage message={error} />
          <SuccessMessage message={successMsg} />
        </div>
      </div>
    </form>
  );
}
