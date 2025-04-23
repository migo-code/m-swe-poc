'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

type Transformer = {
  id: string;
  serialNumber: string;
  status: string;
  location: string;
  updatedAt: string;
};

export default function TransformerInventory() {
  const [transformers, setTransformers] = useState<Transformer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchInventory() {
      const res = await fetch('/api/inventory');
      const data: Transformer[] = await res.json();
      setTransformers(data);
      setLoading(false);
    }

    fetchInventory();
  }, []);

  if (loading) {
    return <div className="p-4">Loading inventory...</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {transformers.map((transformer) => (
        <Card key={transformer.id}>
          <CardHeader>
            <CardTitle>{transformer.serialNumber}</CardTitle>
            <Badge variant="secondary">{transformer.status}</Badge>
          </CardHeader>
          <CardContent>
            <p>
              <strong>Location:</strong> {transformer.location}
            </p>
            <p className="text-sm text-gray-500">
              Updated: {new Date(transformer.updatedAt).toLocaleString()}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
