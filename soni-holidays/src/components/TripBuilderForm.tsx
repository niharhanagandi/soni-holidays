'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { destinations } from '@/content/destinations';

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(8),
  dests: z.array(z.string()).min(1),
  startDate: z.string(),
  nights: z.number().min(1),
  groupSize: z.number().min(1),
  budgetRange: z.string(),
  hotelCategory: z.enum(['Standard','Deluxe','Premium','Luxury']),
  interests: z.array(z.string()).optional(),
  transport: z.array(z.string()).optional(),
  mealPlan: z.string().optional(),
  special: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

export default function TripBuilderForm() {
  const [step, setStep] = useState(1);
  const { register, handleSubmit, formState: { errors, isSubmitting, isSubmitSuccessful }, watch, setValue } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { dests: [], nights: 5, groupSize: 2, hotelCategory: 'Deluxe' },
  });

  const onSubmit = async (data: FormData) => {
    const res = await fetch('/.netlify/functions/submitTripBuilder', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...data, source: 'trip-builder' }) });
    if (res.ok) setStep(5);
  };

  const allDestinations = destinations.map((d) => ({ value: d.slug, label: d.name }));

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {step === 1 && (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Traveler details</h3>
          <div className="grid md:grid-cols-3 gap-4">
            <input className="border rounded-xl px-3 py-2" placeholder="Name" {...register('name')} />
            <input className="border rounded-xl px-3 py-2" placeholder="Email" {...register('email')} />
            <input className="border rounded-xl px-3 py-2" placeholder="Phone" {...register('phone')} />
          </div>
          <div className="flex justify-end"><button type="button" className="btn-primary" onClick={() => setStep(2)}>Next</button></div>
        </div>
      )}
      {step === 2 && (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Trip basics</h3>
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm mb-1">Destination(s)</label>
              <div className="grid grid-cols-2 gap-2 max-h-40 overflow-auto border rounded-xl p-2">
                {allDestinations.map((d) => (
                  <label key={d.value} className="flex items-center gap-2 text-sm">
                    <input type="checkbox" value={d.value} onChange={(e) => {
                      const current = new Set(watch('dests'));
                      if (e.target.checked) current.add(d.value); else current.delete(d.value);
                      setValue('dests', Array.from(current));
                    }} />
                    {d.label}
                  </label>
                ))}
              </div>
            </div>
            <input className="border rounded-xl px-3 py-2" placeholder="Start date" {...register('startDate')} />
            <input type="number" className="border rounded-xl px-3 py-2" placeholder="Nights" {...register('nights', { valueAsNumber: true })} />
          </div>
          <div className="flex justify-between">
            <button type="button" className="btn-outline" onClick={() => setStep(1)}>Back</button>
            <button type="button" className="btn-primary" onClick={() => setStep(3)}>Next</button>
          </div>
        </div>
      )}
      {step === 3 && (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Group & preferences</h3>
          <div className="grid md:grid-cols-3 gap-4">
            <input type="number" className="border rounded-xl px-3 py-2" placeholder="Group size" {...register('groupSize', { valueAsNumber: true })} />
            <input className="border rounded-xl px-3 py-2" placeholder="Budget range (per person)" {...register('budgetRange')} />
            <select className="border rounded-xl px-3 py-2" {...register('hotelCategory')}>
              <option>Standard</option>
              <option>Deluxe</option>
              <option>Premium</option>
              <option>Luxury</option>
            </select>
          </div>
          <div>
            <label className="block text-sm mb-1">Interests</label>
            <div className="flex flex-wrap gap-2">
              {['nature','adventure','luxury','culture','food'].map((i) => (
                <label key={i} className="text-sm">
                  <input type="checkbox" value={i} className="mr-1" {...register('interests')} /> {i}
                </label>
              ))}
            </div>
          </div>
          <div className="flex justify-between">
            <button type="button" className="btn-outline" onClick={() => setStep(2)}>Back</button>
            <button type="button" className="btn-primary" onClick={() => setStep(4)}>Next</button>
          </div>
        </div>
      )}
      {step === 4 && (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Transport & meals</h3>
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm mb-1">Transport preferences</label>
              <label className="block text-sm"><input type="checkbox" value="flight" {...register('transport')} /> Flight assistance</label>
              <label className="block text-sm"><input type="checkbox" value="train" {...register('transport')} /> Train</label>
              <label className="block text-sm"><input type="checkbox" value="cab" {...register('transport')} /> Private cab</label>
            </div>
            <input className="border rounded-xl px-3 py-2" placeholder="Meal plan (e.g., breakfast)" {...register('mealPlan')} />
            <textarea className="border rounded-xl px-3 py-2" rows={4} placeholder="Special requests" {...register('special')} />
          </div>
          <div className="flex justify-between">
            <button type="button" className="btn-outline" onClick={() => setStep(3)}>Back</button>
            <button className="btn-primary" disabled={isSubmitting}>Submit</button>
          </div>
          {isSubmitSuccessful && <p className="text-green-700">Thank you! We will share a draft itinerary via email.</p>}
        </div>
      )}
      {step === 5 && (
        <div className="text-green-700">Submitted! Please check your email for the itinerary PDF.</div>
      )}
    </form>
  );
}