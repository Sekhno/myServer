document.addEventListener('DOMContentLoaded', () => {
    const jQuery = $;
    const $cartTotal = jQuery('.cart-total');

    let _productsM = null;

    const calcTotalFromPrice = (products) =>
    {
        if (!products.length) return $cartTotal.text('0.00');

        const total = products.reduce((total, product) => {
            return total + (product.quantity * product.price);
        }, 0);
        const { currency } = products.find((v) => v.currency);

        $cartTotal.text(currency ? `${total} ${currency}` : '0.00');
    }

    jQuery('.ti-close').on('click', function()
    {
        const $tBody = jQuery(this).parents('tbody');
        const productId = $tBody.data('product-id');
        const productIndex = _productsM.findIndex(({_id}) => _id === productId);

        _productsM.splice(productIndex, 1);

        calcTotalFromPrice(_productsM);

        postMessage({productId, source: 'changed cart from cart page'}, location.origin);
    });

    jQuery('.input-number').on('change', function()
    {
        const value = jQuery(this).val();
        const $tBody = jQuery(this).parents('tbody');
        const $subTotal = jQuery('.sub-total');
        const curTotal = $subTotal.text();
        const productId = $tBody.data('product-id');
        const product = _productsM.find(({_id}) => _id === productId);

        product.quantity = value;
        $subTotal.text(curTotal.replace(/\d+/, product.price*value));
        calcTotalFromPrice(_productsM);
    });

    window.addEventListener("message", ({data}) =>
    {
        const { source } = data;

        if (source === 'changed cart') {
            const { productId } = data;
            const $cartsItem = jQuery('tbody').data('productId', productId);

            $cartsItem.hide(100);
            calcTotalFromPrice(_productsM.filter(({_id}) => _id !== productId))
        }
        else if (source === 'retrieved cart') {
            const { products } = data;

            calcTotalFromPrice(products);

            _productsM = products;
        }
    }, false);
});