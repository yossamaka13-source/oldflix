# TFlix - TizenBrew Module for Samsung TVs

TFlix transforms Cineby.gd into a TV-friendly experience for Samsung TVs running TizenBrew with enhanced remote navigation.

## Features

- **TV-Remote Friendly Navigation** - Navigate using only the directional keys
- **Enhanced Visual Focus** - Clear indicators showing selected elements
- **Streamlined Video Playback** - Control playback with media keys on your remote
- **Smart Navigation** - Natural movement between elements with arrow keys
- **Automatic Scrolling** - Scrolls the page when navigating outside visible area
- **Visual Enhancements** - Focus highlighting and scaling for better visibility
- **Tizen TV 3.0 Compatible** - Works on older Samsung TV models

## Installation

### Prerequisites
- Samsung Tizen TV with TizenBrew installed
- Internet connection

### Installing from npm (Recommended)
1. On your TV with TizenBrew installed, navigate to the Package Manager
2. Search for "@zyrecx/tflix"
3. Select and install the package

### Manual Installation
1. Build the module:
```bash
cd mods && bun install && bun run build
cd ../service && bun install && bun run build
```

2. Package the module for TizenBrew:
- Copy the entire TFlix folder to your TizenBrew modules directory
- Alternatively, package it as a .ZIP file and install via TizenBrew

3. Open TizenBrew on your TV and select TFlix from the modules list

## Usage

- Use the directional keys (up, down, left, right) on your TV remote to navigate
- Press OK/Enter to select items
- Use media keys (Play, Pause, etc.) to control video playback
- Press Back to return to previous screens

## Compatibility

### Supported Platforms
- **Samsung Tizen TV 3.0+** ✅ (Full support with ES5 polyfills)
- **Samsung Tizen TV 4.0+** ✅ (Native support)
- **Samsung Tizen TV 5.0+** ✅ (Native support)

### Browser Requirements
- ES5 JavaScript support
- Basic CSS3 support
- DOM Level 2 events

For detailed information about Tizen TV 3.0 compatibility updates, see [TIZEN_TV_3.0_COMPATIBILITY.md](TIZEN_TV_3.0_COMPATIBILITY.md).

## Development

### Project Structure
- `mods/` - Contains the JavaScript modules for enhancing Cineby.gd
- `service/` - Contains the service code for handling TV functionality
- `dist/` - Contains the built module files

### Building
To build the project, run:
```bash
npm run build
```

Or manually:
```bash
cd mods && bun install && bun run build
cd ../service && bun install && bun run build
```

### Local Testing
See [LOCAL-TESTING.md](LOCAL-TESTING.md) for detailed testing instructions.

## Troubleshooting

### Module not working on older TV
- Ensure you have the latest version with Tizen TV 3.0 compatibility updates
- Check if TizenBrew is up to date
- Clear TizenBrew cache and reinstall the module

### Video playback issues
- Ensure the TV is connected to the internet
- Try pressing Back and selecting the video again
- Check if other streaming apps work on your TV

### Navigation not responding
- Ensure you're focused on the video player window
- Try pressing Back to exit and re-enter the video
- Check TizenBrew's key registration settings

## Credits

- Original TFlix module by Zyrex
- Enhanced with Tizen TV 3.0 compatibility by Z.ai Code

## License

MIT License - feel free to use, modify, and distribute as needed.

## Support

For issues and feature requests, please visit the GitHub repository:
https://github.com/Zyrecx/TFlix/issues

---

**Note:** TFlix is a community-created module for TizenBrew and is not officially affiliated with Cineby.gd.
