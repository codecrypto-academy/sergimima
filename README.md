# Blockchain E-commerce Platform

A decentralized e-commerce platform built on Polygon that handles companies, products, invoices and customers using smart contracts and ERC20 tokens.

## Core Features

### Entities

- **Company**
  - Address (Ethereum)
  - Name

- **Product**
  - Company Address
  - ID
  - Name
  - Price
  - Image (IPFS)

- **Invoice**
  - Company Address
  - Number
  - Date
  - Customer Address
  - Total Amount

- **Customer**
  - Company Address
  - Customer Address
  - Total Purchases

### Key Functionalities

1. Company registration
2. Product management
3. Company product listing
4. IPFS product image storage
5. Shopping cart implementation
6. Payment processing
7. EURO token (Stablecoin) creation
8. Credit card to token conversion
9. Token withdrawal
10. Transaction history (Products, Invoices)

## Technical Stack

- **Smart Contracts**: Solidity (Truffle/Hardhat/Remix)
- **Frontend**: React (Vite) or Next.js
- **Backend**: Node.js or Next.js API routes
- **Storage**: IPFS for product images
- **Payment Gateway**: Stripe integration
- **Token**: Custom ERC20 implementation

## Payment Flow

1. Customer purchases tokens using Stripe (EUR)
2. Transactions are processed using the platform's ERC20 token
3. Token holders can withdraw EUR through Stripe
4. System accounts for:
   - Stripe entry/exit fees
   - Network gas costs

## Architecture

- Decentralized storage with IPFS
- Smart contract-based business logic
- Web3 integration for blockchain interactions
- Stripe API integration for fiat operations

## Security Considerations

- Smart contract auditing
- Secure payment processing
- Token economics
- Access control mechanisms

## Development Setup

