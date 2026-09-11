export const getDataFormat = (ISODate) => {
    return ISODate.split('T')[0].split('-').join('/')
}