'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Form } from '@/types';
import { useAuth } from '@clerk/nextjs';

const SubmissionsPage = () => {
  const [forms, setForms] = useState<Form[]>([]);

  const { userId } = useAuth();

  useEffect(() => {
    const fetchForms = async () => {
      const res = await axios.get('/api/forms');
      setForms(res.data);
    };

    console.log(userId);

    fetchForms();
  }, []);

  return (
    <div>
      <h1 className='font-semibold text-4xl'>Your Submissions</h1>
      {forms.length > 0 ? (
        <ul>
          {forms.map((form) => (
            <li key={form.id}>
              {form.name} - {form.status}
            </li>
          ))}
        </ul>
      ) : (
        <p>No submissions yet.</p>
      )}
    </div>
  );
};

export default SubmissionsPage;
