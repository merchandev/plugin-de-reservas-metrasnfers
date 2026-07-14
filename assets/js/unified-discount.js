jQuery(document).ready(function ($) {
    if (typeof cbp_vars === 'undefined') return;

    // 1. Visual Feedback
    const discount = parseFloat(cbp_vars.discount_percent);

    // Observer to watch for price updates in the booking form
    const targetNode = document.getElementById('wptb-step-2'); // or specific price element container
    if (targetNode) {
        const observer = new MutationObserver(function (mutationsList) {
            for (let mutation of mutationsList) {
                if (mutation.type === 'attributes' && $(mutation.target).is(':visible')) {
                    updatePriceDisplay();
                }
            }
        });

        const appNode = document.getElementById('wptb-booking-app');
        if (appNode) {
            observer.observe(appNode, { attributes: true, subtree: true, childList: true });
        }

        // Also direct check on step transition
        // The original plugin does $('#wptb-step-2').fadeIn(300);

        // We can hook into the button click that triggers calculation?
        $('#wptb-search-form').on('submit', function () {
            // Wait for calculation (it's async google maps)
            // We can't easily wait for the other plugin's callback.
            // Using MutationObserver on the #summary-price text change is best.
        });

        const priceObserver = new MutationObserver(function (mutations) {
            mutations.forEach(function (mutation) {
                if (mutation.target.id === 'summary-price') {
                    // Check if we already appended
                    if ($(mutation.target).text().indexOf('OFF') === -1) {
                        applyDiscountVisuals();
                    }
                }
            });
        });

        const priceEl = document.getElementById('summary-price');
        if (priceEl) {
            priceObserver.observe(priceEl, { childList: true, characterData: true, subtree: true });
        }
    }

    function updatePriceDisplay() {
        // Fallback checks
        setTimeout(applyDiscountVisuals, 500);
    }

    function applyDiscountVisuals() {
        const $priceEl = $('#summary-price');
        const text = $priceEl.text(); // e.g. "€100.00"

        // Extract number
        const priceVal = parseFloat(text.replace(/[^\d.]/g, ''));

        if (!isNaN(priceVal) && priceVal > 0) {
            // Apply Discount Logic
            const discounted = (priceVal * (1 - discount / 100)).toFixed(2);

            // 1. Update UI
            // 1. Update UI
            let hotelName = cbp_vars.hotel_name || 'Partner';

            $priceEl.html(
                '<div style="display: flex; flex-direction: column; align-items: flex-start; line-height: 1.2;">' +
                '<div style="font-size: 2em; color: #27ae60; font-weight: 800; margin-bottom: 2px;">€' + discounted + '</div>' +
                '<div style="display: flex; align-items: center; gap: 8px; font-size: 0.9em; margin-bottom: 4px;">' +
                '<span style="text-decoration: line-through; color: #999;">€' + priceVal.toFixed(2) + '</span>' +
                '<span style="background: #e74c3c; color: white; padding: 2px 8px; border-radius: 4px; font-weight: 700; font-size: 0.9em;">-' + discount + '%</span>' +
                '</div>' +
                '<div style="font-size: 0.85em; color: #e67e22; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;">' +
                '<span class="dashicons dashicons-tag" style="font-size: 1.1em; width: auto; height: auto; vertical-align: text-bottom;"></span> Oferta ' + hotelName +
                '</div>' +
                '</div>'
            );

            // 2. Add Notice
            // hotelName is already defined above
            if ($('#cbp-discount-notice').length === 0) {
                $('#wptb-step-2').find('h3').after('<div id="cbp-discount-notice" style="background:#d4edda; color:#155724; padding:10px; border-radius:5px; margin-bottom:15px; text-align:center;">🎉 Descuento de <b>' + hotelName + '</b> aplicado: ' + discount + '%</div>');
            }

            // 3. PERSIST TO SESSION STORAGE (Critical for Payment)
            const savedData = sessionStorage.getItem('wptb_booking_data');
            if (savedData) {
                try {
                    let data = JSON.parse(savedData);

                    // Only update if not already discounted or if price changed
                    if (parseFloat(data.price) !== parseFloat(discounted)) {
                        console.log('CBP: Updating Price in SessionStorage', data.price, '->', discounted);

                        data.original_price = priceVal;
                        data.discount_percent = discount;
                        data.price = discounted; // This is what Stripe will see/charge (visually at least)

                        // Persist Token for Server Validation
                        if (cbp_vars.hotel_token) {
                            data.hotel_token = cbp_vars.hotel_token;
                        }

                        sessionStorage.setItem('wptb_booking_data', JSON.stringify(data));
                    }
                } catch (e) { console.error('CBP error updating session', e); }
            }

            // Update Summary Sidebar if present (Payment Screen)
            $('#payment-discount-row').show();
            $('#payment-discount-val').text(discount + '%');

            // If on Payment Page, also update totals
            if ($('#payment-price').length > 0) {
                $('#payment-original-row').show();
                $('#payment-original-price').text('€' + priceVal.toFixed(2));
                $('#payment-price').text('€' + discounted);
                $('#button-amount').text(discounted);
            }
        }
    }

    // Initial run in case we land on a page with price already
    applyDiscountVisuals();

});
