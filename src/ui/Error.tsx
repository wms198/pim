import { Button } from './Button';
import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { PostgrestError } from '@supabase/supabase-js';

export const Error: React.FC<{ error: PostgrestError, clearFilters: ()=>void }> = ({error, clearFilters}) => {
  if(!error)
    return
  return (
    <>
      <div className="min-h-screen bg-gray-50 flex flex-col items-center px-4 sm:px-6 lg:px-8">
        <div className="text-center">
            <h2 className="text-2xl font-semibold text-gray-700 mt-4 mb-8">
                 Error Code: {error.code}
            </h2>
            <p className="text-gray-600  mb-8 max-w-md mx-auto">
                Message: {error.message}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                <Button onClick={() => clearFilters()} variant="outline" icon={<ArrowLeft className="h-5 w-5" />}>
                    go Back 
                </Button>
            </div>
        </div>
      </div>
    </>
  );
};