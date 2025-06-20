import {Loader} from 'lucide-react';

const Loading = ()=>{
        return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="flex flex-col items-center gap-4 p-8 bg-white rounded-lg shadow-md">
          <Loader className="animate-spin text-indigo-600 w-8 h-8" />
          <p className="text-gray-600">Loading data...</p>
        </div>
      </div>
    );
}

export default Loading;