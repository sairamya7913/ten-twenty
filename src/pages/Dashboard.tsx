import { useNavigate } from "react-router-dom";

import { logout } from "../services/authService";

export default function Dashboard() {
  const navigate = useNavigate();

   const handleLogout = () => {
    logout();              // Clear token from localStorage
    navigate("/");         // Redirect to login page
  };

  type TimesheetStatus = "COMPLETED" | "INCOMPLETE" | "MISSING";


  const timesheets: { week: number; date: string; status: TimesheetStatus }[] = [

    { week: 1, date: "1 - 5 January, 2024", status: "COMPLETED" },

    { week: 2, date: "8 - 12 January, 2024", status: "COMPLETED" },

    { week: 3, date: "15 - 19 January, 2024", status: "INCOMPLETE" },

    { week: 4, date: "22 - 26 January, 2024", status: "COMPLETED" },

    { week: 5, date: "28 January - 1 February, 2024", status: "MISSING" },

  ];



  const getStatusColor = (status: TimesheetStatus) => {

    switch (status) {

      case "COMPLETED":

        return "bg-green-200 text-green-800";

      case "INCOMPLETE":

        return "bg-yellow-200 text-yellow-800";

      case "MISSING":

        return "bg-pink-200 text-pink-800";

      default:

        return "";

    }

  };



  const getActionLabel = (status: TimesheetStatus) => {

    switch (status) {

      case "COMPLETED":

        return "View";

      case "INCOMPLETE":

        return "Update";

      case "MISSING":

        return "Create";

      default:

        return "";

    }

  };





  return (

<div className="w-full min-h-screen bg-gray-50 p-8 flex flex-col">

       <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Your Timesheets</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>



      {/* Table Container fills remaining space */}

      <div className="overflow-x-auto overflow-y-auto bg-white shadow rounded-lg flex-1">

        <table className="min-w-full table-auto">

          <thead className="bg-gray-100">

            <tr>

              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">WEEK #</th>

              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">DATE</th>

              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">STATUS</th>

              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">ACTIONS</th>

            </tr>

          </thead>

          <tbody className="divide-y divide-gray-200">

            {timesheets.map((t) => (

              <tr key={t.week}>

                <td className="px-6 py-4 whitespace-nowrap">{t.week}</td>

                <td className="px-6 py-4 whitespace-nowrap">{t.date}</td>

                <td className="px-6 py-4 whitespace-nowrap">

                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(t.status)}`}>

                    {t.status}

                  </span>

                </td>

                <td className="px-6 py-4 whitespace-nowrap">

                  <button className="text-blue-600 hover:underline">{getActionLabel(t.status)}</button>

                </td>

              </tr>

            ))}

          </tbody>



        </table>



        {/* Pagination */}

        <div className="px-6 py-4 flex justify-between items-center">

          <div>

            <label>

              <select className="border rounded px-2 py-1">

                <option>5 per page</option>

                <option>10 per page</option>

                <option>20 per page</option>

              </select>

            </label>

          </div>

          <div className="space-x-1">

            <button className="px-2 py-1 border rounded">Previous</button>

            <button className="px-2 py-1 border rounded bg-gray-200">1</button>

            <button className="px-2 py-1 border rounded">2</button>

            <button className="px-2 py-1 border rounded">3</button>

            <button className="px-2 py-1 border rounded">Next</button>

          </div>

        </div>

      </div>



      <footer className="text-center text-gray-500 mt-6">

        © 2024 tentwenty. All rights reserved.

      </footer>

    </div>

  );

}