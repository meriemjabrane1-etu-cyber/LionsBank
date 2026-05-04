import { usePage, useForm, router } from "@inertiajs/react";

export default function Appointments() {
  const { appointments } = usePage().props;

  const { data, setData, post, processing, errors, reset } = useForm({
    service_type: "",
    date: "",
  });

  const submit = (e) => {
    e.preventDefault();

    post("/appointments", {
      onSuccess: () => reset(),
    });
  };

  return (
    <div className="min-h-screen bg-[#F5F7F6] p-8">
      
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#111827]">
          Appointments / RDV
        </h1>
        <p className="text-[#6B7280] mt-1">
          Book and manage your bank appointments
        </p>
      </div>

      {/* Create Form */}
      <div className="bg-white rounded-xl shadow-sm border border-[#E5E7EB] p-6 mb-8">
        <h2 className="text-lg font-semibold text-[#111827] mb-4">
          Create new appointment
        </h2>

        <form onSubmit={submit} className="grid grid-cols-3 gap-4 items-end">
          
          {/* Service */}
          <div>
            <label className="block text-sm text-[#6B7280] mb-2">
              Service type
            </label>
            <select
              value={data.service_type}
              onChange={(e) => setData("service_type", e.target.value)}
              className="w-full text-black rounded-lg border border-[#E5E7EB] px-4 py-3 outline-none focus:ring-2 focus:ring-[#0F9D8A]"
            >
              <option value="">Choose service</option>
              <option value="Card issue">Card issue</option>
              <option value="Loan request">Loan request</option>
              <option value="Account problem">Account problem</option>
              <option value="Cheque validation">Cheque validation</option>
            </select>
            {errors.service_type && (
              <p className="text-sm text-red-500 mt-1">{errors.service_type}</p>
            )}
          </div>

          {/* Date */}
          <div>
            <label className="block text-sm text-[#6B7280] mb-2">
              Date & Time
            </label>
            <input
              type="datetime-local"
              value={data.date}
              onChange={(e) => setData("date", e.target.value)}
              className="w-full text-black rounded-lg border border-[#E5E7EB] px-4 py-3 outline-none focus:ring-2 focus:ring-[#0F9D8A]"
            />
            {errors.date && (
              <p className="text-sm text-red-500 mt-1">{errors.date}</p>
            )}
          </div>

          {/* Button */}
          <button
            disabled={processing}
            className="bg-[#0F9D8A] hover:bg-[#0D9488] text-white rounded-lg px-5 py-3 font-medium transition"
          >
            {processing ? "Booking..." : "Book Appointment"}
          </button>
        </form>
      </div>

      {/* List */}
      <div className="grid grid-cols-3 gap-6">
        {appointments.map((rdv) => (
          <div
            key={rdv.id}
            className="bg-white p-6 rounded-xl shadow-sm border border-[#E5E7EB] hover:shadow-md transition"
          >
            {/* Title */}
            <h2 className="text-lg font-semibold text-[#111827]">
              {rdv.service_type}
            </h2>

            {/* Info */}
            <div className="mt-4 space-y-1 text-sm text-[#6B7280]">
              <p>Client: {rdv.user?.name}</p>
              <p>Employee: {rdv.employee?.name ?? "Not assigned"}</p>
              <p>Date: {rdv.date}</p>
            </div>

            {/* Status */}
            <span
              className={`inline-block mt-5 px-3 py-1 text-xs rounded-full font-medium ${
                rdv.status === "pending"
                  ? "bg-[#D1FAE5] text-[#0F9D8A]"
                  : rdv.status === "approved"
                  ? "bg-green-100 text-green-600"
                  : "bg-red-100 text-red-500"
              }`}
            >
              {rdv.status}
            </span>

            {/* Actions */}

          </div>
        ))}
      </div>
    </div>
  );
}