// const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
import ProductList from '@/components/shared/product/product-list';
// import sampleData from '@/db/sample-data';
import { getLatestProducts } from '@/lib/actions/product.actions';

const Homepage = async () => {
  // await delay(2000);
  const latestProducts = await getLatestProducts();

  return (
    <>
      <ProductList data={latestProducts} title="Newest Arrivals" limit={4} />
    </>
  );
};

export default Homepage;
