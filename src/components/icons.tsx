import * as React from 'react'

type IconProperties = {
  className?: string
  viewBox?: string
  title?: string
  role?: string
  size?: '12' | '16' | '20' | '24' | '32' | '40'
  name: IconNames
}

const Icons = {
  Moon: () => (
    <>
      <path
        fill="currentColor"
        d="M15.374 10.028a7.533 7.533 0 01-9.215 5.068 7.53 7.53 0 01-3.447-12.45A7.53 7.53 0 015.978.63a7.54 7.54 0 005.38 9.494 7.536 7.536 0 004.016-.096z"
        opacity="0.2"
      />
      <path
        fill="currentColor"
        d="M15.817 9.584a.627.627 0 00-.627-.157A6.908 6.908 0 016.577.812a.628.628 0 00-.785-.784 8.224 8.224 0 00-4.15 2.903A8.16 8.16 0 008.166 16a8.087 8.087 0 004.904-1.638 8.226 8.226 0 002.903-4.152.627.627 0 00-.156-.626zm-3.501 3.775a6.902 6.902 0 01-11.04-5.032A6.906 6.906 0 015.111 1.65a8.17 8.17 0 009.245 9.245 6.984 6.984 0 01-2.04 2.464z"
      />
    </>
  ),
  Sun: () => (
    <>
      <path
        fill="currentColor"
        d="M11.733 8a3.733 3.733 0 11-7.466 0 3.733 3.733 0 017.466 0z"
        opacity="0.2"
      />
      <path
        fill="currentColor"
        d="M7.467 2.133v-1.6a.533.533 0 111.066 0v1.6a.533.533 0 11-1.066 0zM12.267 8a4.267 4.267 0 11-8.534 0 4.267 4.267 0 018.534 0zM11.2 8a3.2 3.2 0 10-6.4 0 3.2 3.2 0 006.4 0zM3.356 4.11a.534.534 0 00.755-.754L3.044 2.289a.534.534 0 00-.755.755l1.067 1.067zm0 7.78l-1.067 1.066a.534.534 0 00.755.755l1.067-1.067a.534.534 0 00-.755-.755zm8.91-7.623a.534.534 0 00.378-.156l1.067-1.067a.534.534 0 00-.755-.755l-1.067 1.067a.534.534 0 00.378.91zm.378 7.622a.534.534 0 00-.755.755l1.067 1.067a.535.535 0 00.755-.755l-1.067-1.067zM2.667 8a.533.533 0 00-.534-.533h-1.6a.533.533 0 100 1.066h1.6A.533.533 0 002.667 8zM8 13.333a.533.533 0 00-.533.534v1.6a.533.533 0 001.066 0v-1.6A.534.534 0 008 13.333zm7.467-5.866h-1.6a.534.534 0 000 1.066h1.6a.533.533 0 000-1.066z"
      />
    </>
  ),
  Left: () => (
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M5.778 7.918c1.84-1.846 3.638-3.647 5.395-5.404a.52.52 0 000-.716c-.249-.277-.643-.253-.822-.064-1.82 1.825-3.725 3.733-5.714 5.724-.158.13-.237.282-.237.459 0 .176.079.334.237.473l5.986 5.845a.6.6 0 00.835-.023c.287-.287.176-.57.047-.705-1.912-1.86-3.822-3.724-5.728-5.59"
      clipRule="evenodd"
    />
  ),
  Email: () => (
    <g>
      <g clipPath="url(#clip0_81_19)">
        <path
          fill="currentColor"
          d="M12.16 10.142c0 .7.2.98.72.98 1.16 0 1.9-1.48 1.9-3.944 0-3.765-2.74-5.567-6.16-5.567-3.52 0-6.72 2.363-6.72 6.829 0 4.265 2.8 6.588 7.1 6.588 1.46 0 2.44-.16 3.938-.66l.322 1.34c-1.48.481-3.062.62-4.28.62-5.64 0-8.662-3.103-8.662-7.89C.318 3.614 3.82.329 8.64.329c5.02 0 7.68 3.005 7.68 6.69 0 3.123-.98 5.506-4.06 5.506-1.4 0-2.32-.56-2.44-1.803-.36 1.382-1.32 1.803-2.62 1.803-1.74 0-3.2-1.342-3.2-4.045 0-2.723 1.28-4.406 3.58-4.406 1.22 0 1.98.481 2.319 1.242l.58-1.061h1.68v5.888h.002zM9.7 7.499c0-1.101-.82-1.562-1.5-1.562-.74 0-1.56.6-1.56 2.363 0 1.401.62 2.182 1.56 2.182.66 0 1.5-.42 1.5-1.582V7.5z"
        />
      </g>
      <defs>
        <clipPath id="clip0_81_19">
          <path fill="currentColor" d="M0 0H16V16H0z" />
        </clipPath>
      </defs>
    </g>
  ),
  Github: () => (
    <g>
      <g clipPath="url(#clip0_81_23)">
        <path
          fill="currentColor"
          d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0016 8c0-4.42-3.58-8-8-8z"
        />
      </g>
      <defs>
        <clipPath id="clip0_81_23">
          <path fill="currentColor" d="M0 0H16V16H0z" />
        </clipPath>
      </defs>
    </g>
  ),
  Linkedin: () => (
    <g>
      <g clipPath="url(#clip0_81_15)">
        <path
          fill="currentColor"
          d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"
        />
      </g>
      <defs>
        <clipPath id="clip0_81_15">
          <path fill="currentColor" d="M0 0H16V16H0z" />
        </clipPath>
      </defs>
    </g>
  ),
  X: () => (
    <g>
      <g clipPath="url(#clip0_81_17)">
        <path
          fill="currentColor"
          d="M12.6.769h2.454l-5.36 6.126L16 15.231h-4.937l-3.867-5.056-4.425 5.056H.316l5.733-6.554L0 .77h5.063l3.495 4.622L12.601.769zm-.86 12.994h1.36L4.323 2.16H2.865l8.875 11.603z"
        />
      </g>
      <defs>
        <clipPath id="clip0_81_17">
          <path fill="currentColor" d="M0 0H16V16H0z" />
        </clipPath>
      </defs>
    </g>
  ),
  Upwork: () => (
    <path
      fill="currentColor"
      d="M2 0h12c1.104 0 2 .896 2 2v12c0 1.104-.896 2-2 2H2c-1.104 0-2-.896-2-2V2C0 .896.896 0 2 0zm7.675 8.65c.236-1.89.925-2.482 1.836-2.482.903 0 1.603.721 1.603 1.775 0 1.053-.703 1.775-1.603 1.775-.997 0-1.654-.768-1.836-1.068zm-.954-1.493c-.292-.553-.51-1.296-.685-1.986H5.789v2.79c0 1.014-.46 1.764-1.364 1.764-.904 0-1.421-.746-1.421-1.76l.01-2.79H1.721v2.79c0 .814.265 1.553.747 2.078.496.543 1.171.828 1.957.828 1.56 0 2.65-1.196 2.65-2.91V6.086c.164.618.55 1.803 1.293 2.846l-.69 3.947h1.315l.457-2.8c.15.125.31.235.479.335.439.279.942.436 1.46.45h.122c1.61 0 2.889-1.246 2.889-2.925 0-1.678-1.282-2.935-2.89-2.935-1.62 0-2.531 1.06-2.789 2.146v.007z"
    />
  ),
  Download: () => (
    <path
      fill="currentColor"
      d="M8.667 12.667l-5-5 1.4-1.45 2.6 2.6V.667h2v8.15l2.6-2.6 1.4 1.45-5 5zm-6 4c-.55 0-1.021-.196-1.412-.587a1.93 1.93 0 01-.588-1.413v-3h2v3h12v-3h2v3c0 .55-.196 1.02-.587 1.413a1.921 1.921 0 01-1.413.587h-12z"
    />
  ),
  LtLogo: () => (
    <g>
      <path stroke="currentColor" d="M0.5 0.5H15.5V15.5H0.5z" />
      <path
        fill="currentColor"
        d="M10.636 9.523l.025-.82c.009-.35.163-.524.461-.524.299 0 .448.196.448.588 0 .93-.12 1.579-.358 1.946-.324.495-.858.742-1.6.742-.683 0-1.17-.217-1.46-.652-.213-.316-.32-.854-.32-1.613V6.118c0-.18-.08-.27-.243-.27h-.41a.495.495 0 01-.345-.127.478.478 0 010-.653.428.428 0 01.307-.14h.5c.145 0 .217-.082.217-.244V3.366c0-.325.167-.487.5-.487.307 0 .46.162.46.487v1.37c0 .127.077.191.23.191h1.396c.324 0 .486.15.486.448 0 .316-.175.474-.525.474H8.997c-.119 0-.179.09-.179.269v3.149c0 .896.295 1.344.883 1.344.598 0 .91-.363.935-1.088zM5.163 5.938l.012 3.981c.009.435.124.653.346.653.051 0 .158-.021.32-.064.102-.017.17-.025.205-.025.281 0 .422.145.422.435 0 .281-.175.422-.525.422-.136 0-.354-.017-.652-.051a6.548 6.548 0 00-.692-.051 5.44 5.44 0 00-.614.05 5.422 5.422 0 01-.602.052H3.32c-.358 0-.537-.153-.537-.46 0-.265.145-.398.435-.398h.09c.05.009.09.013.115.013.213.034.337.052.371.052.154 0 .248-.065.282-.193.042-.136.068-.482.076-1.036l.013-.896.039-1.984-.013-2.279a3.88 3.88 0 00-.039-.512c-.06-.196-.179-.294-.358-.294a4.13 4.13 0 00-.333.051c-.094.017-.17.026-.23.026-.29 0-.435-.137-.435-.41 0-.282.17-.422.512-.422.094 0 .175.004.243.012l.307.039c.137.017.252.025.346.025.085 0 .213-.012.384-.038.17-.034.298-.051.384-.051.196 0 .294.124.294.371 0 .085-.004.15-.013.192-.06.657-.09 1.587-.09 2.79z"
      />
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M15.733.267H.267v15.466h15.466V.267zM0 0v16h16V0H0z"
        clipRule="evenodd"
      />
    </g>
  ),
} as const

type IconNames = keyof typeof Icons

const Icon: React.FC<IconProperties> = ({
  viewBox = '0 0 16 16',
  title,
  size = '16',
  name,
  role = 'img',
  ...props
}) => (
  <svg
    width={size}
    height={size}
    viewBox={viewBox}
    aria-hidden={!title}
    role={role}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    {title && <title>{title}</title>}
    {Icons[name]()}
  </svg>
)

export { Icon, type IconNames }
