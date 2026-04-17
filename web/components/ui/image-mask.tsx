import React from 'react';

type ImageMaskProps = React.HTMLAttributes<HTMLDivElement> & {
  src: string;
  alt?: string;
};

const shieldPath =
  'M150 8C112 8 60 16 16 30C10 32 6 38 6 44V220C6 310 60 370 150 400C240 370 294 310 294 220V44C294 38 290 32 284 30C240 16 188 8 150 8Z';

const ImageMask = React.forwardRef<HTMLDivElement, ImageMaskProps>(
  ({ className, src, alt = '', ...props }, ref) => (
    <div ref={ref} className={`relative ${className ?? ''}`} {...props}>
      <svg
        viewBox='0 0 300 410'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
        className='w-full h-full'
      >
        <defs>
          <clipPath id='clip-shield'>
            <path d={shieldPath} />
          </clipPath>
          <filter id='shadow-lock' x='-20%' y='-20%' width='140%' height='140%'>
            <feDropShadow dx='0' dy='2' stdDeviation='4' floodColor='#042940' floodOpacity='0.25' />
          </filter>
        </defs>

        {/* Görsel */}
        <image
          clipPath='url(#clip-shield)'
          href={src}
          x='0'
          y='0'
          width='300'
          height='410'
          preserveAspectRatio='xMidYMin slice'
        />

        {/* Kilit ikonu — minimal cam tarzı */}
        <g transform='translate(115, 188)' filter='url(#shadow-lock)'>
          {/* Cam efektli arka plan */}
          <rect x='5' y='5' width='60' height='60' rx='16' fill='white' opacity='0.88' />
          {/* Kilit halkası */}
          <path
            d='M28 32V26C28 21 31 18 35 18C39 18 42 21 42 26V32'
            stroke='#042940'
            strokeWidth='3.5'
            strokeLinecap='round'
            fill='none'
          />
          {/* Kilit gövdesi */}
          <rect x='24' y='32' width='22' height='18' rx='4' fill='#042940' />
          {/* Anahtar deliği */}
          <circle cx='35' cy='39' r='2.5' fill='white' />
          <rect x='34' y='40.5' width='2' height='4.5' rx='1' fill='white' />
        </g>

        {/* Çerçeve */}
        <path
          d={shieldPath}
          fill='none'
          stroke='#005C53'
          strokeWidth='7'
          strokeLinejoin='round'
          strokeLinecap='round'
        />
      </svg>
    </div>
  )
);

ImageMask.displayName = 'ImageMask';

export default ImageMask;
