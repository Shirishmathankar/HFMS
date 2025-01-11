export default function Dashboard() {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* Total Patients */}
        <div className="bg-white p-4 shadow rounded-md">
          <div className="flex flex-row items-center justify-between pb-2 border-b">
            <h3 className="text-sm font-medium">Total Patients</h3>
            <div className="h-6 w-6 bg-indigo-200 rounded-full flex items-center justify-center">
              <div className="h-3 w-3 bg-indigo-500 rounded-full"></div>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-2xl font-bold">120</p>
            <p className="text-xs text-gray-500">+10% from last month</p>
          </div>
        </div>
  
        {/* Meals Prepared Today */}
        <div className="bg-white p-4 shadow rounded-md">
          <div className="flex flex-row items-center justify-between pb-2 border-b">
            <h3 className="text-sm font-medium">Meals Prepared Today</h3>
            <div className="h-6 w-6 bg-green-200 rounded-full flex items-center justify-center">
              <div className="h-3 w-3 bg-green-500 rounded-full"></div>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-2xl font-bold">345</p>
            <p className="text-xs text-gray-500">+5% from yesterday</p>
          </div>
        </div>
  
        {/* Active Pantry Staff */}
        <div className="bg-white p-4 shadow rounded-md">
          <div className="flex flex-row items-center justify-between pb-2 border-b">
            <h3 className="text-sm font-medium">Active Pantry Staff</h3>
            <div className="h-6 w-6 bg-yellow-200 rounded-full flex items-center justify-center">
              <div className="h-3 w-3 bg-yellow-500 rounded-full"></div>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-2xl font-bold">15</p>
            <p className="text-xs text-gray-500">2 on leave</p>
          </div>
        </div>
  
        {/* Pending Deliveries */}
        <div className="bg-white p-4 shadow rounded-md">
          <div className="flex flex-row items-center justify-between pb-2 border-b">
            <h3 className="text-sm font-medium">Pending Deliveries</h3>
            <div className="h-6 w-6 bg-red-200 rounded-full flex items-center justify-center">
              <div className="h-3 w-3 bg-red-500 rounded-full"></div>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-2xl font-bold">23</p>
            <p className="text-xs text-gray-500">Evening meals</p>
          </div>
        </div>
      </div>
    );
  }
  