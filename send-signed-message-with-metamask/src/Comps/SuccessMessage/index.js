export default function SuccessMessage({ message }) {
    if (!message) return null;
  
    return (
      <div className="valid-wrapper">
        <div className="">
          <label><b>{message}</b></label>
        </div>
      </div>
    );
  }
  