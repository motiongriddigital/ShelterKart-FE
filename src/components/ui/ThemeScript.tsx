import { THEME_KEY } from '@/store/theme';

// Runs before first paint so a dark visitor never sees a light flash.
const BEFORE_PAINT = `try{var m=localStorage.getItem('${THEME_KEY}');var d=m==='dark'||(m!=='light'&&matchMedia('(prefers-color-scheme: dark)').matches);if(d){document.documentElement.classList.add('dark');document.documentElement.style.colorScheme='dark'}}catch(e){}`;

export function ThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: BEFORE_PAINT }} />;
}
