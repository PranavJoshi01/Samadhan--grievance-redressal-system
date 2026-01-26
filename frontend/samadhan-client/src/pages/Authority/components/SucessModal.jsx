// src/pages/Authority/components/SuccessModal.jsx
export default function SuccessModal({ onClose }) {
  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
      <div className="bg-white rounded-xl p-10 text-center w-[360px]">

        <div className="w-14 h-14 rounded-full bg-green-100 mx-auto mb-4
                        flex items-center justify-center text-green-600 text-2xl">
          ✓
        </div>

        <h2 className="text-lg font-semibold">
          Status Updated Successfully!
        </h2>
        <p className="text-sm text-gray-500 mt-2">
          The citizen has been notified.
        </p>

        <button
          onClick={onClose}
          className="mt-6 px-6 py-2 bg-black text-white rounded-lg"
        >
          Close
        </button>
      </div>
    </div>
  );
}