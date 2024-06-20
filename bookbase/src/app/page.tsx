import Link from "next/link";
import BookList from "./components/BookList";
import { BookDetails } from "./types/Book";

async function getBooks() {
  const res = await fetch('http://localhost:5001/books', {
    next: {
      revalidate: 0
    }
  })

  if(res.ok){
    let books: BookDetails[] = await new Response(res.body).json();
    return books
  }
 
}

export default async function Home() {
  const books: BookDetails[] | undefined = await getBooks()

  return (
   <main className="my-8 px-10 sm:px-12">
      <div className="flex justify-between my-8">
        <h2 className="font-bold text-primary text-xl underline">Home</h2>
        <Link href="/tickets">
          <button className="bg-primary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Add Book</button>
        </Link>
      </div>
      <BookList books={books ?? []}/>
   </main>
  );
}
