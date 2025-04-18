import React, { Suspense } from 'react';
import { RouterProvider } from 'react-router-dom';
import routes from './router/index.jsx';

export default function App() {
  return (
    <Suspense fallback={<div>loading...</div>}>
      <RouterProvider router={routes} />
    </Suspense>
  );
}
