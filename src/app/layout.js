import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Loader from '@/components/Loader';
import { CartProvider } from '@/context/CartContext';
import { AdminProvider } from '@/context/AdminContext';

export const metadata = {
  title: 'Murgan Store - Premium Women\'s Dresses',
  description: 'Welcome to Murgan Store - Your destination for premium quality women\'s dresses with best prices and styles.',
  keywords: 'women dresses, store, dresses, shopping, fashion, online store',
  author: 'Murgan Store',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />
      </head>
      <body>
        <Loader />
        <AdminProvider>
          <CartProvider>
            <Header />
            <main className="min-h-screen">
              {children}
            </main>
            <Footer />
          </CartProvider>
        </AdminProvider>
      </body>
    </html>
  );
}
