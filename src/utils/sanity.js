// src/utils/sanity.js
import { createClient } from '@sanity/client';

export const client = createClient({
  projectId: 'iobrkiqk',
  dataset: 'production',
  apiVersion: '2024-05-11', 
  useCdn: true 
});
