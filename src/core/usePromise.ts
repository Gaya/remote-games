import { useState } from 'react';

interface PromiseState<T> {
  isResolved: boolean;
  error?: Error;
  value?: T;
}

function usePromise<T>(p: Promise<T>): PromiseState<T> {
  const [value, setValue] = useState<T>();
  const [error, setError] = useState<Error>();

  p.then(setValue).catch(setError);

  return {
    isResolved: Boolean(typeof value !== 'undefined' || typeof error !== 'undefined'),
    error,
    value,
  };
}

export default usePromise;
