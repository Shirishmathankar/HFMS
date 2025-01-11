import { useState } from 'react'
import Dashboard from '../component/Dashboard.jsx'
import PatientManagement from '../component/PateintManagement.jsx'
import FoodChartCreation from '../component/FoodChartCreation.jsx'
import PantryManagement from '../component/PantryManagement.jsx'
import MealTracking from '../component/MealTracking.jsx'
import Logout from '../component/logout.jsx'

export default function HospitalFoodManager() {
  const [activeTab, setActiveTab] = useState('dashboard')

  const renderComponent = () => {
    switch (activeTab) {
      case 'patients':
        return <PatientManagement />
      case 'foodCharts':
        return <FoodChartCreation />
      case 'pantry':
        return <PantryManagement />
      case 'mealTracking':
        return <MealTracking />
      case 'logout':
        return <Logout/>  
      default:
        return <Dashboard />
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <span className="text-2xl font-bold text-indigo-600">Hospital Food Manager</span>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                {['dashboard', 'patients', 'foodCharts', 'pantry', 'mealTracking','logout'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`${
                      activeTab === tab
                        ? 'border-indigo-500 text-gray-900'
                        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                    } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {renderComponent()}
      </main>
    </div>
  )
}
