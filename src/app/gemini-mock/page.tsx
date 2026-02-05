import Image from 'next/image'
export default function geminiMockup(){
    return(
        <>
        <div className="h-screen items-center flex flex-col justify-center">
            <div className="max-w-1/3 min-w-1/3 flex font-sans gap-4 justify-start">
            <Image src="https://www.gstatic.com/lamda/images/gemini_sparkle_aurora_33f86dc0c0257da337c63.svg" alt="gemini logo" width={20} height={20}></Image>
            <div className="text-2xl flex justify-start">Hi, Anudeep</div> 
            </div>
            <div className="max-w-1/3 min-w-1/3 flex font-sans gap-4 justify-center h-auto">
            <div className='text-2xl flex justify-center h-3 fill-zinc-600 min-w-full'></div>
            </div>
        </div>
        </>
    );
}