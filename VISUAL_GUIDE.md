# Visual Guide: How Teacher Parameter Flows in Wix

## Current Situation (Not Working)

```
User visits:
https://umairrafiq.wixsite.com/kidtools?teacher=MsSanam
            ↓
    [Wix Page]
    Has: ?teacher=MsSanam
            ↓
    [HTML iframe Element] ← Cross-origin restriction! Cannot access parent URL
    URL: https://umairrafiq-wixsite-com.filesusr.com/html/e14006_....html
    Has: (no parameters) ❌
            ↓
    [Your KidTools App]
    Teacher: undefined ❌
```

---

## Solution 1: URL Pass-through (Simplest)

```
User visits:
https://umairrafiq.wixsite.com/kidtools?teacher=MsSanam
            ↓
    [Wix Page]
    Has: ?teacher=MsSanam
            ↓
    [HTML Component Settings] ← Enable "Pass URL parameters"
            ↓
    [HTML iframe Element]
    URL: https://umairrafiq-wixsite-com.filesusr.com/html/e14006_....html?teacher=MsSanam ✓
            ↓
    [Your KidTools App]
    Teacher: "MsSanam" ✓
```

**How to enable:**
1. Click HTML component in Wix Editor
2. Look for Settings/Properties
3. Find "Pass URL parameters" or similar option
4. Enable it

---

## Solution 2: postMessage (Recommended - Already Implemented!)

```
User visits:
https://umairrafiq.wixsite.com/kidtools?teacher=MsSanam
            ↓
    [Wix Page Code]
    1. Reads: query.teacher = "MsSanam"
    2. Gets HTML component: $w('#html1')
            ↓
    [postMessage Communication] ←→ [Both directions!]
            ↓                              ↓
    [Wix Page]                    [HTML iframe]
    Sends:                        Receives:
    {teacher: "MsSanam"}         {teacher: "MsSanam"} ✓
            ↓
    [Your KidTools App]
    Teacher: "MsSanam" ✓
    Updates banner! ✓
```

**Required Code:**

**Wix Page Code:**
```javascript
import wixLocation from 'wix-location';

$w.onReady(function () {
    const htmlComponent = $w('#html1'); // Your HTML component ID
    const query = wixLocation.query;
    
    if (query.teacher) {
        // Send to iframe
        htmlComponent.postMessage({
            teacher: query.teacher
        });
    }
});
```

**Your HTML (Already Added!):**
```javascript
window.addEventListener('message', function(event) {
    if (event.data && event.data.teacher) {
        teacherName = event.data.teacher;
        updateTeacherDisplay(); // Shows banner
    }
});
```

---

## Solution 3: Manual URL Construction

```
User visits:
https://umairrafiq.wixsite.com/kidtools?teacher=MsSanam
            ↓
    [Wix Page Code]
    1. Reads: query.teacher = "MsSanam"
    2. Constructs new URL with parameter
    3. Updates iframe src
            ↓
    [HTML iframe Element]
    URL: https://umairrafiq-wixsite-com.filesusr.com/html/e14006_....html?teacher=MsSanam ✓
            ↓
    [Your KidTools App]
    Teacher: "MsSanam" ✓
```

**Code:**
```javascript
$w.onReady(function () {
    const query = wixLocation.query;
    if (query.teacher) {
        const baseUrl = 'https://umairrafiq-wixsite-com.filesusr.com/html/e14006_....html';
        $w('#html1').src = `${baseUrl}?teacher=${query.teacher}`;
    }
});
```

---

## What to Do Next

### Step 1: Choose Your Solution
- **Solution 1** = Easiest (if Wix allows)
- **Solution 2** = Most reliable (recommended)
- **Solution 3** = Fallback

### Step 2: For Solution 2 (Recommended):

#### A. Find Your HTML Component ID
```
1. In Wix Editor
2. Click your HTML element
3. Look at Properties Panel → should show ID like "html1"
```

#### B. Add Page Code
```
1. In Wix Editor, click Dev Mode (</> icon)
2. Add new page code file (or edit existing)
3. Copy code from wix-page-code.js
4. Replace '#html1' with your actual ID
5. Save
```

#### C. Publish and Test
```
1. Publish site
2. Visit: https://umairrafiq.wixsite.com/kidtools?teacher=MsSanam
3. Open console (F12)
4. Should see logs about postMessage
5. Teacher banner should appear
```

---

## Console Logs You Should See

### ✓ Success - Solution 2 (postMessage)

**Wix Page:**
```
Wix page ready - setting up iframe communication
Page URL query params: {teacher: "MsSanam"}
Found teacher parameter: MsSanam
Sending teacher parameter to iframe: MsSanam
```

**Your App (iframe):**
```
=== Checking for teacher parameter ===
Requesting URL data from parent window...
Received postMessage: {teacher: "MsSanam"}
✓ Teacher from postMessage: MsSanam
Teacher banner updated with: MsSanam
```

### ✓ Success - Solution 1 or 3 (URL parameter)

**Your App:**
```
=== Checking for teacher parameter ===
Current window URL: https://...?teacher=MsSanam
Current window search params: ?teacher=MsSanam
✓ Teacher from current URL: MsSanam
```

---

## Common Issues

### Issue: "Received postMessage: undefined"
**Cause:** Message format doesn't match
**Fix:** Check the data structure being sent

### Issue: "Cannot find $w('#html1')"
**Cause:** Wrong component ID
**Fix:** Click HTML element, check Properties for actual ID

### Issue: "Cross-origin error"
**Cause:** This is expected! That's why we need Solution 1, 2, or 3
**Fix:** Use one of the solutions above

---

## Quick Test Checklist

- [ ] HTML code updated (already done!)
- [ ] Wix page code added (choose solution)
- [ ] HTML component ID verified
- [ ] Site published
- [ ] Tested with ?teacher= parameter
- [ ] Console logs checked
- [ ] Teacher banner appears

---

**Pro Tip:** Keep the browser console open (F12) while testing. The logs will tell you exactly what's happening!
