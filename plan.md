# Enhance Orange Visibility Plan

Make the tool blocks on the home screen more visible by intensifying the orange theme and adding more prominent visual cues.

## 1. Theme Configuration (`src/theme.css`)
- Define vibrant orange variables in `:root` and `.dark`.
- Add a specific `orange-glow` utility class for tool cards.
- Ensure the orange has high contrast against the dark background.

## 2. Component Update (`src/components/HomeGrid.tsx`)
- Update the gradient for icon backgrounds to be more punchy (e.g., `from-orange-400 via-orange-500 to-red-500`).
- Add a persistent subtle orange border to tool cards (`border-orange-500/20`).
- Increase the intensity of the shadow glow (`shadow-orange-500/10` to `shadow-orange-500/30`).
- Enhance the featured card (PDF Converter) with a more visible glow and perhaps a subtle orange tint to its card background.
- Ensure the "Zap" icon and "ChevronRight" are more prominent.

## 3. Validation
- Verify the build passes.
- Ensure the UI looks premium and the orange is "visible" as requested.
