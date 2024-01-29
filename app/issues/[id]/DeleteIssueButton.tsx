'use client';
import { Spinner } from '@/app/components';
import { Button, Flex } from '@radix-ui/themes';
import { AlertDialog } from '@radix-ui/themes';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const DeleteIssueButton = ({ issueId }: { issueId: number }) => {
  const [error, setError] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      await axios.delete(`/api/issues/${issueId}`);
      router.push('/issues');
      router.refresh();
    } catch (error) {
      setError(true);
      setIsDeleting(false);
    }
  };
  return (
    <>
      <AlertDialog.Root>
        <AlertDialog.Trigger>
          <Button color='red' disabled={isDeleting}>
            Delete Issue
            {isDeleting && <Spinner />}
          </Button>
        </AlertDialog.Trigger>
        <AlertDialog.Content>
          <AlertDialog.Title>Confirm Deletion</AlertDialog.Title>
          <AlertDialog.Description>
            Are you sure to delete the issue? This action can not be undone.
          </AlertDialog.Description>
          <Flex mt='4' gap='4'>
            <AlertDialog.Cancel>
              <Button color='gray' variant='soft'>
                Cancel
              </Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action>
              <Button color='red' onClick={handleDelete}>
                Delete Issue
              </Button>
            </AlertDialog.Action>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>

      <AlertDialog.Root open={error}>
        <AlertDialog.Content>
          <AlertDialog.Title>Error</AlertDialog.Title>
          <AlertDialog.Description mb='4'>
            This issue could not be deleted
          </AlertDialog.Description>
          <Button color='gray' variant='soft' onClick={() => setError(false)}>
            Ok
          </Button>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </>
  );
};
export default DeleteIssueButton;
