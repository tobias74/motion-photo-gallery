# MotionPhoto Gallery

A Vue 3 application designed for managing and displaying Motion Photos. It provides an intuitive interface to extract and play embedded videos in motion photo files. This project utilizes Vuetify for styling and Vue Router for navigation.

## Features

- **Motion Photo Extraction**: Automatically identifies and extracts embedded videos from motion photo files.
- **Dynamic Layout**: Responsive grid layout using Vuetify's grid system.
- **File Handling**: Supports bulk uploads with a file input component.
- **Live Preview**: Displays extracted video content alongside images.
- **Task Queue**: Processes files in sequence using a custom task queue to ensure efficient file handling.
- **Internationalization (i18n)**: Supports translations for different languages.

## Technologies Used

### Core Technologies

- [Vue 3](https://vuejs.org/): The Progressive JavaScript Framework.
- [Vuetify 3](https://vuetifyjs.com/): A Vue UI Library with beautifully crafted components.
- [Vue Router](https://router.vuejs.org/): Official router for Vue.js.
- [Vue I18n](https://vue-i18n.intlify.dev/): Internationalization plugin for Vue.

### Build Tools

- [Vite](https://vitejs.dev/): Next-generation frontend tooling.
- [Sass](https://sass-lang.com/): CSS preprocessor.

### Additional Utilities

- [@mdi/font](https://materialdesignicons.com/): Material Design Icons.
- [Webfontloader](https://github.com/typekit/webfontloader): Load custom web fonts.

## Project Setup

### Prerequisites

Ensure you have the following installed:

- Node.js (>= 14.x)
- npm (>= 6.x) or yarn

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/tobias74/motion-photo-gallery.git
   cd motion-photo-gallery
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Development

Start the development server:

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to view the application.

### Build

Generate a production-ready build:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Folder Structure

```
motion-photo-gallery
├── public/               # Static assets
├── src/
│   ├── assets/           # Images, styles, etc.
│   ├── components/       # Reusable Vue components
│   ├── services/         # Utility functions and services
│   ├── views/            # Application pages
│   ├── App.vue           # Main application component
│   ├── main.js           # Application entry point
├── vite.config.js        # Vite configuration
├── package.json          # Project dependencies and scripts
└── README.md             # Project documentation
```

## Key Components

### `MotionPhotoViewer`

The main component that:

- Manages motion photo files.
- Extracts embedded videos using `findSequence`.
- Displays motion photo images and videos.

### Services

- **`findSequence.js`**: Utility for locating byte sequences in files.
- **`simple-queue.js`**: Manages sequential task execution for file processing.

## Usage Instructions

1. Upload motion photo files using the "Select Images" button.
2. The app will process each file and:
   - Display the image preview.
   - Extract and display embedded videos if available.
3. Download the extracted video if needed.

## Contribution

Contributions are welcome! Feel free to fork the repository and submit a pull request.

## License

This project is licensed under the MIT License.

## Author

**Tobias Gassmann**

- Email: [mail@tobiga.com](mailto:mail@tobiga.com)
- Tel: +49 160 96 24 83 98
- GitHub: [https://github.com/tobias74](https://github.com/tobias74)
