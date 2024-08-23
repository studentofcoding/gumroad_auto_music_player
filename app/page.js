import Image from "next/image";
import ProductList from './components/ProductList'

export default function Home() {
  return (
    <main className="bg-background !opacity-100 transition-opacity duration-300 v0-c">
      <div className="!visible transition-opacity duration-150 bg-background text-foreground !opacity-100">
        <ProductList />
      </div>
    </main>
  );
}