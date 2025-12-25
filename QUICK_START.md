# Quick Start Guide - Building and Installing TFlix for Tizen TV 3.0

## Prerequisites

- Node.js or Bun runtime
- Samsung Tizen TV with TizenBrew installed
- Computer and TV on the same network (for local testing)

## Quick Build (2 commands)

```bash
cd /home/z/my-project/TFlix/mods
bun install && bun run build

cd /home/z/my-project/TFlix/service
bun install && bun run build
```

Or use npm if you prefer:
```bash
cd /home/z/my-project/TFlix/mods
npm install && npm run build

cd /home/z/my-project/TFlix/service
npm install && npm run build
```

## Verify Build

After building, check that these files exist:
- ✅ `dist/userScript.js` (should be ~50KB)
- ✅ `dist/service.js` (should be ~1KB)

## Installation Methods

### Method 1: Local Server (Easiest for Development)

1. Start local HTTP server:
```bash
cd /home/z/my-project/TFlix
npx http-server dist --cors -c-1 -p 8080
```

2. On your TV with TizenBrew:
   - Open TizenBrew
   - Go to Package Manager → Settings
   - Add custom source: `http://YOUR-COMPUTER-IP:8080/`
   - Example: `http://192.168.1.100:8080/`

3. Refresh package list and install TFlix

### Method 2: Direct File Copy

1. Build the project (see Quick Build above)

2. Copy files to TV:
   ```bash
   # Via USB
   Copy dist folder to USB drive

   # Via SCP (if your TV has SSH access)
   scp -r dist/* user@tv-ip:/path/to/tizenbrew/modules/@zyrecx/tflix/
   ```

3. On TV:
   - Open TizenBrew
   - Go to Package Manager
   - Select local files option
   - Navigate to copied files and install

### Method 3: ZIP Archive

1. Build the project
2. Create ZIP archive:
   ```bash
   cd /home/z/my-project/TFlix
   zip -r tflix-tizen3.zip dist/ package.json
   ```

3. Transfer ZIP to TV (USB, network share, etc.)
4. Install through TizenBrew from local file

## Testing

After installation:

1. **Open Cineby.gd** through TizenBrew
2. **Test navigation:** Use arrow keys to move around
3. **Test video:** Select a movie/show and press play
4. **Test controls:** Use media keys during playback
5. **Test back:** Press back button to return

### Common Issues and Fixes

**Issue:** Module doesn't load
- **Fix:** Clear TizenBrew cache and reinstall

**Issue:** Navigation not working
- **Fix:** Ensure you're focused on the video player window (click it first)

**Issue:** Video won't play
- **Fix:** Check internet connection, try pressing Back and selecting again

**Issue:** Lag or stuttering
- **Fix:** Close other apps, restart TV, check internet speed

## Development Workflow

### Making Changes

1. Edit source files in `mods/` or `service/` folders
2. Rebuild:
   ```bash
   cd mods && bun run build
   cd ../service && bun run build
   ```
3. On TV: Go back to TizenBrew home and reopen Cineby.gd

### Quick Rebuild Script

Create `rebuild.sh`:
```bash
#!/bin/bash
cd /home/z/my-project/TFlix/mods && bun run build
cd /home/z/my-project/TFlix/service && bun run build
echo "Build complete!"
```

Make it executable:
```bash
chmod +x rebuild.sh
```

Use it:
```bash
./rebuild.sh
```

## File Structure

```
TFlix/
├── mods/                   # Source files (edit these)
│   ├── polyfills.js        # ES5 polyfills (NEW)
│   ├── ui.js              # UI enhancements
│   ├── contentDetector.js  # Content detection
│   ├── performance.js      # Performance optimizations
│   └── rollup.config.js   # Build config
├── service/                # Service code
│   └── service.js         # Service logic
├── dist/                   # Built files (generated)
│   ├── userScript.js      # Main module (ES5)
│   └── service.js        # Service (ES5)
└── dist/                  # Built files (generated)
```

## Performance Tips for Tizen TV 3.0

1. **Close unused apps** - Free up memory
2. **Restart TV before testing** - Clear memory
3. **Use wired internet** - Better video performance
4. **Limit background processes** - TV has limited RAM
5. **Monitor temperature** - Extended testing may heat up TV

## Getting Help

If you encounter issues:

1. **Check the compatibility guide:** `TIZEN_TV_3.0_COMPATIBILITY.md`
2. **Review changes:** `CHANGES_SUMMARY.md`
3. **Check console logs:** If available, look for JavaScript errors
4. **Report issues:** https://github.com/Zyrecx/TFlix/issues

When reporting issues, include:
- Tizen TV version
- TFlix version (from package.json)
- Specific error message or behavior
- Steps to reproduce

## Next Steps

1. Build the project ✅
2. Install on Tizen TV 3.0 ⏳
3. Test functionality ⏳
4. Report any issues ⏳

Good luck! 🎉
