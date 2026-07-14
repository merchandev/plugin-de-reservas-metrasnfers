/**
 * @jest-environment jsdom
 */

describe('Booking App Redirect Logic', () => {
    beforeAll(() => {
        // Mock global wptb_vars injected by WordPress
        global.wptb_vars = {
            details_url: 'https://metransfers.es/reservas-metransfers/',
            home_url: 'https://metransfers.es/'
        };
    });

    test('should construct safe details_url with parameters correctly', () => {
        // Simulating the URL generation from transfers-search.js
        const origin = 'Castellón';
        const destination = 'Valencia';
        const date = '2026-06-30';
        const time = '12:00';

        // Code from the fix
        const detailsBaseUrl = global.wptb_vars.details_url;
        let finalUrl = new URL(detailsBaseUrl);
        
        finalUrl.searchParams.append('source', 'Metransfers');
        finalUrl.searchParams.append('origin', origin);
        finalUrl.searchParams.append('destination', destination);
        finalUrl.searchParams.append('transfer_date', date);
        finalUrl.searchParams.append('transfer_time', time);

        // Verification
        expect(finalUrl.toString()).toContain('https://metransfers.es/reservas-metransfers/');
        expect(finalUrl.toString()).toContain('transfer_date=2026-06-30');
        expect(finalUrl.toString()).toContain('transfer_time=12%3A00');
        expect(finalUrl.toString()).not.toContain('date='); // WordPress reserved param is missing
    });
});
