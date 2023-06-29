const maskPhoneNumber = (value) => {
    if (!value) return '';
    value = value.replace(/\D/g, '');
    value = value.replace(/^(\d{2})(\d)/g, '($1) $2');
    value = value.replace(/(\d)(\d{4})(\d{1,4})$/, '$1 $2-$3');
    return value;
};

export default maskPhoneNumber;
