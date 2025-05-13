import React from 'react'
import { assets } from '../assets/assets'

const Feeds = () => {
  return (
    <div className='space-y-5' >
      <div className='bg-white rounded-2xl p-4'>
        <div className='flex p-5 gap-5'>
          <img className='w-10 rounded-full' src={assets.logo} alt="" />
          <input 
            className='border-2 pl-2 outline-none rounded-xl w-full border-gray-700' 
            type="text" 
            placeholder='Whats happening ?'
          />
        </div>
        
        <div className='flex justify-between px-5 pb-5 gap-4'>
          <label className='flex flex-col items-center cursor-pointer'>
            <span className='text-xs font-medium text-gray-700 mb-1'>Photo</span>
            <input 
              type="file" 
              className='hidden' 
              accept='image/*'
            />
            <div className='p-2 rounded-lg bg-gray-100 hover:bg-gray-200'>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          </label>

          <label className='flex flex-col items-center cursor-pointer'>
            <span className='text-xs font-medium text-gray-700 mb-1'>Video</span>
            <input 
              type="file" 
              className='hidden' 
              accept='video/*'
            />
            <div className='p-2 rounded-lg bg-gray-100 hover:bg-gray-200'>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 01221 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </div>
          </label>

          <label className='flex flex-col items-center cursor-pointer'>
            <span className='text-xs font-medium text-gray-700 mb-1'>News</span>
            <input 
              type="file" 
              className='hidden' 
              accept='.pdf,.doc,.docx'
            />
            <div className='p-2 rounded-lg bg-gray-100 hover:bg-gray-200'>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
          </label>

          <label className='flex flex-col items-center cursor-pointer'>
            <span className='text-xs font-medium text-gray-700 mb-1'>Threads</span>
            <input 
              type="file" 
              className='hidden' 
              accept='.txt,.json,.csv'
            />
            <div className='p-2 rounded-lg bg-gray-100 hover:bg-gray-200'>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
              </svg>
            </div>
          </label>
        </div>
      </div>
      {/* .........Another feed........ */}
      <div className='bg-white rounded-2xl p-1 md:p-4'>
        <div className='flex md:p-5 p-1 items-start '>  
          <img className='w-10 rounded-full flex-shrink-0' src={assets.logo} alt="" /> 
          <div className='flex-1'>  
            <p className='text-justify font-semibold break-words'> 
            Vomzer <span className='font-normal'>@vomzer_socials</span>
            </p>
            <p className='md:text-sm text-xs'>
            It's been a few days since the lagos hacker house ended 
            and team DevSquad are still modifying and working hard to be able to present the best product upcoming @SuiNetwork overflow coming up in few weeks. All hands are on deck to make this dream a reality.
            #sui #SuiOverflow #SUI
            </p>
            <div className='flex items-center pt-5 md:space-x-10 space-x-7'>
              <div className='flex items-center md:gap-1'>
                <img className='md:w-5 w-3 md:h-5 h-3 ' src={assets.Thumbs} alt="" />
                <p className='md:text-sm text-xs'>6273</p>
              </div>
              <div className='flex items-center md:gap-1'>
                <img className='md:w-5 w-3 md:h-5 h-3 '  src={assets.repost} alt="" />
                <p className='md:text-sm text-xs'>1345</p>
              </div>
              <div className='flex items-center md:gap-1'>
                <img className='md:w-5 w-3 md:h-5 h-3 '  src={assets.comments} alt="" />
                <p className='md:text-sm text-xs'>45</p>
              </div>
              <div className='flex items-center md:gap-1'>
                <img className='md:w-5 w-3 md:h-5 h-3 '  src={assets.tip} alt="" />
                <p className='md:text-sm text-xs'>24</p>
              </div>
              <div className='flex items-center md:gap-1'>
                <img className='md:w-5 w-3 md:h-5 h-3 ' src={assets.analytics} alt="" />
                <p className='md:text-sm text-xs'>5678</p>
              </div>
            </div>
        </div>
        <p className='md:text-sm text-xs'>Apri 4</p>
      </div>
    </div>
     {/* .........Another feed........ */}
     <div className='bg-white rounded-2xl p-1 md:p-4'>
        <div className='flex md:p-5 p-1 items-start'>  
          <img className='w-10 rounded-full flex-shrink-0' src={assets.logo} alt="" /> 
          <div className='flex-1'>  
            <p className='text-justify font-semibold break-words'> 
            Vomzer <span className='font-normal'>@vomzer_socials</span>
            </p>
            <p className='md:text-sm text-xs'>
            We applied for the Lagos Hacker House - Road to Sui Overflow organized by @Sui X @Semicolonafrica and got accepted! 
            We had expose sessions with @AshleyBateman - COO, Semicolon and Will Riches - Sui Representative
            #LagosHackerHouse
            #SemiclonxSui
            #SemicolonAfrica
            </p>
            <div className='flex items-center pt-5 md:space-x-10 space-x-7'>
              <div className='flex items-center md:gap-1'>
                <img className='md:w-5 w-3 md:h-5 h-3 ' src={assets.Thumbs} alt="" />
                <p className='md:text-sm text-xs'>8973</p>
              </div>
              <div className='flex items-center md:gap-1'>
                <img className='md:w-5 w-3 md:h-5 h-3 '  src={assets.repost} alt="" />
                <p className='md:text-sm text-xs'>3445</p>
              </div>
              <div className='flex items-center md:gap-1'>
                <img className='md:w-5 w-3 md:h-5 h-3 '  src={assets.comments} alt="" />
                <p className='md:text-sm text-xs'>89</p>
              </div>
              <div className='flex items-center md:gap-1'>
                <img className='md:w-5 w-3 md:h-5 h-3 '  src={assets.tip} alt="" />
                <p className='md:text-sm text-xs'>15</p>
              </div>
              <div className='flex items-center md:gap-1'>
                <img className='md:w-5 w-3 md:h-5 h-3 ' src={assets.analytics} alt="" />
                <p className='md:text-sm text-xs'>5568</p>
              </div>
            </div>
        </div>
        <p className='md:text-sm text-xs'>March 25</p>
      </div>
    </div>
    </div>
  )
}

export default Feeds