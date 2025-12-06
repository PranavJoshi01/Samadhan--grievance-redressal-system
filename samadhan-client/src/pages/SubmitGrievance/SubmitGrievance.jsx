import React,{useState} from 'react';


const SubmitGrievance = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dept, setDept] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [address, setAddress] = useState("");
  const [media, setMedia] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      title,
      description,
      dept,
      latitude,
      longitude,
      address,
      media
    });
  };

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-xl p-8 mt-10">
      <h2 className="text-2xl font-semibold mb-6 text-blue-600">
        Submit Grievance
      </h2>

      <form className="space-y-5" onSubmit={handleSubmit}>
        
       
        <div>
          <label className="font-semibold">Title</label>
          <input
            type="text"
            className="w-full border p-3 rounded-lg mt-1"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        
        <div>
          <label className="font-semibold">Description</label>
          <textarea
            rows={3}
            className="w-full border p-3 rounded-lg mt-1"
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>

        
        
        <div>
          <label className="font-semibold">Select Department</label>
          <select
            className="w-full border p-3 rounded-lg mt-1"
            onChange={(e) => setDept(e.target.value)}
          >
            <option value="">Choose Department</option>
            <option value="1">Sanitation</option>
            <option value="2">Maintenance</option>
            <option value="3">Road Department</option>
          </select>
        </div>

       
        <div>
          <label className="font-semibold">Location</label>

          <div className="grid grid-cols-2 gap-4 mt-2">
            <input
              type="text"
              placeholder="Latitude"
              className="border p-3 rounded-lg"
              onChange={(e) => setLatitude(e.target.value)}
            />

            <input
              type="text"
              placeholder="Longitude"
              className="border p-3 rounded-lg"
              onChange={(e) => setLongitude(e.target.value)}
            />
          </div>

          <input
            type="text"
            placeholder="Address"
            className="border p-3 rounded-lg mt-3 w-full"
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>

       
        <div>
          <label className="font-semibold">Upload Images / Videos</label>
          <input
            type="file"
            multiple
            className="w-full border p-3 rounded-lg mt-1"
            onChange={(e) => setMedia([...e.target.files])}
          />
        </div>

        
        <div className="flex justify-end gap-4">
          <button
            type="button"
            className="border px-6 py-2 rounded-lg"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg"
          >
            Submit
          </button>
        </div>

      </form>
    </div>
  );
}

export default SubmitGrievance
