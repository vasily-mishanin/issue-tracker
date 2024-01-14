'use client';
import { Button, TextArea, TextField } from '@radix-ui/themes';
import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';

function NewIssuePage() {
  return (
    <div className='max-w-xl space-y-3'>
      <TextField.Root>
        <TextField.Input placeholder='Title' />
      </TextField.Root>
      {/* <TextArea placeholder='Description' /> */}
      <SimpleMDE />
      <Button>Submit new issue</Button>
    </div>
  );
}
export default NewIssuePage;
