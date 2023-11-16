export const addresstypeenumArray = [
    'Shipping',
    'Billing',
    'Contact',
    'Headquarter',
    'Other',
    'Warehouse',
];

type addresstypeenum = (typeof addresstypeenumArray)[number];

export default addresstypeenum;
