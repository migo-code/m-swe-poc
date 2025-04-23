# m poc
Demonstration of transformer recondition workflow

## Summary
### Purchase and Reconditioning
``` mermaid
    sequenceDiagram
        participant Employee
        participant Frontend
        participant Backend API
        participant Odoo ERP

        Employee ->> Frontend: Initiate transformer reconditioning workflow
        Frontend ->> Backend API: POST /api/recondition { transformerId, status }
        Backend API ->> Odoo ERP: Update inventory status to 'in_reconditioning'
        Odoo ERP -->> Backend API: Status updated confirmation
        Backend API -->> Frontend: Display updated status
        Frontend -->> Employee: Status confirmed

        Employee ->> Frontend: Mark transformer reconditioning complete
        Frontend ->> Backend API: PUT /api/recondition { transformerId, status: 'refurbished' }
        Backend API ->> Odoo ERP: Update inventory status to 'refurbished'
        Odoo ERP -->> Backend API: Status updated
        Backend API -->> Frontend: Confirm completion
```

``` mermaid
    graph TD
        Employee[Internal Employee] --> Frontend[Next.js + shadcn/ui]
        Frontend --> API[Backend API - Next.js + TypeScript]
        API --> ERP[Odoo ERP Integration]
        API --> DB[(PostgreSQL - Transformer Inventory and Status)]
```

## Database Schema
``` sql
CREATE TABLE transformers (
    id UUID PRIMARY KEY,
    serial_number VARCHAR(100) NOT NULL,
    status VARCHAR(50), -- 'purchased', 'in_reconditioning', 'refurbished', 'sold'
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```