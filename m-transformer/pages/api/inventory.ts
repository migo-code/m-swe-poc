import type { NextApiRequest, NextApiResponse } from 'next';

type Transformer = {
    id: string;
    serialNumber: string;
    status: 'purchased' | 'in_reconditioning' | 'refurbished' | 'sold';
    location: string;
    updatedAt: string;
};

// Stubbed transformer data (SQL).
const transformers: Transformer[] = [
    {
        id: '1',
        serialNumber: 'TX-001',
        status: 'refurbished',
        location: 'Warehouse A',
        updatedAt: new Date().toISOString(),
    },
    {
        id: '2',
        serialNumber: 'TX-002',
        status: 'in_reconditioning',
        location: 'Workshop B',
        updatedAt: new Date().toISOString(),
    },
    {
        id: '3',
        serialNumber: 'TX-003',
        status: 'purchased',
        location: 'Receiving Dock',
        updatedAt: new Date().toISOString(),
    },
];

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'GET') {
        const { status } = req.query;

        // NOTE: Filter by status if query param provided
        const filteredTransformers = status
            ? transformers.filter((t) => t.status === status)
            : transformers;

        res.status(200).json(filteredTransformers);
    }
}

export default handler;
