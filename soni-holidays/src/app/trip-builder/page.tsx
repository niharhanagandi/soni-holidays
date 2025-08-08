import TripBuilderForm from '@/components/TripBuilderForm';

export default function TripBuilderPage() {
  return (
    <div className="container py-12 space-y-6">
      <h1 className="text-3xl font-bold">Custom Trip Builder</h1>
      <p className="text-gray-700">Tell us your preferences and we will share a personalised itinerary and quote.</p>
      <TripBuilderForm />
    </div>
  );
}