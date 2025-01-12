import React, { useEffect, useState } from "react";

const ContactAdminDashboard = () => {
  const [formData, setFormData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/getData");
        if (!res.ok) {
          const errorDetails = await res.text();
          throw new Error(`Error fetching data: ${errorDetails}`);
        }
        const jsonData = await res.json();
        setFormData(jsonData.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
        role="alert">
        <strong className="font-bold">Error!</strong>
        <span className="block sm:inline"> {error}</span>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-8">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Contact Details</h2>
      <div className="overflow-x-auto bg-white rounded-lg shadow overflow-y-auto relative">
        <table className="border-collapse table-auto w-full whitespace-no-wrap bg-white table-striped relative">
          <thead>
            <tr className="text-left">
              <th className="bg-gray-100 sticky top-0 border-b border-gray-200 px-6 py-3 text-gray-600 font-bold tracking-wider uppercase text-xs">
                Name
              </th>
              <th className="bg-gray-100 sticky top-0 border-b border-gray-200 px-6 py-3 text-gray-600 font-bold tracking-wider uppercase text-xs">
                Email
              </th>
              <th className="bg-gray-100 sticky top-0 border-b border-gray-200 px-6 py-3 text-gray-600 font-bold tracking-wider uppercase text-xs">
                Mobile
              </th>
              <th className="bg-gray-100 sticky top-0 border-b border-gray-200 px-6 py-3 text-gray-600 font-bold tracking-wider uppercase text-xs">
                Message
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {formData.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center py-4 text-gray-500">
                  No submissions found
                </td>
              </tr>
            ) : (
              formData.map((entry) => (
                <tr key={entry._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {entry.name}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {entry.email}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {entry.mobile || "N/A"}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {entry.message}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ContactAdminDashboard;
