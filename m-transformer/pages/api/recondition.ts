import type { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'PUT') {
        const { transformerId, status } = req.body;

        // TODO: integrate with Odoo ERP
        const erpResponse = await updateTransformerStatusInERP(transformerId, status);

        if (erpResponse.success) {
            res.status(200).json({ success: true, status });
        } else {
            res.status(500).json({ success: false, message: erpResponse.error });
        }
    }
}

type ErpResponse = {
    success?: boolean;
    // TODO: break out into success and error use typia for validation in handler above
    error?: boolean;
    transformerId: string;
    status: string;
}
/**
 * Get some response
 * @param transformerId 
 * @param status 
 * @returns 
 */
const updateTransformerStatusInERP = async (transformerId: string, status: string): Promise<ErpResponse> => ({
    success: true,
    transformerId,
    status
});

export default handler;
