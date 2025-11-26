const currency = 'CAD'
const formatterCache = {}

export function formatCurrency(amount, locale = 'en-CA') {
    const cacheKey = `${locale}:${currency}`
    if (!formatterCache[cacheKey]) {
        formatterCache[cacheKey] = new Intl.NumberFormat(locale, { style: 'currency', currency })
    }
    return formatterCache[cacheKey].format(amount ?? 0)
}
