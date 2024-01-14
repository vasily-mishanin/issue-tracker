'use client';
import { Button, TextArea, TextField, Callout, Text } from '@radix-ui/themes';
import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { createIssueSchema } from '@/app/validationSchemas';
import { z } from 'zod';
type IssueForm = z.infer<typeof createIssueSchema>;

// interface IssueForm {
//   title: string;
//   description: string;
// }

function NewIssuePage() {
  const router = useRouter();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueForm>({
    resolver: zodResolver(createIssueSchema),
  });
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
        {errors.title && (
          <Text as='p' color='red'>
            {errors.title.message}
          </Text>
        )}
        {/* <TextArea placeholder='Description' /> */}
        {/* To grab input from third party component */}
        <Controller
          name='description'
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder='Description' {...field} /> // field is a one field from 'register(name)' object
          )}
        />
        {errors.description && (
          <Text as='p' color='red'>
            {errors.description.message}
          </Text>
        )}

        <Button>Submit new issue</Button>
      </form>
    </div>
  );
}
export default NewIssuePage;
