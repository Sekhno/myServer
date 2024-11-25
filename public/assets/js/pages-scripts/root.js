document.addEventListener('DOMContentLoaded', () => {
    // $(window).on('load', function () {
    //     setTimeout(function () {
    //         $('#exampleModal').modal('show');
    //     }, 2500);
    // });
    setTimeout(retrieveCartData);

    const jQuery = $;
    const $cartContainer = jQuery('#cart-container');
    const $countBadge = $cartContainer.find('.cart_qty_cls');
    const $media = $cartContainer.find('li:first');
    const $total = $cartContainer.find('.total');

    jQuery('.logout').on('click', function (e) {
        e.preventDefault();
        fetch('/account/logout', {
            method: 'POST',
            credentials: 'include'
        }).then(function (response) {
            console.log(response)
        })

    });

    const TARGET = '[data-bs-target]';
    const KEY_TARGET = 'bs-target';

    jQuery(document).on('click',TARGET, function(e) {
        if (jQuery(this).data(KEY_TARGET) === '#addtocart') {
            const id = jQuery(this).data('product-id');

            fetch('/api/v1/product/cart', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id })
            }).then(retrieveCartData);
        }
    })



    function openSearch() {
        document.getElementById("search-overlay").style.display = "block";
    }

    function closeSearch() {
        document.getElementById("search-overlay").style.display = "none";
    }

    function removeProductFromCart(id) {
        return fetch('/api/v1/product/cart', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({id})
        })
    }

    function retrieveCartData() {
        fetch('/api/v1/product/cart', {
            method: 'GET'
        }).then(async function (response) {
            if (!response.ok) {
                const error = await response.json()
                throw new Error(error.message)
            }

            return response.json();
        }).then(({cart, products}) => {
            console.log('->', cart, products);

            $cartContainer.find('.is-cloned').remove()

            if (cart && cart.length) {
                let total = 0;
                $countBadge.text(cart.length);

                cart.forEach(({quantity, productId}, i) => {
                    const {name, price, images, currency} = products.find(({_id}) => productId === _id)
                    const $clone = $media.clone();

                    console.log('$media',$media);
                    console.log('$clone',$clone)

                    $clone.addClass('is-cloned')
                    $clone.find('img').attr('src', images[0] + '?im=Resize,width=120');
                    $clone.find('.media-body > a > h4').text(name);
                    $clone.find('.media-body > h4 > span').text(`${quantity} x ${price} ${currency}`);
                    $clone.find('.close-circle > a').on('click', async function(e) {
                        e.preventDefault();

                        await removeProductFromCart(productId);

                        $clone.hide(100);
                        cart.splice(i, 1);
                        $countBadge.text(cart.length);

                        if (!cart.length) {
                            $countBadge.hide();
                            $cartContainer.find('ul').hide();
                        }
                    })
                    $clone.show();

                    $media.after($clone);
                    total += quantity*price;
                });

                $total.find('span').text(`${total}`);
                $media.hide();
                $countBadge.show();
                $cartContainer.find('ul').show();
            }
            else {
                $countBadge.hide();
                $cartContainer.find('ul').hide();
            }
        }).catch((e) => {
            console.error(e)
        })
    }
})