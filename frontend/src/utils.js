export const getCurrencySymbol = country => {
    const currencies = {
        gb: '£',
        us: '$',
        au: '$',
        ca: '$',
    };
    return currencies[country];
}

//extract data from a form and convert into an object
export const extractFormData = form => Array
    .from(form.elements)
    .reduce((acc, { id, value }) => ({ [id]: value, ...acc }), {});