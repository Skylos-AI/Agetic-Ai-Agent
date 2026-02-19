import './globals.css';
import { LanguageProvider } from '@/context/LanguageContext';
import { ProcedureProvider } from '@/context/ProcedureContext';

export const metadata = {
  title: 'Asistente Ciudadano | AGETIC',
  description: 'Portal digital centralizado para trámites estatales mediante NLP.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        <LanguageProvider>
          <ProcedureProvider>
            {children}
          </ProcedureProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
