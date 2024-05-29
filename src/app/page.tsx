/* eslint-disable @next/next/no-img-element */
import ProductSection from "@/components/product/ProductSection";

const App = () => {
  return (
    <>
      <main className="bg-[#3A2E39] min-h-screen flex flex-col items-center py-8">
        <section className="bg-neutral-100 w-[80%] mx-auto flex flex-col items-center justify-center px-8 py-8 gap-10 rounded-2xl shadow-lg sm:w-[95%]">
          <div className="flex flex-col items-center gap-4 ">
            <img
              src="https://placehold.co/150x150"
              alt=""
              className="rounded-full"
            />
            <h1 className="text-4xl font-bold text-black">⭐ Productos Olimpia ⭐ </h1>
          </div>
          <ProductSection></ProductSection>
        </section>
      </main>
    </>
  );
};

export default App;
