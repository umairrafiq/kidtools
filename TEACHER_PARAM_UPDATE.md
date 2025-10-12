# KidTools - Teacher Parameter Update

## What Changed

Updated the `getTeacherParameter()` function to better detect the `teacher` URL parameter in various environments, especially when embedded in Wix.

## Enhanced Features

### 1. **Multiple Detection Methods**
The app now checks for the teacher parameter in this order:

1. **Window Variable** (`window.TEACHER_NAME`)
   - Set via Wix Code or custom script
   
2. **Current Window URL** (`?teacher=MsSanam`)
   - Standard query parameter
   
3. **Parent Window URL** (for iframes)
   - Checks parent page URL if embedded
   
4. **Hash Parameter** (`#teacher=MsSanam`)
   - Alternative when query params don't work in Wix
   
5. **Top Window URL**
   - Fallback for deeply nested iframes

### 2. **Enhanced Console Logging**
- Clear visual indicators (✓ and ✗) for debugging
- Detailed logs showing where the parameter was found
- Helpful messages when cross-origin restrictions occur

## How to Use in Wix

### Method 1: Query Parameter (Recommended)
```
https://umairrafiq.wixsite.com/kidtools?teacher=MsSanam
```

### Method 2: Hash Parameter (If Method 1 doesn't work)
```
https://umairrafiq.wixsite.com/kidtools#teacher=MsSanam
```

### Method 3: Wix Code
In your Wix page code, add:
```javascript
window.TEACHER_NAME = 'MsSanam';
```

## Testing

Open `test-teacher-param.html` in a browser to test the teacher parameter detection:

```bash
# Navigate to the kidtools folder
cd C:\kidtools

# Open the test file in your default browser
start test-teacher-param.html
```

Or use the test links in the test page to see how different parameters are detected.

## What Happens When Teacher Parameter is Detected

1. **Teacher Banner** - Shows "🏫 Class of [TeacherName]" at the top
2. **Filtered Leaderboard** - Only shows students from that teacher's class
3. **Student Assignment** - New students are automatically assigned to the teacher
4. **Existing Students** - Get updated with teacher info if they don't have one

## Files Modified

- `index.html` - Enhanced `getTeacherParameter()` function with better detection and logging
- `test-teacher-param.html` - New test file for verifying parameter detection

## Browser Console

Open the browser console (F12) to see detailed logs about parameter detection:

- ✓ indicates successful detection
- ✗ indicates that method didn't find the parameter
- Detailed info about URLs, search params, and hash values

## Troubleshooting

### Teacher parameter not being detected in Wix:

1. **Check console logs** - Open F12 and look for the detection logs
2. **Try hash method** - Use `#teacher=` instead of `?teacher=`
3. **Check URL encoding** - Spaces should be encoded as `%20` or `+`
4. **Verify embedding** - Make sure HTML is directly embedded (not in iframe with cross-origin restrictions)

### Cross-origin issues:

If you see "Cannot access parent URL (cross-origin)" in console:
- This is normal for Wix
- Try the hash parameter method: `#teacher=MsSanam`
- Or use Wix Code to set `window.TEACHER_NAME`

## Example URLs

```
✓ https://umairrafiq.wixsite.com/kidtools?teacher=MsSanam
✓ https://umairrafiq.wixsite.com/kidtools?teacher=Mr.Johnson
✓ https://umairrafiq.wixsite.com/kidtools#teacher=MsSmith
✓ https://umairrafiq.wixsite.com/kidtools?teacher=Mrs%20Williams
```

## Next Steps

1. Push changes to GitHub:
   ```bash
   git add index.html test-teacher-param.html
   git commit -m "Enhanced teacher parameter detection for Wix"
   git push
   ```

2. Update your Wix page with the new HTML code

3. Test with URLs like:
   - `https://umairrafiq.wixsite.com/kidtools?teacher=MsSanam`
   - `https://umairrafiq.wixsite.com/kidtools#teacher=MsSanam`

4. Check browser console for detection logs

---

**Questions?** Check the console logs for detailed information about parameter detection.
