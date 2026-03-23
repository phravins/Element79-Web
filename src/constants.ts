import { Product, Batch, CollectionLog } from './types';

export const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Circuitry Mosaic #04',
    category: 'SIM Mosaic Art',
    price: 4250,
    stock: 1,
    sku: 'GV-ART-004',
    description: 'Abstract modern mosaic art made from recycled gold SIM cards. Each piece is a unique arrangement of digital history.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBBJf45jiQJHoE65ZrWDpe9Kic4BiZMqCUbQtdDkUR38kRybBnesDJAHpW-TrF5PdzsZBlzmpdgQ21jOqqyB0v5pNZlOpdYVvsJ-pUwes-uFWuMTgL-ZRoh9cNDs898b_IpC9jkq4BDoy6dtT-vMyd68junIfwBkKb8r4u0BEKmTQf8yqiOSLNQIBqj-LK_YwZcapjSzPTIOltTMg0Fty0fqR-63V0nakmH6eHigJ22z4T-xx2KN_ITT1Qs-n9-N1B3fysYpXMHiZE',
    isUnique: true
  },
  {
    id: '2',
    name: 'Refined Aureate Ring',
    category: 'Jewellery',
    price: 1120,
    stock: 14,
    sku: 'GV-JRE-00912',
    description: 'A masterpiece of sustainable luxury. Hand-cast from 100% recycled gold extracted from high-purity industrial electronics. Features a geometric, brushed finish that honors its digital heritage.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD2aqA7KRGL1oete4-gyy1hb28OklTm2p5bN39_9hRnzM0Jv06lqgW4URN0XVwbuaTGwyme4NL8L4MRrrsoaTH2Dy0g-H63kGyysla38pLV6IOMslIUk7VsLHOQbok29tdGed0sQKtb-Vx6avKzWbi-2XA5aVdbF2zODmcOdEa24N9eXZmCj39Zxi0ZJB5175jkjiaZe9NZnbjeNlj5S9xMXdYLRj-zA-NNoOdXQx7kMmoCQAEnPcYnNvN-Lbg3aANZ_fEgNxidI9Q'
  },
  {
    id: '3',
    name: 'Vault Writing Set',
    category: 'Corporate Gifts',
    price: 850,
    stock: 42,
    sku: 'GV-CORP-088',
    description: 'High-end corporate gift set with black and gold fountain pen. Crafted from reclaimed materials with a premium finish.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB-I_-yt1-9vyP7rphlAb7HeNVmEbLKyRpXiwvhFf36SjZiCIDs2Y_8rDiFNfQI1BBJQoIOacWX__s19USxjCrUzjkjRMdoTXL3gAlOHfwxzjm6vc8NK7t6qTqHDW6mtyvExF_HjMhTQW72TqeoLDV3XFGf_d0ZROAkz2ft1wkIXLlX7U2b-AeLRR-w_kXqURs1hrNOC64k1yLDPheb-i5YjjCDfqMOWQhvlNYu1Dy8GlJOcyk5ZMV1yaw1qBd2PcE5Cdopbp44NEc'
  },
  {
    id: '4',
    name: 'Architectural Plaque',
    category: 'Collectibles',
    price: 2900,
    stock: 3,
    sku: 'GV-COLL-012',
    description: 'Gold plated scale model of a vintage mechanical vault. A stunning piece for any architectural collection.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuABeuWpFyx0jv07wJinuz9P4snlb22nHfyijuO_iVMe5MCmll8INOh0a3e7TDiFs9jZAciCGteq5YFA9NGbaBX4Fwt57chb11F2lfuc--Ou0fIH7NO3EPQEiasmONv3gRTMB7IyotuSO9LuRTOzuN9bVkvaulkniPY8jbVpOko02GQp41k2ZBYpFw4Tx2liZSBrNabrHOHJsSzKwlDp_jfBTfkkLuvxWUK803ta4HyjMFhS7ORfpoK9Yfro9cbg-GvyqgYGvED4tAI'
  }
];

export const MOCK_BATCHS: Batch[] = [
  {
    id: '882-Alpha',
    name: 'Batch #882-Alpha',
    method: 'Acid Recovery Method',
    inputCount: 42,
    estYield: 14.20,
    progress: 68,
    startedAt: '2h 14m ago',
    status: 'processing'
  },
  {
    id: '884-Gamma',
    name: 'Batch #884-Gamma',
    method: 'Electrolytic Refining',
    inputCount: 128,
    estYield: 5.85,
    progress: 12,
    startedAt: '15m ago',
    status: 'processing'
  },
  {
    id: '879-Sigma',
    name: 'Batch #879-Sigma',
    method: 'Manual Plating Method',
    inputCount: 0,
    estYield: 2.44,
    progress: 100,
    startedAt: '05/22/2024',
    status: 'complete'
  },
  {
    id: '875-Delta',
    name: 'Batch #875-Delta',
    method: 'Acid Recovery Method',
    inputCount: 0,
    estYield: 31.10,
    progress: 100,
    startedAt: '05/21/2024',
    status: 'complete'
  }
];

export const MOCK_LOGS: CollectionLog[] = [
  { id: '1', sourceName: 'CyberDyne Systems', sourceType: 'Corporate IT', quantity: 142, date: 'Oct 24, 2023' },
  { id: '2', sourceName: 'Verizon Global Hub', sourceType: 'Telecom', quantity: 3450, date: 'Oct 22, 2023' },
  { id: '3', sourceName: 'E-Recycle Drive SF', sourceType: 'E-waste', quantity: 89, date: 'Oct 19, 2023' },
  { id: '4', sourceName: 'Bulk Lot #442', sourceType: 'Online bulk', quantity: 12100, date: 'Oct 15, 2023' }
];
