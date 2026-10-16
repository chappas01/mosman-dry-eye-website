import { useLocation, Link } from 'react-router-dom';

export default function PageNotFound() {
  const location = useLocation();
  const pageName = location.pathname.replace(/^\//, '');

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-6 text-center">
      <p className="text-xs tracking-luxe uppercase text-accent mb-4">404</p>
      <h1 className="font-display text-5xl text-primary mb-4">Page not found</h1>
      <p className="text-muted-foreground max-w-md leading-relaxed mb-8">
        {pageName
          ? <>We couldn't find <span className="text-foreground">/{pageName}</span>. The page may have moved, or the address may be slightly off.</>
          : 'The page you are looking for does not exist.'}
      </p>
      <Link
        to="/"
        className="inline-flex items-center justify-center px-8 py-3 bg-primary text-primary-foreground text-sm tracking-luxe-sm uppercase hover:bg-accent hover:text-accent-foreground transition-colors rounded-sm"
      >
        Return home
      </Link>
    </div>
  );
}
