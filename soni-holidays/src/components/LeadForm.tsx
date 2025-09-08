'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState } from 'react';

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(8),
  trip_type: z.enum(['family','student','corporate','adventure','luxury']).optional(),
  destination: z.string().min(2).optional(),
  start_date: z.string().optional(),
  end_date: z.string().optional(),
  budget: z.string().optional(),
  group_size: z.coerce.number().int().positive().optional(),
  pace: z.string().optional(),
  notes: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

export default function LeadForm({ sourcePage }: { sourcePage: string }) {
  const [submitted, setSubmitted] = useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    const res = await fetch('/api/leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...data, source_page: sourcePage }),
    });
    if (res.ok) {
      setSubmitted(true);
      window.location.href = '/thank-you';
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium">Name</label>
          <input className="w-full border rounded-xl px-3 py-2" {...register('name')} />
          {errors.name && <p className="text-sm text-red-600">{errors.name.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium">Email</label>
          <input type="email" className="w-full border rounded-xl px-3 py-2" {...register('email')} />
          {errors.email && <p className="text-sm text-red-600">{errors.email.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium">Phone</label>
          <input className="w-full border rounded-xl px-3 py-2" placeholder="+91 7892353175" {...register('phone')} />
          {errors.phone && <p className="text-sm text-red-600">{errors.phone.message}</p>}
        </div>
      </div>
      <div className="grid md:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium">Trip type</label>
          <select className="w-full border rounded-xl px-3 py-2" {...register('trip_type')}>
            <option value="">Select</option>
            <option value="family">Family</option>
            <option value="student">Student</option>
            <option value="corporate">Corporate</option>
            <option value="adventure">Adventure</option>
            <option value="luxury">Luxury</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium">Destination</label>
          <input className="w-full border rounded-xl px-3 py-2" placeholder="Manali, Dubai…" {...register('destination')} />
        </div>
        <div>
          <label className="block text-sm font-medium">Start date</label>
          <input className="w-full border rounded-xl px-3 py-2" {...register('start_date')} />
        </div>
        <div>
          <label className="block text-sm font-medium">End date</label>
          <input className="w-full border rounded-xl px-3 py-2" {...register('end_date')} />
        </div>
      </div>
      <div className="grid md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium">Budget</label>
          <input className="w-full border rounded-xl px-3 py-2" placeholder="Per person" {...register('budget')} />
        </div>
        <div>
          <label className="block text-sm font-medium">Group size</label>
          <input type="number" className="w-full border rounded-xl px-3 py-2" {...register('group_size')} />
        </div>
        <div>
          <label className="block text-sm font-medium">Preferred pace</label>
          <input className="w-full border rounded-xl px-3 py-2" placeholder="Relaxed / Balanced / Fast" {...register('pace')} />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium">Notes</label>
        <textarea rows={3} className="w-full border rounded-xl px-3 py-2" placeholder="Anything else…" {...register('notes')} />
      </div>
      <button className="btn-primary" type="submit" disabled={isSubmitting}>{isSubmitting ? 'Submitting…' : 'Send Enquiry'}</button>
      {submitted && <p className="text-green-700">Thanks! Redirecting…</p>}
    </form>
  );
}

