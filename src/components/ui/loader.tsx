import { DotLottieReact } from '@lottiefiles/dotlottie-react';

export const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 bg-gray-900 flex flex-col items-center justify-center">
      <div className="w-32 h-32">
        <DotLottieReact
          src="https://lottie.host/524c18d0-53c4-43c8-a003-b28b98253455/f3tX9X4eHX.lottie"
          loop
          autoplay
        />
      </div>
      <p className="text-blue-400 text-lg font-medium mt-4">Loading...</p>
    </div>
  )
}
