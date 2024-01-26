'use client';
import dynamic from 'next/dynamic'; // for lazy loading
//import SimpleMDE from 'react-simplemde-editor';
import { Button, TextArea, TextField, Callout, Text } from '@radix-ui/themes';
import 'easymde/dist/easymde.min.css';
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { createIssueSchema } from '@/app/validationSchemas';
import { z } from 'zod';
import ErrorMessage from '@/app/components/ErrorMessage';
import Spinner from '@/app/components/Spinner';
import { Issue } from '@prisma/client';
type IssueFormData = z.infer<typeof createIssueSchema>;

const SimpleMDE = dynamic(() => import('react-simplemde-editor'));

function IssueForm({ issue }: { issue?: Issue }) {
  const router = useRouter();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueFormData>({
    resolver: zodResolver(createIssueSchema),
  });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // we also can move this code into separate service like "createIssue(data)"
  const onSubmit = handleSubmit(async (data) => {
    try {
      setIsSubmitting(true);
      if (issue) {
        await axios.patch(`/api/issues/${issue.id}`, data);
      } else {
        await axios.post('/api/issues', data);
      }
      setIsSubmitting(false);
      router.push(`/issues`);
      router.refresh(); // disables 30 seconds default cache
    } catch (error) {
      setIsSubmitting(false);
      console.log(error);
      setError('An unexpected error occured');
    }
  });

  return (
    <div className='max-w-xl'>
      {error && (
        <Callout.Root color='red' className='mb-2'>
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form className='space-y-3' onSubmit={onSubmit}>
        <TextField.Root>
          <TextField.Input
            defaultValue={issue?.title}
            placeholder='Title'
            {...register('title')}
          />
        </TextField.Root>
        {errors.title && <ErrorMessage>{errors?.title.message}</ErrorMessage>}
        {/* <TextArea placeholder='Description' /> */}
        {/* To grab input from third party component (SimpleMDE) use Controller */}
        <Controller
          name='description'
          defaultValue={issue?.description}
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder='Description' {...field} /> // field is a one field from 'register(name)' object
          )}
        />
        {errors.description && (
          <ErrorMessage>{errors?.description.message}</ErrorMessage>
        )}

        <Button disabled={isSubmitting}>
          {issue ? 'Update issue' : 'Submit new issue'}{' '}
          {isSubmitting && <Spinner />}
        </Button>
      </form>
    </div>
  );
}
export default IssueForm;
