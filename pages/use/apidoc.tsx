import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-5 after:dark:from-sky-900 after:dark:via-[#00D0FF] after:dark:opacity-40 before:lg:h-[300px]">
        <h1 className={`mb-3 text-5xl font-mono font-semibold`}>
          ROBOTIKA FACE{" "}
        </h1>
      </div>
      <div className="pt-40"></div>
      <div className="mb-32 grid text-center lg:mb-0 lg:grid-cols-2 gap-20 lg:text-left">
        <a
          className="group rounded-lg border border-grey px-5 py-4 transition-colors hover:border-blue-300 hover:bg-sky-50 hover:bg-opacity-30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-3xl font-semibold`}>
            Image file{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          
          <p className={`m-0 max-w-[100ch] text-xl opacity-50`}>
            To upload image to server using form-fields data and ther image is
            "formData" field.
          </p>
          <div className="pt-20"></div>
          <h3 className={`mb-3 text-2xl font-semibold opacity-70`}>Call api with</h3>
          <p className={`m-0 max-w-[100ch] text-xl opacity-50`}>
          (Your server IP):3003/api/recognize
          </p>
          <div className="pt-10"></div>
          <h3 className={`mb-3 text-2xl font-semibold opacity-70`}>Example with cURL</h3>
          <p className={`m-0 max-w-[100ch] text-xl opacity-50`}>
          curl --location 'http://localhost:85/api/recognize' \<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  --header 'Content-Type: multipart/form-data' \<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;   --form 'file=@"/path/to/file"'
          </p>
        
          
        </a>

        <a
          className="group rounded-lg border border-grey px-5 py-4 transition-colors hover:border-blue-300 hover:bg-sky-50 hover:bg-opacity-30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-3xl font-semibold`}>
            Image url{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2> 
          <p className={`m-0 max-w-[100ch] text-xl opacity-50`}>
            To use api with image url in json data type.
          </p>
          <div className="pt-20"></div>
          <h3 className={`mb-3 text-2xl font-semibold opacity-70`}>Call api with</h3>
          <p className={`m-0 max-w-[100ch] text-xl opacity-50`}>
          (Your server IP):3003/api/recognizeurl
          </p>
          <div className="pt-10"></div>
          <h3 className={`mb-3 text-2xl font-semibold opacity-70`}>Example with cURL</h3>
          <p className={`m-0 max-w-[100ch] text-xl opacity-50`}>
          curl --location 'http://localhost:85/api/recognizeurl?url="Your Image URL"' \<br />
          

          </p>
         
        </a>
      </div>
    </main>
  );
}
