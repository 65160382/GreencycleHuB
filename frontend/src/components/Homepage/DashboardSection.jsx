import { Package, Truck, CheckCircle } from "lucide-react";

export default function DashboardSection() {
  return (
    <section
      id="dashboard"
      className="py-20 px-4 sm:px-6 lg:px-8 "
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Your Waste Management Dashboard
          </h2>
          <p className="text-xl text-slate-700 max-w-2xl mx-auto">
            Track your progress and manage your recyclable inventory
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* ✅ Waste Inventory */}
          <div className="lg:col-span-2 border border-emerald-200 bg-white/90 backdrop-blur-sm shadow-sm rounded-lg p-6">
            <div className="text-slate-900 text-lg font-semibold flex items-center mb-6">
              <Package className="w-5 h-5 mr-2 text-emerald-600" />
              Current Waste Inventory
            </div>

            {/* === Item 1 === */}
            <div className="space-y-4 mb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-emerald-500 rounded-full" />
                  <span className="font-medium text-slate-900">
                    Plastic Bottles
                  </span>
                </div>
                <div className="text-right">
                  <div className="font-bold text-slate-900">24 items</div>
                  <div className="text-sm text-emerald-600">$12.50 value</div>
                </div>
              </div>
              <progress
                value={80}
                max={100}
                className="w-full h-2 rounded bg-gray-100 [&::-webkit-progress-bar]:bg-gray-100 [&::-webkit-progress-value]:bg-emerald-500"
              />
            </div>

            {/* === Item 2 === */}
            <div className="space-y-4 mb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-emerald-500 rounded-full" />
                  <span className="font-medium text-slate-900">
                    Aluminum Cans
                  </span>
                </div>
                <div className="text-right">
                  <div className="font-bold text-slate-900">18 items</div>
                  <div className="text-sm text-emerald-600">$8.75 value</div>
                </div>
              </div>
              <progress
                value={60}
                max={100}
                className="w-full h-2 rounded bg-gray-100 [&::-webkit-progress-bar]:bg-gray-100 [&::-webkit-progress-value]:bg-emerald-500"
              />
            </div>

            {/* === Item 3 === */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-emerald-400 rounded-full" />
                  <span className="font-medium text-slate-900">Cardboard</span>
                </div>
                <div className="text-right">
                  <div className="font-bold text-slate-900">12 kg</div>
                  <div className="text-sm text-emerald-600">$6.25 value</div>
                </div>
              </div>
              <progress
                value={40}
                max={100}
                className="w-full h-2 rounded bg-gray-100 [&::-webkit-progress-bar]:bg-gray-100 [&::-webkit-progress-value]:bg-emerald-500"
              />
            </div>
          </div>

          {/* ✅ Pickup Status */}
          <div className="border border-emerald-200 bg-white/90 backdrop-blur-sm shadow-sm rounded-lg p-6">
            <div className="text-slate-900 text-lg font-semibold flex items-center mb-6">
              <Truck className="w-5 h-5 mr-2 text-emerald-600" />
              Pickup Status
            </div>

            <div className="text-center p-6 bg-emerald-50 rounded-lg border border-emerald-100 mb-4">
              <div className="text-2xl font-bold text-slate-900 mb-2">
                $27.50
              </div>
              <div className="text-sm text-slate-600 mb-4">
                Total Value Ready
              </div>
              <span className="inline-flex items-center text-sm font-medium bg-emerald-100 text-emerald-800 border border-emerald-200 px-3 py-1 rounded-full">
                <CheckCircle className="w-3 h-3 mr-1" />
                Ready for Pickup
              </span>
            </div>

            <button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-4 rounded-md transition-colors shadow-sm mb-4">
              Book Pickup Queue
            </button>

            <div className="text-center text-sm text-slate-600">
              Next available slot: Tomorrow 2-4 PM
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
