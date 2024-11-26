document.addEventListener('DOMContentLoaded', () => {
    const jQuery = $;
    const $subTotal = jQuery('.subtotal-count');

    let productsM = null;

    const calcTotalFromPrice = (products) =>
    {
        const total = products.reduce((total, product) => {
            return total + (product.quantity * product.price);
        }, 0);

        $subTotal.text(total);
    }

    window.addEventListener("message", function({data}){
        const { source } = data;

        if (source === 'changed cart') {
            const { productId } = data;
            const $cartsItem = jQuery('.product-element').data('productId', productId);

            $cartsItem.hide(100);
            calcTotalFromPrice(productsM.filter(({_id}) => _id !== productId))
        }
        else if (source === 'retrieved cart') {
            const { products } = data;

            calcTotalFromPrice(products);

            productsM = products;
        }
    }, false);
});