const ExtractedDataDisplay = ({ extractedData }) => (
    <div className="w-full lg:w-1/2 max-w-2xl mx-auto mt-4 lg:mt-0">
      <h2 className="text-lg font-medium mb-4">Parsed Data</h2>
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-8">
          <div>
            <div className="text-sm text-gray-500">Aadhaar Number</div>
            <div className="mt-1 border-b border-gray-300 pb-1">
              {extractedData.aadhaarNumber || "Not found"}
            </div>
          </div>
          <div>
            <div className="text-sm text-gray-500">Name on Aadhaar</div>
            <div className="mt-1 border-b border-gray-300 pb-1">
              {extractedData.name || "Not found"}
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-8">
          <div>
            <div className="text-sm text-gray-500">Date of birth</div>
            <div className="mt-1 border-b border-gray-300 pb-1">
              {extractedData.dob || "Not found"}
            </div>
          </div>
          <div>
            <div className="text-sm text-gray-500">Gender</div>
            <div className="mt-1 border-b border-gray-300 pb-1">
              {extractedData.gender || "Not found"}
            </div>
          </div>
        </div>
        <div>
          <div className="text-sm text-gray-500">Address</div>
          <div className="mt-1 border-b border-gray-300 pb-1">
            {extractedData.address || "Not found"}
          </div>
        </div>
        <div>
          <div className="text-sm text-gray-500">Pincode</div>
          <div className="mt-1 border-b border-gray-300 pb-1">
            {extractedData.pincode || "Not found"}
          </div>
        </div>
      </div>
    </div>
  );
  
  export default ExtractedDataDisplay;
  