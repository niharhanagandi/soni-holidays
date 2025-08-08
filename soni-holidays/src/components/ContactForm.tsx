'use client';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().regex(/^\+?91[\s-]?\d{10}$|^\+?\d{10,}$/i, 'Enter a valid phone (India)') ,
  travelDates: z.string().optional(),
  groupType: z.enum(['Students','Corporate','Family']),
  destinations: z.string(),
  message: z.string().min(5),
});

type FormData = z.infer<typeof schema>;

export default function ContactForm() {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting, isSubmitSuccessful } } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    const res = await fetch('/.netlify/functions/submitContact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...data, source: 'contact' }) });
    if (res.ok) reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid md:grid-cols-2 gap-4">
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
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium">Phone (+91)</label>
          <input className="w-full border rounded-xl px-3 py-2" placeholder="+91 7892353175" {...register('phone')} />
          {errors.phone && <p className="text-sm text-red-600">{errors.phone.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium">Travel dates</label>
          <input className="w-full border rounded-xl px-3 py-2" placeholder="e.g. Oct 2025" {...register('travelDates')} />
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium">Group Type</label>
          <select className="w-full border rounded-xl px-3 py-2" {...register('groupType')}>
            <option>Students</option>
            <option>Corporate</option>
            <option>Family</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium">Destination(s)</label>
          <input className="w-full border rounded-xl px-3 py-2" placeholder="Manali, Dubai..." {...register('destinations')} />
          {errors.destinations && <p className="text-sm text-red-600">{errors.destinations.message}</p>}
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium">Message</label>
        <textarea className="w-full border rounded-xl px-3 py-2" rows={4} {...register('message')} />
        {errors.message && <p className="text-sm text-red-600">{errors.message.message}</p>}
      </div>
      <button className="btn-primary" type="submit" disabled={isSubmitting}>{isSubmitting ? 'Submitting…' : 'Submit Enquiry'}</button>
      {isSubmitSuccessful && <p className="text-green-700">Thank you! We will contact you shortly.</p>}
    </form>
  );
}