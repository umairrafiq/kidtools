# Wix Integration Guide - Teacher Parameter

Based on your console logs, the HTML is embedded in an iframe and cannot access parent URL parameters due to cross-origin restrictions. Here are **3 solutions** from easiest to most advanced:

---

## ✅ Solution 1: Direct URL in HTML Component Settings (EASIEST)

This is the simplest solution if Wix allows it.

### Steps:
1. In Wix Editor, click on your HTML embed element
2. In the Properties Panel, find the **Source URL** or **HTML Settings**
3. Look for an option to **"Add query parameters"** or **"Pass URL parameters"**
4. Enable this option
5. Wix will automatically append `?teacher=MsSanam` to your iframe URL

### Test:
Visit: `https://umairrafiq.wixsite.com/kidtools?teacher=MsSanam`

The iframe should receive: `https://umairrafiq-wixsite-com.filesusr.com/html/...html?teacher=MsSanam`

---

## ✅ Solution 2: Wix Page Code with postMessage (RECOMMENDED)

This solution was just added to your code. It uses postMessage to communicate between Wix and the iframe.

### Steps:

#### A. Update Your Wix Page Code:

1. In Wix Editor, go to **Dev Mode** (or click the `</>` icon)
2. Open **Page Code** for the page with your HTML component
3. Add this code (also saved in `wix-page-code.js`):

```javascript
import wixLocation from 'wix-location';

$w.onReady(function () {
    console.log('Wix page ready - setting up iframe communication');
    
    // IMPORTANT: Replace 'html1' with your actual HTML component ID
    const htmlComponent = $w('#html1');
    
    // Get URL query parameters
    const query = wixLocation.query;
    console.log('Page URL query params:', query);
    
    if (query.teacher) {
        console.log('Found teacher parameter:', query.teacher);
        
        // Listen for requests from iframe
        htmlComponent.onMessage((event) => {
            console.log('Received message from iframe:', event.data);
            
            if (event.data && event.data.action === 'getUrlData') {
                console.log('Sending teacher parameter to iframe:', query.teacher);
                htmlComponent.postMessage({
                    teacher: query.teacher
                });
            }
        });
        
        // Also send immediately (in case iframe is already loaded)
        setTimeout(() => {
            console.log('Sending teacher parameter to iframe (delayed):', query.teacher);
            htmlComponent.postMessage({
                teacher: query.teacher
            });
        }, 1000);
    }
});
```

#### B. Find Your HTML Component ID:
1. Click on your HTML embed element in Wix
2. Look at the Properties Panel (usually right side)
3. Find the ID (e.g., `html1`, `html2`, etc.)
4. Replace `#html1` in the code above with your actual ID

#### C. Your HTML already has the listener code (just added)
- The `index.html` now listens for postMessage
- It will automatically update when it receives the teacher parameter

### Test:
1. Publish your Wix site
2. Visit: `https://umairrafiq.wixsite.com/kidtools?teacher=MsSanam`
3. Open browser console (F12)
4. You should see logs about postMessage communication
5. The teacher banner should appear

---

## ✅ Solution 3: Manual URL Construction (FALLBACK)

If Solutions 1 & 2 don't work, manually construct the iframe URL.

### Steps:

1. In Wix Page Code:

```javascript
import wixLocation from 'wix-location';

$w.onReady(function () {
    const query = wixLocation.query;
    
    if (query.teacher) {
        // Get your iframe URL
        const baseUrl = 'https://umairrafiq-wixsite-com.filesusr.com/html/e14006_70221c0286bd21184e9992d32ac07670.html';
        
        // Add teacher parameter
        const newUrl = `${baseUrl}?teacher=${encodeURIComponent(query.teacher)}`;
        
        // Update HTML component (replace 'html1' with your ID)
        $w('#html1').src = newUrl;
    }
});
```

---

## 🧪 Testing

### Check Console Logs:

When visiting `https://umairrafiq.wixsite.com/kidtools?teacher=MsSanam`, you should see:

**Wix Page Console:**
```
Wix page ready - setting up iframe communication
Page URL query params: {teacher: "MsSanam"}
Found teacher parameter: MsSanam
Sending teacher parameter to iframe: MsSanam
```

**Iframe Console (your app):**
```
=== Checking for teacher parameter ===
Requesting URL data from parent window...
Received postMessage: {teacher: "MsSanam"}
✓ Teacher from postMessage: MsSanam
Teacher banner updated with: MsSanam
```

---

## 🔍 Troubleshooting

### Issue: "Cannot find HTML component"
**Solution:** Check the HTML component ID in Wix
- Click the HTML element
- Look at Properties Panel
- Use the exact ID (e.g., `#html1`, `#customHtml1`)

### Issue: "postMessage not working"
**Solution:** Check timing
- The iframe might load before the page code runs
- The delayed `setTimeout` in the code handles this
- Try increasing the timeout from 1000ms to 2000ms

### Issue: "No logs appear"
**Solution:** Enable Developer Mode in Wix
1. In Wix Editor, enable Dev Mode
2. Add the page code
3. Preview the site (not just editor preview)
4. Open console in the preview

---

## 📝 Current Status

Your `index.html` now has:
- ✅ postMessage listener (Solution 2)
- ✅ Enhanced logging for debugging
- ✅ Support for multiple teacher parameter sources
- ✅ Dynamic teacher banner update

You need to add:
- [ ] Wix Page Code (choose Solution 1, 2, or 3)

---

## 🎯 Recommended Next Steps

1. **Try Solution 1 first** (simplest)
   - Look for "Pass URL parameters" option in HTML component settings

2. **If Solution 1 doesn't exist, use Solution 2**
   - Add the page code to your Wix page
   - Find your HTML component ID
   - Test with console logs

3. **Update and test**
   - Publish your Wix site
   - Visit: `https://umairrafiq.wixsite.com/kidtools?teacher=MsSanam`
   - Check console for logs

---

## 📚 Additional Resources

- Wix HTML Component: https://www.wix.com/velo/reference/$w/htmlcomponent
- postMessage API: https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage
- Wix Location (query params): https://www.wix.com/velo/reference/wix-location

---

**Need help?** Check the console logs for detailed debugging information!
