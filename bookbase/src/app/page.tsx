import Link from "next/link";
import BookList from "./components/BookList";
import { Suspense } from "react";
import Loading from "./loading";

export default function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {

  return (
   <main className="my-8 px-10 sm:px-12">
      <div className="flex flex-col sm:flex-row gap-2 sm:justify-between my-8">
        <h2 className="font-bold text-primary text-xl underline">Home</h2>
        <Link href="/addbook">
          <button className="bg-primary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Add Book</button>
        </Link>
      </div>
      <Suspense fallback={<Loading />}>
        <BookList searchParams={searchParams}/>
      </Suspense>
    </main>
  );
}
