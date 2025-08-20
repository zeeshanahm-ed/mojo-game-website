
interface FallbackLoaderProps {
    isModal?: boolean;
}

const FallbackLoader = ({ isModal = false }: FallbackLoaderProps) => {
    const modalClass = "absolute backdrop-blur-sm w-full h-full z-50 centered-xy flex justify-center items-center"
    return (
        <div className={`${isModal ? modalClass : 'flex poin justify-center items-center h-32'}`}>
            <span className="loading loading-spinner loading-xl"></span>
        </div>
    )
}


export default FallbackLoader;