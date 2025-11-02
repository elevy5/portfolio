# 🌌 AI Sci-Fi Story Generator

An AI-powered web application that creates unique science fiction stories with optional AI-generated illustrations and audio narration.

![Screenshot](https://img.shields.io/badge/AI-Powered-purple?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)

## ✨ Features

- **AI Story Generation**: Create unique sci-fi stories using OpenAI's GPT-4o-mini
- **AI Illustrations**: Generate stunning visuals with DALL-E 3
- **Audio Narration**: Text-to-speech narration using Web Speech API
- **Customizable Settings**:
  - Age groups (Children, Teens, Young Adult, Adult)
  - 8 sci-fi themes (Space Exploration, Time Travel, Alien Contact, etc.)
  - Story lengths (Short, Medium, Long)
  - Custom protagonist names and plot elements
- **Export Options**: Save stories as PDF or text files
- **Beautiful UI**: Glass-morphism design with smooth animations

## 🚀 Quick Start

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- An OpenAI API key ([Get one here](https://platform.openai.com/api-keys))

### Installation

1. Clone the repository:
```bash
git clone https://github.com/elevy5/story-generator.git
cd story-generator
```

2. Open `index.html` in your web browser:
```bash
# On macOS
open index.html

# On Linux
xdg-open index.html

# On Windows
start index.html
```

Or simply drag and drop `index.html` into your browser.

3. Configure your OpenAI API key:
   - Click "⚙️ Configure API Key" in the app
   - Enter your API key
   - Click "Save"

Your API key is stored locally in your browser and never sent anywhere except directly to OpenAI.

## 📖 Usage

1. **Select Settings**:
   - Choose an age group
   - Pick a sci-fi theme
   - Select story length
   - (Optional) Add protagonist name and custom details

2. **Optional Features**:
   - ✅ Generate illustration (uses DALL-E 3)
   - ✅ Enable audio narration (uses browser's text-to-speech)

3. **Generate**:
   - Click "🚀 Generate Story"
   - Wait for AI to create your story
   - Enjoy your unique sci-fi tale!

4. **Save & Share**:
   - 📄 Save as Text
   - 📑 Save as PDF (includes images)
   - 🔄 Generate another story

## 🎨 Themes Available

- **Space Exploration**: Journey to distant galaxies
- **Time Travel**: Navigate the temporal dimensions
- **Alien Contact**: First encounters with extraterrestrial life
- **Dystopian**: Dark futures and societal collapse
- **Cyberpunk**: High-tech, low-life adventures
- **Robots & AI**: Artificial intelligence and humanity
- **Parallel Universe**: Alternate realities and dimensions
- **Post-Apocalyptic**: Survival in a ruined world

## 🔧 Technical Details

### Technologies Used

- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Styling**: Tailwind CSS
- **Animations**: Anime.js
- **PDF Generation**: jsPDF
- **AI Services**:
  - OpenAI GPT-4o-mini (story generation)
  - OpenAI DALL-E 3 (image generation)
  - Web Speech API (audio narration)

### Browser Compatibility

- ✅ Chrome/Edge (recommended)
- ✅ Firefox
- ✅ Safari
- ⚠️ Text-to-speech quality may vary by browser

### API Costs

This app uses OpenAI's API which has costs associated:
- **GPT-4o-mini**: ~$0.01-0.03 per story
- **DALL-E 3**: ~$0.04 per image

Total cost per story with image: approximately $0.05-0.07

## 🔒 Privacy & Security

- Your API key is stored locally in your browser's `localStorage`
- No data is sent to any server except OpenAI
- Stories are generated on-demand and not stored
- All processing happens client-side

## 📱 Mobile Support

The app is fully responsive and works on:
- 📱 Smartphones
- 💻 Tablets
- 🖥️ Desktops

## 🛠️ Development

### Local Development

1. Clone the repository
2. Open `index.html` in your browser
3. Make changes to the HTML/CSS/JavaScript
4. Refresh the page to see updates

No build process required!

### Project Structure

```
story-generator/
├── index.html          # Main application file
└── README.md          # This file
```

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest features
- Submit pull requests

## 📄 License

MIT License - feel free to use this project for personal or commercial purposes.

## 🙏 Acknowledgments

- OpenAI for GPT-4o-mini and DALL-E 3 APIs
- Tailwind CSS for the styling framework
- Anime.js for smooth animations

## 📧 Support

For issues or questions:
- Open an issue on [GitHub](https://github.com/elevy5/story-generator/issues)
- Check existing issues for solutions

## 🎯 Roadmap

- [ ] Add more sci-fi themes
- [ ] Support for multiple languages
- [ ] Story history/favorites
- [ ] Social sharing features
- [ ] Advanced customization options
- [ ] Dark/light mode toggle

---

**Made with ❤️ and AI**

Enjoy creating amazing sci-fi stories! 🚀✨
