/**
 * ALTERNATIVE WIX SOLUTION - Simpler Approach
 * 
 * This uses Wix's HTML component properties instead of postMessage
 * 
 * Instructions:
 * 1. In Wix Editor, click on your HTML embed element
 * 2. Look at the Properties Panel (usually on right side)
 * 3. Find the HTML component ID (e.g., 'html1')
 * 4. Go to Page Code and add this:
 */

import wixLocation from 'wix-location';

$w.onReady(function () {
    const query = wixLocation.query;
    
    // Replace 'html1' with your actual HTML component ID
    if (query.teacher) {
        // Set a custom attribute that the iframe can read
        $w('#html1').src = `https://umairrafiq-wixsite-com.filesusr.com/html/your-file.html?teacher=${query.teacher}`;
    }
});

/**
 * OR - Even Simpler: Use Wix's URL Parameter Pass-through
 * 
 * 1. Edit your HTML component
 * 2. In the HTML Settings, use this for the source:
 *    Add query parameter support by checking "Enable URL Parameters"
 * 
 * Then Wix will automatically append URL parameters to your iframe
 */
