'use client';
import { Button, TextArea, TextField, Callout } from '@radix-ui/themes';
import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface IssueForm {
  title: string;
  description: string;
}

function NewIssuePage() {
  const router = useRouter();
  const { register, control, handleSubmit } = useForm<IssueForm>();
  const [error, setError] = useState('');

  return (
    <div className='max-w-xl'>
      {error && (
        <Callout.Root color='red' className='mb-2'>
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form
        className='space-y-3'
        onSubmit={handleSubmit(async (data) => {
          try {
            await axios.post('/api/issues', data);
            router.push('/issues');
          } catch (error) {
            console.log(error);
            setError('An unexpected error occured');
          }
        })}
      >
        <TextField.Root>
          <TextField.Input placeholder='Title' {...register('title')} />
        </TextField.Root>
        {/* <TextArea placeholder='Description' /> */}
        {/* To grab input from third party component */}
        <Controller
          name='description'
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder='Description' {...field} /> // field is a one field from 'register(name)' object
          )}
        />

        <Button>Submit new issue</Button>
      </form>
    </div>
  );
}
export default NewIssuePage;
