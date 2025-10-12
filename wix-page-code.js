/**
 * WIX PAGE CODE - Add this to your Wix page
 * 
 * Instructions:
 * 1. In Wix Editor, click on your HTML embed element
 * 2. Go to the page's code panel (usually bottom of editor)
 * 3. Paste this code in the page code section
 * 4. Save and publish
 */

import wixLocation from 'wix-location';

$w.onReady(function () {
    console.log('Wix page ready - setting up iframe communication');
    
    // Get the HTML iframe element
    // Replace 'html1' with your actual HTML component ID
    const htmlComponent = $w('#html1');
    
    // Get URL query parameters
    const query = wixLocation.query;
    console.log('Page URL query params:', query);
    
    // If teacher parameter exists, send it to the iframe
    if (query.teacher) {
        console.log('Found teacher parameter:', query.teacher);
        
        // Send message to iframe when it loads
        htmlComponent.onMessage((event) => {
            console.log('Received message from iframe:', event.data);
            
            if (event.data && event.data.action === 'getUrlData') {
                console.log('Sending teacher parameter to iframe:', query.teacher);
                htmlComponent.postMessage({
                    teacher: query.teacher
                });
            }
        });
        
        // Also try sending immediately (in case iframe is already loaded)
        setTimeout(() => {
            console.log('Sending teacher parameter to iframe (delayed):', query.teacher);
            htmlComponent.postMessage({
                teacher: query.teacher
            });
        }, 1000);
    }
});
